export default function parse(element, {document}) {
  const headerCell = document.createElement('strong');
  headerCell.textContent = "Columns";
  const headerRow = [headerCell];

  // Extract video poster image dynamically
  const videoElement = element.querySelector('.video-js .vjs-poster img');
  const videoImage = videoElement ? document.createElement('img') : null;
  if (videoImage) {
    videoImage.src = videoElement.src;
    videoImage.alt = videoElement.alt || "";
  }

  // Extract transcript button and content dynamically
  const transcriptButton = element.querySelector('.hero-banner-video__transcript button.collapse__title');
  const transcriptContent = element.querySelector('.hero-banner-video__transcript .collapse__content');

  // Extract text content dynamically
  const textContent = element.querySelector('.hero-banner-video__text .hero-banner-video__content');

  // Handle edge cases: Ensure elements exist before adding to table
  const cells = [
    headerRow,
    [textContent || document.createTextNode(''), videoImage || document.createTextNode('')],
    [transcriptButton || document.createTextNode(''), transcriptContent || document.createTextNode('')]
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}