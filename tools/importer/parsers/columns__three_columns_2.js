export default function parse(element, {document}) {
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Columns';

  const firstColumn = [];
  const logoContainer = element.querySelector('.ndbf-logo-footer img');
  if (logoContainer) {
    firstColumn.push(logoContainer.cloneNode(true));
  }

  const address = element.querySelector('.logo-text');
  if (address) {
    const addressLines = address.innerHTML.split('<br>').map(line => {
      const addressLineElement = document.createElement('p');
      addressLineElement.textContent = line.trim();
      return addressLineElement;
    });
    firstColumn.push(...addressLines);
  }

  const badgesContainer = element.querySelector('.region .field--item');
  if (badgesContainer) {
    const badges = badgesContainer.querySelectorAll('img');
    badges.forEach((badge) => {
      firstColumn.push(badge.cloneNode(true));
    });
  }

  const secondColumn = [];
  const contactHeader = element.querySelector('.footer-title h4 a');
  if (contactHeader) {
    secondColumn.push(contactHeader.cloneNode(true));
  }

  const contactDetails = element.querySelectorAll('.footer-text ul li');
  if (contactDetails.length > 0) {
    const contactList = document.createElement('ul');
    contactDetails.forEach((detail) => {
      contactList.appendChild(detail.cloneNode(true));
    });
    secondColumn.push(contactList);
  }

  const thirdColumn = [];
  const navigationColumns = element.querySelectorAll('.list-columns');
  navigationColumns.forEach((column) => {
    const links = column.querySelectorAll('a');
    links.forEach((link) => {
      thirdColumn.push(link.cloneNode(true));
    });
  });

  const cells = [
    headerRow,
    [firstColumn, secondColumn, thirdColumn]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}