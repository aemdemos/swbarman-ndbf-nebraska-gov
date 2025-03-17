/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global window, WebImporter, XPathResult */
/* eslint-disable no-console */
import columns__three_columns_2Parser from './parsers/columns__three_columns_2.js';
import columns__two_columns_4Parser from './parsers/columns__two_columns_4.js';
import columns__three_columns_7Parser from './parsers/columns__three_columns_7.js';

WebImporter.Import = {
  isEmpty: (cells) => {
    if (Array.isArray(cells)) {
      return cells.length === 0;
    } else if (typeof cells === 'object' && cells !== null) {
      return Object.keys(cells).length === 0;
    }
    return !cells;
  },
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (instances, url) => instances
    .filter((instance) => instance.url === url)
    .map(({ xpath }) => xpath),
};

const parsers = {
      'Columns (three columns) 2': columns__three_columns_2Parser,
    'Columns (two columns) 4': columns__two_columns_4Parser,
    'Columns (three columns) 7': columns__three_columns_7Parser,
};

function generateDocumentPath({ url }) {
  let p = new URL(url).pathname;
  if (p.endsWith('/')) {
    p = `${p}index`;
  }
  p = decodeURIComponent(p)
    .toLowerCase()
    .replace(/\.html$/, '')
    .replace(/[^a-z0-9/]/gm, '-');
  return WebImporter.FileUtils.sanitizePath(p);
}

/**
* Page transformation function
*/
function transformPage(main, { inventory: { fragments = [], blocks = [] }, ...source }) {
  const { document, url, params: { originalURL } } = source;

  // first, get dom elements for each block for the current page
  const blockElements = blocks.map((block) => {
    const foundInstance = block.instances.find((instance) => instance.url === originalURL);
    if (foundInstance) {
      /* eslint-disable no-param-reassign */
      block.element = WebImporter.Import.getElementByXPath(document, foundInstance.xpath);
    }
    return block;
  });
  // also get all fragment elements for the current page
  const fragmentElements = fragments.flatMap((frg) => frg.instances)
    .filter((instance) => instance.url === originalURL)
    .map((instance) => WebImporter.Import.getElementByXPath(document, instance.xpath));

  // remove fragment elements
  fragmentElements.forEach((element) => {
    element.remove();
  });

  // transform all blocks using parsers
  blockElements.forEach(({ name, cluster, element }) => {
    const parserFn = parsers[`${name} ${cluster}`];

    if (!parserFn) return;

    try {
      parserFn.call(this, element, { ...source });
    } catch (e) {
      console.warn(`Failed to parse block: ${name} from cluster: ${cluster}`, e);
    }
  });

  WebImporter.rules.transformBackgroundImages(main, document);
  WebImporter.rules.adjustImageUrls(main, url, originalURL);
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  (fragment.instances || [])
    .filter(({ url }) => `${url}?frag=${fragment.name}` === originalURL)
    .map(({ xpath }) => ({ xpath, element: WebImporter.Import.getElementByXPath(document, xpath) }))
    .filter(({ element }) => element)
    .forEach(({ xpath, element }) => {
      main.append(element);

      const fragmentBlock = inventory.blocks
        .find(
          ({ instances }) => instances
            .find(({ url, xpath: blockXpath }) => `${url}?frag=${fragment.name}` === originalURL && blockXpath === xpath),
        );

      if (!fragmentBlock) return;
      const { name, cluster } = fragmentBlock;
      const parserFn = parsers[`${name} ${cluster}`];
      if (!parserFn) return;

      try {
        parserFn.call(this, element, source);
      } catch (e) {
        console.warn(`Failed to parse block: ${name} from cluster: ${cluster} with xpath: ${xpath}`, e);
      }
    });
}

export default {
  transform: async (source) => {
    const { document, params: { originalURL } } = source;

    // sanitize the original URL
    const sanitizedOriginalURL = new URL(originalURL).href;
    /* eslint-disable no-param-reassign */
    source.params.originalURL = sanitizedOriginalURL;

    // fetch the inventory
    const publishUrl = 'https://issue-40--swbarman-ndbf-nebraska-gov--aemdemos.aem.page';

    /* eslint-disable-next-line no-undef */
    const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
    let inventory = null;
    try {
      const inventoryResp = await fetch(inventoryUrl.href);
      inventory = await inventoryResp.json();
    } catch (e) {
      const inventoryResp = await fetch(`${window.location.origin}/tools/importer/inventory.json`);
      inventory = await inventoryResp.json();
    }

    if (!inventory) {
      console.error('Failed to fetch inventory');
      return [];
    }

    // perform the transformation
    let main = null;
    const sourceUrl = new URL(originalURL);
    const sourceParams = new URLSearchParams(sourceUrl.search);
    if (sourceParams.has('frag')) {
    // fragment transformation
      const fragName = sourceParams.get('frag');
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      return [{
        element: main,
        path: fragment.path,
      }];
    }
    // page transformation
    main = document.body;
    transformPage(main, { ...source, inventory });
    return [{
      element: main,
      path: generateDocumentPath(source),
    }];
  },
};
