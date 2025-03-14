export default function parse(element, {document}) {
  // Extract all teaser items within the given element
  const items = element.querySelectorAll('.teaser-item');

  const rows = [];

  // Add the header row indicating the block type
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Cards';
  rows.push(headerRow);

  items.forEach((item) => {
    // Extract the image
    const img = item.querySelector('img');
    const imageElement = document.createElement('img');
    imageElement.src = img.src;
    imageElement.alt = img.alt;

    // Extract the title
    const title = item.querySelector('.teaser-item__title');
    const titleElement = document.createElement('strong');
    titleElement.textContent = title.textContent.trim();

    // Extract the description
    const description = item.querySelector('.teaser-item__desc');
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description.textContent.trim();

    // Extract the link
    const link = item.querySelector('a');
    const linkElement = document.createElement('a');
    linkElement.href = link.href;
    linkElement.textContent = link.textContent.trim();

    // Create the row for this card
    rows.push([imageElement, [titleElement, descriptionElement, linkElement]]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the created table
  element.replaceWith(block);
}