export default function parse(element, {document}) {
    const cells = [];

    // First row: Header row
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Columns';
    const headerRow = [headerCell];
    cells.push(headerRow);

    // Second row: Main content
    const row = [];
    const containers = element.querySelectorAll('.top-icons-container');

    containers.forEach(container => {
        const link = container.querySelector('a');
        const img = link.querySelector('img');
        const title = link.querySelector('h2');

        const columnContent = [];

        // Image
        const image = document.createElement('img');
        image.src = img.src;
        image.alt = img.alt;
        columnContent.push(image);

        // Title
        const columnTitle = document.createElement('h2');
        columnTitle.textContent = title.textContent
          .replace(/\n/g, ' ') // Replace newlines with spaces
          .replace(/\s*&\s*/g, ' & ') // Normalize spaces around '&'
          .replace(/([a-z])([A-Z])/g, '$1 $2') // Add spaces between camel case
          .trim();
        columnContent.push(columnTitle);

        // Description
        const description = document.createElement('p');
        description.textContent = `Learn more about ${columnTitle.textContent}`;
        columnContent.push(description);

        row.push(columnContent);
    });

    cells.push(row);

    // Create the block table
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the block table
    element.replaceWith(block);
}