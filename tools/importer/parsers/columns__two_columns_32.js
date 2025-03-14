export default function parse(element, {document}) {
    // Extract the image
    const image = element.querySelector('.text-image-item__image');
    // Ensure image exists before proceeding
    const clonedImage = image ? image.cloneNode(true) : document.createTextNode('');

    // Extract the description content
    const description = element.querySelector('.text-image-item__description');
    // Ensure description exists before proceeding
    const clonedDescription = description ? description.cloneNode(true) : document.createTextNode('');

    // Define header row for the block type
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Columns';
    const headerRow = [headerCell];

    // Create cells array for the table
    const cells = [
        headerRow, // Header row
        [clonedImage, clonedDescription], // Row with cloned image and description
    ];

    // Create the block table
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the block table
    element.replaceWith(block);
}