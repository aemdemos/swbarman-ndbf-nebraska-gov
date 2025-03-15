export default function parse(element, {document}) {
  const items = element.querySelectorAll('.teaser-icon-item');

  // Helper to prepare rows for table cells
  const cells = [];

  // Add the header row dynamically as per the example
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];
  cells.push(headerRow);

  items.forEach((item) => {
    const img = item.querySelector('img');
    const desc = item.querySelector('.teaser-icon-item__desc');

    const content = [];
    if (img) {
      content.push(img);
    }
    if (desc) {
      desc.childNodes.forEach((node) => {
        if (node.nodeType === 3 || node.nodeType === 1) { // Fixing ReferenceError by using numeric codes for node types
          content.push(node);
        }
      });
    }

    cells.push([content]);
  });

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}