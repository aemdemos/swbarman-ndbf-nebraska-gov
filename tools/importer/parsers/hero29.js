export default function parse(element, {document}) {
  const cells = [];

  // Header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];
  cells.push(headerRow);

  // Extract video poster image dynamically
  const videoPoster = element.querySelector('.video-js .vjs-poster img');
  let posterImg;
  if (videoPoster && videoPoster.src) {
    posterImg = document.createElement('img');
    posterImg.src = videoPoster.src;
    cells.push([posterImg]);
  } else {
    // Handle missing video poster gracefully
    cells.push(['Video poster not found']);
  }

  // Extract heading dynamically
  const headingText = element.querySelector('.hero-banner-video__title');
  if (headingText && headingText.textContent.trim()) {
    const heading = document.createElement('h1');
    heading.textContent = headingText.textContent.trim();
    cells.push([heading]);
  } else {
    // Handle missing heading gracefully
    cells.push(['Heading not found']);
  }

  // Extract content paragraphs dynamically
  const contentParagraphs = element.querySelectorAll('.hero-banner-video__content p');
  if (contentParagraphs.length > 0) {
    contentParagraphs.forEach(paragraph => {
      const paraElement = document.createElement('p');
      paraElement.innerHTML = paragraph.innerHTML;
      cells.push([paraElement]);
    });
  } else {
    // Handle missing content paragraphs gracefully
    cells.push(['Content paragraphs not found']);
  }

  // Extract transcript dynamically
  const transcriptContent = element.querySelector('.hero-banner-video__transcript .collapse__content');
  if (transcriptContent) {
    const transcriptParagraphs = transcriptContent.querySelectorAll('p');
    if (transcriptParagraphs.length > 0) {
      const transcriptSection = document.createElement('div');
      transcriptParagraphs.forEach(paragraph => {
        const paraElement = document.createElement('p');
        paraElement.innerHTML = paragraph.innerHTML;
        transcriptSection.appendChild(paraElement);
      });
      cells.push([transcriptSection]);
    } else {
      // Handle empty transcript gracefully
      cells.push(['Transcript content not found']);
    }
  } else {
    // Handle missing transcript gracefully
    cells.push(['Transcript not found']);
  }

  // Create the table dynamically
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}