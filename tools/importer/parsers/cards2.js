export default function parse(element, {document}) {
  const blockTitle = element.querySelector('.teaser-block__title')?.textContent.trim();

  if (!blockTitle) {
    throw new Error('Block title is missing');
  }

  // Collect all teaser items
  const teaserItems = Array.from(element.querySelectorAll('.teaser-item'));
  const cells = [];

  // Header row indicating the block type
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = blockTitle;
  cells.push(headerRow);

  // Populate rows with teaser items
  teaserItems.forEach((item) => {
    const image = item.querySelector('img');
    const imageElement = document.createElement('img');
    if (image) {
      imageElement.src = image.src;
      imageElement.alt = image.alt;
    } else {
      imageElement.alt = 'Image not available';
    }

    const title = item.querySelector('.teaser-item__title')?.textContent.trim() || '';
    const subtitle = item.querySelector('.teaser-item__subtitle')?.textContent.trim() || '';
    const description = item.querySelector('.teaser-item__desc')?.textContent.trim() || '';
    const link = item.querySelector('a');

    const linkElement = document.createElement('a');
    if (link) {
      linkElement.href = link.href;
      linkElement.textContent = link.textContent.trim();
    } else {
      linkElement.textContent = 'Link not available';
    }

    const content = [
      subtitle ? document.createTextNode(subtitle + ' ') : null,
      document.createElement('strong').appendChild(document.createTextNode(title)),
      document.createTextNode(description),
      linkElement
    ].filter(Boolean);

    cells.push([imageElement, content]);
  });

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}