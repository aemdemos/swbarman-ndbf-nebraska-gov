export default function parse(element, {document}) {
  // Helper function to create table
  const { createTable } = WebImporter.DOMUtils;

  // Extract text content dynamically
  const textElement = element.querySelector('.hero-banner-image-descr__text h3');
  const textContent = textElement ? textElement.textContent.trim() : 'No text available';

  // Extract image dynamically
  const imageElement = element.querySelector('.hero-banner-image-descr__image-wrapper img');
  const imageClone = imageElement ? imageElement.cloneNode(true) : document.createElement('span');
  imageClone.textContent = imageElement ? '' : 'No image available';

  // Create table content - Headers dynamically created
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  const cells = [
    headerRow,
    [textContent, imageClone]
  ];

  const blockTable = createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}