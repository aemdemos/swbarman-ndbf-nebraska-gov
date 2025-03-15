export default function parse(element, {document}) {
  const contentWrapper = element.querySelector('.hero-banner-image-descr__content');
  const imageDesktop = element.querySelector('.desktop-image img');
  const imageMobile = element.querySelector('.mobile-image img');

  const titleElement = contentWrapper.querySelector('p strong');
  const paragraphs = contentWrapper.querySelectorAll('p');
  const listItems = contentWrapper.querySelectorAll('ul li');

  const title = titleElement ? titleElement.textContent : '';
  const paragraphContent = Array.from(paragraphs).map(p => p.innerHTML).filter(Boolean);
  const listContent = Array.from(listItems).map(li => li.innerHTML).filter(Boolean);

  const desktopImage = imageDesktop ? document.createElement('img') : null;
  if (desktopImage) desktopImage.src = imageDesktop.src;

  const mobileImage = imageMobile ? document.createElement('img') : null;
  if (mobileImage) mobileImage.src = imageMobile.src;

  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  const cells = [
    headerRow,
    [title],
    [
      paragraphContent.join('<br>'),
      listContent.join('<br>')
    ],
    [desktopImage, mobileImage]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}