export default function parse(element, {document}) {
  const createTable = WebImporter.DOMUtils.createTable;

  // Extract relevant data dynamically
  const items = element.querySelectorAll('ul > li');

  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Columns';

  const rows = Array.from(items).map((item) => {
    const titleElement = item.querySelector('.views-field-title .field-content');
    const title = document.createElement('h2');
    title.textContent = titleElement ? titleElement.textContent.trim() : 'Missing Title';

    const imageElement = item.querySelector('.views-field-field-add-image-1 img');
    const image = document.createElement('img');
    image.src = imageElement ? imageElement.src : '';
    image.alt = imageElement ? imageElement.alt || 'Image Missing Alt' : 'Missing Image';

    const bodyElement = item.querySelector('.views-field-field-publication-body .field-content');
    const bodyText = bodyElement ? bodyElement.textContent.trim() : 'No Description Available';
    const descriptionNode = document.createTextNode(bodyText);

    return [image, title, descriptionNode];
  });

  const cells = [
    headerRow,
    rows
  ];

  // Create table block
  const blockTable = createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}