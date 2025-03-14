export default function parse(element, {document}) {
  // Ensure the header row matches exactly and is dynamically created
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = "Columns";

  // Extract all items dynamically from the given element
  const items = Array.from(element.querySelectorAll('.teaser-icon-item'));

  // Validate the extraction and handle missing content gracefully
  const contentRow = items.map(item => {
    const img = item.querySelector('img');
    const title = item.querySelector('h4');

    // Check for missing image or title and handle gracefully
    const imageElement = document.createElement('img');
    if (img) {
      imageElement.src = img.src;
      imageElement.alt = img.alt || '';
    }

    const titleElement = document.createElement('h4');
    if (title) {
      titleElement.textContent = title.textContent.trim();
    }

    return [imageElement, titleElement];
  });

  // Construct the cells array and include the dynamically extracted content
  const cells = [headerRow, ...contentRow.map(item => [item[0], item[1]])];

  // Create the table block using WebImporter.DOMUtils.createTable()
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}