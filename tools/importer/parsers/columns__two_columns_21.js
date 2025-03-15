export default function parse(element, {document}) {
    // Import the helper for creating tables
    const cells = [];

    // Header row indicating the block type
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Columns';
    const headerRow = [headerCell];
    cells.push(headerRow);

    // Extract the text content
    const textContent = element.querySelector('.hero-banner-image-descr__text h3');
    let textParagraph = null;
    if (textContent) {
        textParagraph = document.createElement('p');
        textParagraph.textContent = textContent.textContent.trim();
    }

    // Extract the image content
    const imageElement = element.querySelector('.hero-banner-image-descr__image-wrapper img');
    let image = null;
    if (imageElement) {
        image = document.createElement('img');
        image.src = imageElement.src;
        image.alt = imageElement.alt || '';
    }

    // Add text and image to the cells array as a row
    if (textParagraph && image) {
        cells.push([textParagraph, image]);
    }

    // Create the block table
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the block table
    element.replaceWith(blockTable);
}