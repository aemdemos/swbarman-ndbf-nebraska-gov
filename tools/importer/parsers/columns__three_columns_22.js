export default function parse(element, {document}) {
    const items = Array.from(element.querySelectorAll('.teaser-icon-item'));

    if (items.length === 0) {
        console.warn('No items found in the provided element!');
        return;
    }

    const blockElements = items.map(item => {
        const img = item.querySelector('img.teaser-icon-item__icon');
        const title = item.querySelector('h4.teaser-icon-item__title');
        const description = item.querySelector('.teaser-icon-item__desc p');

        // Ensure the image, title, and description exist, fallback to defaults if missing
        const imageElement = document.createElement('img');
        imageElement.src = img?.src || '';
        imageElement.alt = img?.alt || 'Placeholder image';

        const titleElement = document.createElement('h4');
        titleElement.textContent = title?.textContent.trim() || 'Untitled';

        const descElement = document.createElement('p');
        descElement.textContent = description?.textContent.trim() || 'No description available.';

        return [imageElement, titleElement, descElement];
    });

    // Header row extracted based on the example
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Columns';
    const headerRow = [headerCell];

    const blockTable = WebImporter.DOMUtils.createTable([headerRow, ...blockElements], document);

    element.replaceWith(blockTable);
}