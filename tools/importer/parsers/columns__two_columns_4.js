export default function parse(element, {document}) {
  const leftColumn = element.querySelector('.col-xs-12.col-sm-6:nth-child(1)');
  const rightColumn = element.querySelector('.col-xs-12.col-sm-6:nth-child(2)');

  // Extract left column title and list items dynamically.
  const leftTitle = leftColumn.querySelector('h3');
  const leftListItems = Array.from(leftColumn.querySelectorAll('li')).map(item => item.cloneNode(true));

  // Extract right column title and list items dynamically.
  const rightTitle = rightColumn.querySelector('h3');
  const rightListItems = Array.from(rightColumn.querySelectorAll('li')).map(item => item.cloneNode(true));

  const leftContent = [
    (() => {
      const titleElement = document.createElement('strong');
      titleElement.textContent = leftTitle ? leftTitle.textContent : '';
      return titleElement;
    })(),
    (() => {
      const listWrapper = document.createElement('ul');
      leftListItems.forEach(item => listWrapper.appendChild(item));
      return listWrapper;
    })()
  ];

  const rightContent = [
    (() => {
      const titleElement = document.createElement('strong');
      titleElement.textContent = rightTitle ? rightTitle.textContent : '';
      return titleElement;
    })(),
    (() => {
      const listWrapper = document.createElement('ul');
      rightListItems.forEach(item => listWrapper.appendChild(item));
      return listWrapper;
    })()
  ];

  const cells = [
    [(() => {
      const headerCell = document.createElement('strong');
      headerCell.textContent = 'Columns';
      return headerCell;
    })()],
    [leftContent, rightContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}