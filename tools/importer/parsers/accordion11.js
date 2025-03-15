export default function parse(element, {document}) {
    // Step 1: Extract icon and content
    const icon = element.querySelector('.icon-item__icon');
    const content = element.querySelector('.icon-item__content');

    // Step 2: Verify extraction
    if (!icon || !content) {
        console.warn('Element missing required child components.');
        return;
    }

    // Step 3: Create header row dynamically
    const headerRow = [document.createElement('strong')];
    headerRow[0].textContent = 'Accordion';

    // Step 4: Organize table content dynamically
    const tableContent = [
        headerRow,
        [icon, content]
    ];

    // Step 5: Create block table
    const blockTable = WebImporter.DOMUtils.createTable(tableContent, document);

    // Step 6: Replace original element
    element.replaceWith(blockTable);
}