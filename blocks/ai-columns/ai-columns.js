export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`ai-columns-${cols.length}-cols`);

  // setup image ai-columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('li picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('ai-columns-img-col');
        }
      }
    });
  });

  const buttons = document.querySelectorAll('.ai-columns .button-container');

  // Create a new container div
  const container = document.createElement('div');
  container.classList.add('button-wrapper');

  // Move buttons into the new container
  buttons.forEach(button => {
    container.appendChild(button);
  });

  const body = document.querySelectorAll('.ai-columns div:nth-child(2)');
  body.forEach(body => {
    body.appendChild(container);
  })

}
