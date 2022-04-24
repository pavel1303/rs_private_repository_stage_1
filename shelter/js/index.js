//Burger menu
const page = document.querySelector('.body');

const burgerMenu = {
   'shadow': document.querySelector('.header__navigation'),
   'menu': document.querySelector('.navigation'),
   'burger': document.querySelector('.burger'),
   'logo': document.querySelector('.header__logo'),
   'links': document.querySelectorAll('.navigation__item'),
   'open': function () {
      this.shadow.classList.add('header__navigation--open');
      this.menu.classList.add('navigation--open');
      this.burger.classList.add('burger--open');
      this.logo.classList.add('header__logo--open');
   },
   'close': function () {
      this.shadow.classList.remove('header__navigation--open');
      this.menu.classList.remove('navigation--open');
      this.burger.classList.remove('burger--open');
      this.logo.classList.remove('header__logo--open');
   }
}

burgerMenu.burger.addEventListener('click', () => {
   page.classList.toggle('body--no-scroll');
   burgerMenu.burger.classList.contains('burger--open') ? burgerMenu.close() : burgerMenu.open();
});

burgerMenu.shadow.addEventListener('click', (e) => {
   let shadow = e.target;
   if (!shadow.classList.contains('header__navigation--open')) return;
   page.classList.remove('body--no-scroll');
   burgerMenu.close();
});

burgerMenu.menu.addEventListener('click', (e) => {
   let link = e.target.closest('a');
   if (!link) return;
   page.classList.remove('body--no-scroll');
   burgerMenu.close();
});