import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'ai-cards-card-image';
      else div.className = 'ai-cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);

  document.querySelectorAll(".ai-cards ul li").forEach(li => {
    const link = li.querySelector(".ai-cards-card-body a");
    if (link) {
      const url = link.href;
      const wrapper = document.createElement("a");
      wrapper.href = url;
      wrapper.style.textDecoration = "none";
      wrapper.style.color = "inherit";
      wrapper.style.width = "100%";

      while (li.firstChild) {
        wrapper.appendChild(li.firstChild);
      }
      li.appendChild(wrapper);
    }

  });

}
