export default function parse(element, {document}) {
    const blocks = [];

    // Correctly create the header row
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Columns';
    const headerRow = [headerCell];

    // Iterate through the child elements of the container
    [...element.children].forEach((col) => {
        const link = col.querySelector('a');
        const h3 = col.querySelector('h3');
        const img = col.querySelector('img');

        // Create content for each column block
        const contentRow = [];

        if (h3) {
            const ul = h3.querySelector('ul');
            if (ul) {
                const listItems = [...ul.children].filter(li => li.textContent.trim() !== '').map(li => {
                    const listItem = document.createElement('li');
                    listItem.textContent = li.textContent.trim();
                    return listItem;
                });
                if (listItems.length > 0) {
                    const listElement = document.createElement('ul');
                    listItems.forEach(item => listElement.appendChild(item));
                    contentRow.push(listElement);
                }
            }
        }

        if (link) {
            const linkElement = document.createElement('a');
            linkElement.href = link.href.trim();
            linkElement.textContent = link.textContent.trim();
            contentRow.push(linkElement);
        }

        if (img) {
            const imgElement = document.createElement('img');
            imgElement.src = img.src.trim();
            imgElement.alt = img.alt.trim();
            contentRow.push(imgElement);
        }

        // Only push rows that contain valid content
        if (contentRow.length > 0) {
            blocks.push(contentRow);
        }
    });

    // Assemble the table
    const cells = [headerRow, ...blocks];
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element
    element.replaceWith(blockTable);
}