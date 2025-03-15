export default function parse(element, {document}) {
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';

  // Extract image and attributes dynamically
  const imgWrapper = element.querySelector('.hero-banner-image-descr__image-wrapper img');
  const image = document.createElement('img');
  if (imgWrapper) {
    const imgSrc = imgWrapper.getAttribute('src');
    const imgAlt = imgWrapper.getAttribute('alt');
    image.setAttribute('src', imgSrc || '');
    image.setAttribute('alt', imgAlt || '');
  }

  // Extract heading dynamically
  const titleElement = element.querySelector('.hero-banner-image-descr__title');
  const heading = document.createElement('h3');
  heading.textContent = titleElement ? titleElement.textContent.trim() : '';

  // Extract paragraph dynamically
  const textElement = element.querySelector('.hero-banner-image-descr__text p');
  const paragraph = document.createElement('p');
  paragraph.textContent = textElement ? textElement.textContent.trim() : '';

  // Extract link dynamically
  const linkElement = element.querySelector('.hero-banner-video__cta');
  const link = document.createElement('a');
  if (linkElement) {
    const href = linkElement.getAttribute('href');
    const download = linkElement.getAttribute('download');
    link.setAttribute('href', href || '#');
    link.setAttribute('download', download || '');
    link.textContent = linkElement.textContent.trim();
  }

  // Construct table cells
  const cells = [
    headerRow,
    [image],
    [heading],
    [paragraph],
    [link]
  ];

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}