export default function parse(element, { document }) {
  const cells = [];

  // Create header row for Cards block
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Cards';
  cells.push(headerRow);

  // Extract content from each column element
  const columns = element.querySelectorAll('.two-column-icon-item__col');

  columns.forEach((col) => {
    const image = col.querySelector('.icon-item__icon');
    const title = col.querySelector('.icon-item__content p strong');

    if (image && title) {
      const imgElement = document.createElement('img');
      imgElement.src = image.src;
      imgElement.alt = image.alt || '';

      const textContent = document.createElement('strong');
      textContent.textContent = title.textContent;

      cells.push([imgElement, textContent]);
    }
  });

  // Create the table and replace the element
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}