export default function parse(element, {document}) {
  const contentWrapper = element.querySelector('.icon-item__content');
  const imageWrapper = element.querySelector('.step-item__image-wrapper img');
  const button = element.querySelector('.button.hero-banner-video__cta');

  if (!contentWrapper || !imageWrapper || !button) {
    throw new Error('Required elements are missing');
  }

  // Correcting Header Row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  // Extract paragraph content
  const paragraph = contentWrapper.querySelector('p');

  // Extract list items with proper rendering
  const listItems = Array.from(contentWrapper.querySelectorAll('ul li')).map((li) => {
    const link = li.querySelector('a');
    const listItemCell = document.createElement('div');

    if (link) {
      const span = document.createElement('span');
      span.textContent = li.textContent.replace(link.textContent, '').trim();
      listItemCell.appendChild(span);
      listItemCell.appendChild(link);
    } else {
      listItemCell.textContent = li.textContent;
    }

    return listItemCell;
  });

  // Extract image content
  const image = document.createElement('img');
  image.src = imageWrapper.src;
  image.alt = imageWrapper.alt;

  // Extract button content
  const buttonLink = document.createElement('a');
  buttonLink.href = button.href;
  buttonLink.innerHTML = button.innerHTML;

  // Creating cells
  const cells = [
    headerRow,
    [paragraph, image],
    [listItems, buttonLink]
  ];

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}