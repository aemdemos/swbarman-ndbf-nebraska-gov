export default function parse(element, {document}) {
  const content = document.querySelector('.main-section');
  if (!content) return;

  // Header row creation matching the example
  const headerCell = document.createElement('strong');
  headerCell.textContent = "Columns";
  const headerRow = [headerCell];

  // Dynamic extraction of the first content block
  const textItems = content.querySelectorAll('.text-item');
  const descriptionContent = [];

  textItems.forEach((item) => {
    const title = item.querySelector('h2, h3, h5')?.textContent;
    const paragraphs = Array.from(item.querySelectorAll('p')).map(p => p.cloneNode(true));
    const listItems = Array.from(item.querySelectorAll('ul li')).map(li => li.cloneNode(true));

    if (title) {
      const titleElement = document.createElement('strong');
      titleElement.textContent = title;
      descriptionContent.push(titleElement);
    }

    if (paragraphs.length) {
      descriptionContent.push(...paragraphs);
    }

    if (listItems.length) {
      const listElement = document.createElement('ul');
      listItems.forEach(li => listElement.appendChild(li));
      descriptionContent.push(listElement);
    }
  });

  // Extracting second content block dynamically from icons-block-item
  const iconsBlock = content.querySelector('.icons-block-item');
  const iconsContent = [];

  if (iconsBlock) {
    const icons = iconsBlock.querySelectorAll('.icon-item');
    icons.forEach(icon => {
      const iconTitle = icon.querySelector('.icon-item__title')?.textContent;
      const iconImage = icon.querySelector('img')?.cloneNode(true);
      const iconParagraph = icon.querySelector('p')?.cloneNode(true);

      const titleElement = document.createElement('strong');
      titleElement.textContent = iconTitle;

      const rowContent = [];
      if (titleElement) rowContent.push(titleElement);
      if (iconImage) rowContent.push(iconImage);
      if (iconParagraph) rowContent.push(iconParagraph);

      iconsContent.push(rowContent);
    });
  }

  // Combining extracted content into a cells array
  const cells = [
    headerRow,
    [descriptionContent],
    ...iconsContent
  ];

  // Creating a table using createTable
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replacing the original element with the new block table
  element.replaceWith(blockTable);
}