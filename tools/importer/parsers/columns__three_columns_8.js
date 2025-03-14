export default function parse(element, {document}) {
  const teaserItems = element.querySelectorAll('.teaser-item');

  const cells = [];

  // Header row creation
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];
  cells.push(headerRow);

  // Iterate over teaser items and extract content
  teaserItems.forEach((item, index) => {
    const img = item.querySelector('img');
    const description = item.querySelector('.teaser-item__desc p');

    // Handle potential missing content
    const imgElement = document.createElement('img');
    imgElement.src = img?.src || '';
    imgElement.alt = img?.alt || 'Image unavailable';

    const heading = document.createElement('h3');
    heading.textContent = `Column ${index + 1}`;

    const paragraph = document.createElement('p');
    paragraph.textContent = description?.textContent || 'Description unavailable';

    cells.push([imgElement, heading, paragraph]);
  });

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}