export default function parse(element, {document}) {
  const cells = [];

  // Header row specifying the block type
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];
  cells.push(headerRow);

  // Extract the content within the element
  const icon = element.querySelector('.hero-banner-video__icon');
  const title = element.querySelector('h2.hero-banner-video__title');
  const videoPoster = element.querySelector('.vjs-poster img');
  const transcript = element.querySelector('.hero-banner-video__transcript .collapse__content');
  const heroContent = element.querySelector('.hero-banner-video__content');
  const ctaButton = element.querySelector('.button.hero-banner-video__cta');

  // First row with image and title
  const firstRow = [];
  if (icon) firstRow.push(icon);
  if (title) firstRow.push(title);
  cells.push(firstRow);

  // Second row with video poster
  if (videoPoster) {
    const videoPosterImg = document.createElement('img');
    videoPosterImg.src = videoPoster.src;
    videoPosterImg.alt = videoPoster.alt || '';
    cells.push([videoPosterImg]);
  }

  // Third row with transcript content
  if (transcript) {
    const paragraphs = transcript.querySelectorAll('p');
    const transcriptElements = Array.from(paragraphs);
    cells.push(transcriptElements);
  }

  // Fourth row with hero content and CTA
  const fourthRow = [];
  if (heroContent) fourthRow.push(heroContent);
  if (ctaButton) fourthRow.push(ctaButton);
  cells.push(fourthRow);

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}