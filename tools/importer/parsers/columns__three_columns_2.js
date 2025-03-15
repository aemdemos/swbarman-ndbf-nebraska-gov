export default function parse(element, {document}) {
  const createTable = WebImporter.DOMUtils.createTable;

  // Helper to create header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  const cells = [];

  // Extract content for Logo section
  const logoSection = element.querySelector('.ndbf-logo-footer');
  const logoContent = logoSection ? logoSection.cloneNode(true) : '';

  const addressSection = element.querySelector('.logo-text');
  const addressContent = addressSection ? addressSection.cloneNode(true) : '';

  cells.push([logoContent, addressContent]);

  // Extract content for Contact section
  const contactSection = element.querySelector('.footer-text:nth-of-type(2) ul');
  const contactContent = contactSection ? contactSection.cloneNode(true) : '';

  cells.push(['CONTACT', contactContent]);

  // Extract content for Navigation section
  const navColumn1 = element.querySelector('.list-columns');
  const navColumn2 = element.querySelector('.list-column-two');

  const navColumn1Content = navColumn1 ? navColumn1.cloneNode(true) : '';
  const navColumn2Content = navColumn2 ? navColumn2.cloneNode(true) : '';

  cells.push(['NAVIGATION', navColumn1Content, navColumn2Content]);

  // Extract content for Footer Logo section
  const footerLogoSection = element.querySelector('.official-logo');
  const footerLogoContent = footerLogoSection ? footerLogoSection.cloneNode(true) : '';

  const poweredBySection = element.querySelector('.ni-footer p');
  const poweredByContent = poweredBySection ? poweredBySection.cloneNode(true) : '';

  cells.push([footerLogoContent, poweredByContent]);

  // Extract content for Bottom footer section
  const bottomFooterSection = element.querySelector('.bottom-footer-text ul');
  const bottomFooterContent = bottomFooterSection ? bottomFooterSection.cloneNode(true) : '';

  cells.push(['', bottomFooterContent]);

  // Combine header and data rows into table data
  const tableData = [headerRow, ...cells];
  const blockTable = createTable(tableData, document);

  // Replace the original element with the parsed table
  element.replaceWith(blockTable);
}