export default function parse(element, { document }) {
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Search';

  const searchForm = element.querySelector('form');
  const searchInput = searchForm?.querySelector('input[type="search"]');
  const formAction = searchForm?.getAttribute('action') || 'No action';
  const placeholder = searchInput?.getAttribute('placeholder') || 'No placeholder';

  const searchData = [
    headerRow,
    [placeholder, formAction],
  ];

  const blockTable = WebImporter.DOMUtils.createTable(searchData, document);
  element.replaceWith(blockTable);
}