export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`ai-footer-${cols.length}-cols`);

  // setup image ai-footer
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('ai-footer-img-col');
        }
      }
    });
  });

    // Select the <a> element
    const link = block.querySelector('.button-container a');
    link.classList.remove('button');
    console.log(link);

// Create a new <span> element
    const span = document.createElement('span');

// Optionally, add some text or attributes to the <span>
    span.classList.add('glyphicon');
    span.classList.add('map-pointer');// Example: adding an emoji before the text

// Insert the <span> before the text node of the <a> element
    link.insertBefore(span, link.firstChild);

  const h4 = block.querySelector('#navigation');

  // Check if the <h4> exists
  if (h4) {
    // Create a new <div> element
    const newDiv = document.createElement('div');
    newDiv.classList.add('footer-content');

    // Select the two <p> elements that follow the <h4>
    const p1 = h4.nextElementSibling;
    const p2 = p1 ? p1.nextElementSibling : null;

    // Check if both <p> elements exist
    if (p1 && p2 && p1.tagName === 'P' && p2.tagName === 'P') {
      // Append the <p> elements to the new <div>
      newDiv.appendChild(p1);
      newDiv.appendChild(p2);

      // Insert the new <div> right after the <h4>
      h4.insertAdjacentElement('afterend', newDiv);
    } else {
      console.error('The expected <p> elements were not found.');
    }
  } else {
    console.error('The <h4> element with id="navigation" was not found.');
  }
}
