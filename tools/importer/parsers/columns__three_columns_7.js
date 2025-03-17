export default function parse(element, {document}) {
  // Extract content dynamically from the element
  const columns = [];
  const listItems = element.querySelectorAll("ul > li");

  listItems.forEach((item) => {
    const titleElement = item.querySelector(".views-field-title .field-content");
    const dateElement = item.querySelector(".views-field-field-news-release-date .field-content");
    const imageElement = item.querySelector(".views-field-field-add-image-1 img");
    const bodyElement = item.querySelector(".views-field-field-publication-body .field-content");
    const linkElement = item.querySelector(".views-field-view-node a");

    const columnContent = [];

    // Extract and organize content for each column
    if (titleElement) {
      const title = document.createElement("h2");
      title.textContent = titleElement.textContent.trim();
      columnContent.push(title);
    }

    if (dateElement) {
      const date = document.createElement("p");
      date.textContent = dateElement.textContent.trim();
      columnContent.push(date);
    }

    if (imageElement) {
      const image = document.createElement("img");
      image.src = imageElement.src;
      image.alt = imageElement.alt;
      image.width = imageElement.width;
      image.height = imageElement.height;
      columnContent.push(image);
    }

    if (bodyElement) {
      const body = document.createElement("div");
      body.innerHTML = bodyElement.innerHTML.trim();
      columnContent.push(body);
    }

    if (linkElement) {
      const link = document.createElement("a");
      link.href = linkElement.href;
      link.textContent = linkElement.textContent.trim();
      columnContent.push(link);
    }

    columns.push(columnContent);
  });

  // Create header row
  const headerRow = [document.createElement("strong")];
  headerRow[0].textContent = "Columns";

  // Assemble cells for the table
  const cells = [
    headerRow,
    columns
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}