document.addEventListener("DOMContentLoaded", () => {
   document.querySelector('.whatsNews--title-icon svg').addEventListener('click', (e) => {
        document.querySelector('.l--grid').classList.toggle('is-wn-expanded');
    });
});
