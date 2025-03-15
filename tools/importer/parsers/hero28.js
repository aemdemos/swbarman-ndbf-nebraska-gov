export default function parse(element, {document}) {
  const container = element.closest('.container');

  // Extract text content
  const textBlock = container.querySelector('.tree-column-teaser-block__text');
  const paragraphs = Array.from(textBlock?.querySelectorAll('p') || []);

  // Extract Image
  const imageBlock = container.querySelector('.simple-teaser-item__image');
  const image = imageBlock ? document.createElement('img') : null;
  if (image) image.src = imageBlock.src;

  // Extract Link
  const linkBlock = container.querySelector('.cta-download-link');
  const link = linkBlock ? document.createElement('a') : null;
  if (link) {
    link.href = linkBlock.href;
    link.textContent = linkBlock.textContent;
  }

  // Create Header Row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Create Cells Structure
  const cells = [
    headerRow,
    [image].filter(Boolean), // Ensure image is added only if extracted
    paragraphs.map(paragraph => paragraph.cloneNode(true)),
    [link].filter(Boolean) // Ensure link is added only if extracted
  ];

  // Create Table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace Original Element
  element.replaceWith(blockTable);
}