export default function parse(element, {document}) {
  // Helper function to create structured content
  const createTable = WebImporter.DOMUtils.createTable;

  // Extract relevant pieces of content
  const noEventsElement = element.querySelector('.no-events h4');
  const noEventsText = noEventsElement ? noEventsElement.textContent.trim() : 'No events available';

  const moreEventsLink = element.querySelector('.events-btn-container a');
  const moreEventsLinkElement = moreEventsLink 
    ? document.createElement('a') 
    : document.createTextNode('No link available');

  if (moreEventsLink) {
    moreEventsLinkElement.href = moreEventsLink.href;
    moreEventsLinkElement.textContent = moreEventsLink.textContent.trim();
  }

  // Create header row dynamically
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Build the table rows dynamically
  const cells = [
    headerRow,
    [document.createTextNode(noEventsText)],
    [moreEventsLinkElement]
  ];

  // Create the block table
  const blockTable = createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}