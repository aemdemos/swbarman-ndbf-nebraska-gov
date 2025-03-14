export default function parse(element, {document}) {
  const cells = [];

  // Add header row for Accordion block
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Accordion';
  const headerRow = [headerCell];
  cells.push(headerRow);

  // Extract relevant content from the input element
  const items = element.querySelectorAll('.icon-item');

  items.forEach((item) => {
    const iconWrapper = item.querySelector('.icon-item__title-wrapper img');
    const icon = iconWrapper ? iconWrapper.cloneNode(true) : '';

    const content = item.querySelector('.icon-item__content p');
    const textContent = content ? content.cloneNode(true) : '';

    // Push extracted content as a row
    cells.push([icon, textContent]);
  });

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the newly created block
  element.replaceWith(blockTable);
}