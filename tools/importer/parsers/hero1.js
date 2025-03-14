export default function parse(element, {document}) {
  const cells = [];

  // Header row indicating block type
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Footer';
  cells.push(headerRow);

  // Extract navigation links dynamically
  const navLinks = element.querySelectorAll('.footer__menu .footer-link-item');
  if (navLinks.length > 0) {
    navLinks.forEach((link) => {
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.textContent = link.textContent.trim();
      cells.push([linkElement]);
    });
  }

  // Separate section with hr
  const separator = document.createElement('hr');
  cells.push([separator]);

  // Footer content handling empty or missing data
  const footerContent = element.querySelector('.footer__content');
  if (footerContent) {
    const descriptionParagraphs = footerContent.querySelectorAll('.footer__text p');

    if (descriptionParagraphs.length > 0) {
      descriptionParagraphs.forEach((paragraph) => {
        const trimmedText = paragraph.textContent.trim();
        if (trimmedText) {
          cells.push([trimmedText]);
        }
      });
    }

    const logoImg = footerContent.querySelector('.footer__logo');
    if (logoImg) {
      const logoElement = document.createElement('img');
      logoElement.src = logoImg.src;
      logoElement.alt = logoImg.alt;
      cells.push([logoElement]);
    }
  }

  // Create the block table dynamically and replace the element
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}