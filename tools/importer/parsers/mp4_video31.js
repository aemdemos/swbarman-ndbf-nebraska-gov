export default function parse(element, {document}) {
  // Extract relevant elements dynamically
  const prevButton = element.querySelector('.carousel__prev');
  const nextButton = element.querySelector('.carousel__next');

  // Handle edge cases for missing buttons
  const prevContent = prevButton ? [
    prevButton.querySelector('.carousel__btn-text').textContent,
    prevButton.querySelector('svg') // Include SVG icon if present
  ] : ['Back'];

  const nextContent = nextButton ? [
    nextButton.querySelector('.carousel__btn-text').textContent,
    nextButton.querySelector('svg') // Include SVG icon if present
  ] : ['Next'];

  // Create the header row dynamically to match example
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Navigation Buttons';

  // Define table cells
  const cells = [
    headerRow, // Header row
    [prevContent, nextContent] // Content row with extracted elements
  ];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}