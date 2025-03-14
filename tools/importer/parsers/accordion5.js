export default function parse(element, {document}) {
  const accordionItems = element.querySelectorAll('li.header-main-nav-item');
  const cells = [];

  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Accordion';
  const headerRow = [headerCell];
  cells.push(headerRow);

  accordionItems.forEach((item) => {
    const mainLink = item.querySelector('a');
    const mainTitle = mainLink ? mainLink.querySelector('.menu-item-title')?.textContent.trim() : '';
    const mainSubtitle = mainLink ? mainLink.querySelector('.menu-subtitle')?.textContent.trim() : '';

    const dropdownLinks = item.querySelectorAll('ul.dropdown-menu li a');

    if (dropdownLinks.length > 0) {
      const dropdownContent = Array.from(dropdownLinks).map((link) => {
        const title = link.querySelector('.menu-item-title')?.textContent.trim();
        const subtitle = link.querySelector('.menu-subtitle')?.textContent.trim() || '';
        return `${title || ''} ${subtitle}`.trim();
      });

      const mainContentCell = document.createElement('div');
      mainContentCell.textContent = `${mainTitle || ''}\n${mainSubtitle || ''}`.trim();

      const dropdownCell = document.createElement('div');
      dropdownContent.forEach((content) => {
        const p = document.createElement('p');
        p.textContent = content;
        dropdownCell.appendChild(p);
      });

      cells.push([mainContentCell, dropdownCell]);
    } else {
      const mainContentCell = document.createElement('div');
      mainContentCell.textContent = `${mainTitle || ''}\n${mainSubtitle || ''}`.trim();

      cells.push([mainContentCell]);
    }
  });

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}