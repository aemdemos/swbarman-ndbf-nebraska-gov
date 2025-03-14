export default function parse(element, {document}) {
    const blockName = 'Columns';

    // Extract the two columns
    const columns = [...element.querySelectorAll('.two-column-icon-item__col')];

    // Prepare cells for the table
    const cells = [];

    // Add the header row with the block name
    const headerCell = document.createElement('strong');
    headerCell.textContent = blockName;
    const headerRow = [headerCell];
    cells.push(headerRow);

    // Process each column
    columns.forEach((col) => {
        const iconItem = col.querySelector('.icon-item');
        const icon = iconItem?.querySelector('.icon-item__icon');
        const content = iconItem?.querySelector('.icon-item__content');

        if (!icon || !content) {
            console.warn('Missing icon or content in column:', col);
            cells.push([document.createTextNode('Missing Data')]);
            return;
        }

        // Create image element from icon
        const image = document.createElement('img');
        image.src = icon.src;
        image.alt = icon.alt;

        // Add image and content to the cells
        cells.push([image, content]);
    });

    // Create the block table
    const table = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new block table
    element.replaceWith(table);
}