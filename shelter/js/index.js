import pets from "./pets_data.js";
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

//Popup 

const popup = {
   'shadow': document.querySelector('.popup'),
   'overlay': document.querySelector('popup__overlay'),
   'window': document.querySelector('.popup__window'),
   'close': document.querySelector('.popup__close'),
   'img': document.querySelector('.popup__img'),
   'title': document.querySelector('.popup__title'),
   'subtitle': document.querySelector('.popup__subtitle'),
   'description': document.querySelector('.popup__description'),
   'feature': document.querySelector('.popup__feature'),
   'age': document.querySelector('.popup__age'),
   'inoculations': document.querySelector('.popup__inoculations'),
   'diseases': document.querySelector('.popup__diseases'),
   'parasites': document.querySelector('.popup__parasites'),
   'addContent': function (obj, namePet) {
      popup.shadow.style.display = 'flex';
      popup.img.src = obj[`${namePet}`].img;
      popup.title.textContent = obj[`${namePet}`].name;
      popup.subtitle.textContent = obj[`${namePet}`].type + ' - ' + obj[`${namePet}`].breed;
      popup.description.textContent = obj[`${namePet}`].description;
      popup.age.innerHTML = '<b>Age: </b>' + obj[`${namePet}`].age;
      popup.inoculations.innerHTML = '<b>Inoculations: </b>' + (obj[`${namePet}`].inoculations).join(', ');
      popup.diseases.innerHTML = '<b>Diseases: </b>' + (obj[`${namePet}`].diseases).join(', ');
      popup.parasites.innerHTML = '<b>Parasites: </b>' + (obj[`${namePet}`].parasites).join(', ');
      page.classList.add('body--no-scroll');
   },
   'closePopup': function () {
      popup.shadow.style.display = 'none';
      page.classList.remove('body--no-scroll');
   }
};

document.querySelectorAll('.pet-card').forEach(card => {
   card.addEventListener('click', () => {
      let namePet = card.querySelector('.pet-card__subtitle').textContent;
      popup.addContent(pets, namePet);
   })
})

popup.shadow.addEventListener('click', (e) => {
   let clickTarget = e.target;
   if (!clickTarget.classList.contains('popup__close') && !clickTarget.classList.contains('popup__overlay')) return;
   popup.closePopup();
})