export default function parse(element, {document}) {
  const rows = [];

  // Add header row
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Cards';
  rows.push(headerRow);

  // Process icon blocks
  const icons = element.querySelectorAll('.icon-item');
  icons.forEach((icon) => {
    const img = icon.querySelector('img');
    const content = icon.querySelector('.icon-item__content p');

    const imageElement = document.createElement('img');
    imageElement.src = img ? img.getAttribute('src') : '';
    imageElement.alt = img ? img.getAttribute('alt') : '';

    const textElement = document.createElement('div');
    textElement.innerHTML = content ? content.innerHTML : '';

    rows.push([imageElement, textElement]);
  });

  // Create table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace element
  element.replaceWith(table);
}