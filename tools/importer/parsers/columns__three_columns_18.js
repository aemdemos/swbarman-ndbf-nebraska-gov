export default function parse(element, {document}) {
  const slides = element.querySelectorAll('.teaser-item');

  const cells = [];

  // Create header row dynamically (EXACT header matching "Columns")
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];
  cells.push(headerRow);

  // Process slides to extract content dynamically
  const contentRow = Array.from(slides).map((slide, index) => {
    const img = slide.querySelector('img');
    const description = slide.querySelector('.teaser-item__desc p');

    // Handle missing image or description gracefully
    const imageElement = img ? img : document.createElement('span');
    const textElement = description ? document.createElement('h2') : document.createElement('span');

    if (description) {
      textElement.textContent = `Column ${index + 1}`;
    } else {
      textElement.textContent = '';
    }

    const descElement = description ? description : document.createElement('span');

    return [imageElement, textElement, descElement];
  });

  contentRow.forEach((row) => {
    cells.push(row);
  });

  // Create and replace block table dynamically
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}