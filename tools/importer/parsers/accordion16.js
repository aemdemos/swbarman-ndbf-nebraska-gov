export default function parse(element, {document}) {

  // Extract all icon items
  const items = element.querySelectorAll('.icon-item');

  // Create rows dynamically by extracting content from the HTML
  const rows = Array.from(items).map(item => {
    // Extract the title content
    const titleElement = item.querySelector('.icon-item__content strong');
    const title = titleElement ? titleElement.textContent : '';

    // Extract the paragraph content
    const paragraphElement = item.querySelector('.icon-item__content');
    const content = paragraphElement ? paragraphElement.childNodes[2]?.textContent.trim() : '';

    // Extract the image source
    const imageElement = item.querySelector('.icon-item__title-wrapper img');
    const imageSrc = imageElement ? imageElement.src : '';

    // Create paragraph and image
    const paragraph = document.createElement('p');
    const strongTitle = document.createElement('strong');
    strongTitle.textContent = title;
    paragraph.appendChild(strongTitle);
    paragraph.appendChild(document.createElement('br'));
    paragraph.append(content);

    const image = document.createElement('img');
    image.src = imageSrc;

    return [paragraph, image];
  });

  // Create header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Accordion';
  const headerRow = [headerCell];

  // Include header in the table
  const cells = [headerRow, ...rows];

  // Create table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table block
  element.replaceWith(block);
}