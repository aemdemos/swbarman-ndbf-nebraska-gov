export default function parse(element, {document}) {
  const heroSection = element.querySelector('section.hero-banner-image');
  if (!heroSection) {
    return;
  }

  const titleElement = heroSection.querySelector('.hero-banner-image__title');
  const descriptionElement = heroSection.querySelector('.hero-banner-image__desc p');
  const imgElement = heroSection.querySelector('.hero-banner-image__img');

  const heading = document.createElement('h1');
  heading.textContent = titleElement ? titleElement.textContent.trim() : '';

  const paragraph = document.createElement('p');
  paragraph.textContent = descriptionElement ? descriptionElement.textContent.trim() : '';

  const image = document.createElement('img');
  if (imgElement) {
    image.src = imgElement.src;
    image.alt = imgElement.alt;
  }

  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';

  const cells = [
    headerRow,
    [image],
    [heading],
    [paragraph]
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  heroSection.replaceWith(blockTable);
}