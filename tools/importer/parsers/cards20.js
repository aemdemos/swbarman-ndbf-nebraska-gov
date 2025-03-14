export default function parse(element, {document}) {
  const createTable = WebImporter.DOMUtils.createTable;

  // Extract all "text-image-item" blocks
  const items = element.querySelectorAll('.text-image-item');

  const rows = [['Cards']]; // Initialize with header row

  items.forEach((item) => {
    const img = item.querySelector('.text-image-item__image');
    const title = item.querySelector('.text-image-item__title');
    const description = item.querySelector('.text-image-item__description');

    const imageElement = document.createElement('img');
    imageElement.src = img.src;
    imageElement.alt = img.alt;

    const titleElement = document.createElement('strong');
    titleElement.textContent = title.textContent.trim();

    rows.push([imageElement, [titleElement, description]]);
  });

  const table = createTable(rows, document);
  element.replaceWith(table);
}