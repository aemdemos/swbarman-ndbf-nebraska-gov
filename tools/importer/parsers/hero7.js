export default function parse(element, {document}) {
  // Extract the hero image URL
  const heroBannerImage = element.querySelector('.hero-banner-image');
  const heroImageStyle = heroBannerImage ? heroBannerImage.style.backgroundImage : '';
  const heroImageUrlMatch = heroImageStyle.match(/url\((['"]?)(.*?)\1\)/);
  const heroImageUrl = heroImageUrlMatch ? heroImageUrlMatch[2] : '';

  // Extract the hero title text
  const heroTitleElement = element.querySelector('.hero-banner-image__title');
  const heroTitleText = heroTitleElement ? heroTitleElement.textContent.trim() : '';

  // Create the header row for the block table
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';

  // Create the content rows for the block table
  const heroImage = document.createElement('img');
  if (heroImageUrl) {
    heroImage.src = heroImageUrl;
    heroImage.alt = heroTitleText || 'Hero Image';
  }

  const heroHeading = document.createElement('h2');
  if (heroTitleText) {
    heroHeading.textContent = heroTitleText;
  }

  const contentRow = [];
  if (heroImageUrl) contentRow.push(heroImage);
  if (heroTitleText) contentRow.push(heroHeading);

  // Build the table
  const cells = [
    headerRow, // Header row
    contentRow.length > 0 ? contentRow : ['No content available'] // Content row
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}