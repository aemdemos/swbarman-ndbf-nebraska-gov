export default function parse(element, {document}) {
  // Extract content from the element
  const titleElement = element.querySelector('.text-with-bg__title');
  const title = titleElement ? titleElement.textContent.trim() : '';

  const logoElement = element.querySelector('.text-with-bg__logo'); // logo image element
  const logo = logoElement ? logoElement : document.createElement('div'); // Fallback placeholder

  const descriptionParagraphs = Array.from(
    element.querySelectorAll('.text-with-bg__desc p')
  );

  const buttonElement = element.querySelector('.button');
  const button = buttonElement ? buttonElement : document.createElement('div'); // Fallback placeholder

  // Create structured content
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  const cells = [
    headerRow,
    [title],
    [logo],
    descriptionParagraphs,
    [button],
  ];

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new block table
  element.replaceWith(blockTable);
}