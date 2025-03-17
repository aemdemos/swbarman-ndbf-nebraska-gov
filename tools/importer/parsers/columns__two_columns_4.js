export default function parse(element, {document}) {
  const leftColumn = element.querySelector('.field--name-field-left-column');
  const rightColumn = element.querySelector('.field--name-field-right-column-side');

  // Extract headers dynamically
  const leftHeader = document.createElement('strong');
  leftHeader.textContent = leftColumn?.querySelector('h3')?.textContent || "";

  const leftList = leftColumn?.querySelector('ul') || document.createElement('ul');

  const rightHeader = document.createElement('strong');
  rightHeader.textContent = rightColumn?.querySelector('h3')?.textContent || "";

  const rightList = rightColumn?.querySelector('ul') || document.createElement('ul');

  // Create cells for block table
  const cells = [
    ['Columns'], // Header row following the example structure
    [
      [leftHeader, leftList],
      [rightHeader, rightList],
    ],
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}