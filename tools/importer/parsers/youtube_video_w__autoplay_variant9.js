export default function parse(element, {document}) {
  const img = element.querySelector('img');
  const title = element.querySelector('h5');

  // Check for missing or empty elements
  if (!img || !title) {
    console.warn('Element lacks required structure:', element);
    return;
  }

  // Create header row for the table
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Icon Block';

  // Dynamically extracted content row
  const contentRow = [
    img,
    title
  ];

  // Create table using WebImporter.DOMUtils.createTable
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new block table
  element.replaceWith(block);
}