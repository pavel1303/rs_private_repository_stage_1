//slider

const leftGroup = document.querySelector('#leftGroup');
const centerGroup = document.querySelector('#centerGroup');
const rightGroup = document.querySelector('#rightGroup');
const cards = [];

for (let pet in pets) {
   let card = document.createElement('div');
   let img = document.createElement('img');
   let subtitle = document.createElement('span');
   let btn = document.createElement('button');

   card.className = 'pet-card';
   img.className = 'pet-card__img';
   subtitle.className = 'pet-card__subtitle';
   btn.className = 'pet-card__button button-wihtout-bg';

   img.src = pets[`${pet}`].img;
   subtitle.textContent = pets[`${pet}`].name;
   btn.textContent = 'Learn more';
   card.append(img, subtitle, btn);
   cards.push(card);
}

const groupGen = {
   'first': 0,
   'second': 0,
   'threed': 0,
   'lastFirst': 0,
   'lastSecond': 0,
   'lastThreed': 0,
   'createNewGroup': function () {
      let group = '';
      let count = 3;
      while (count !== 0) {
         let currentEl = Math.floor(Math.random() * 8);
         if (currentEl != this.first &&
            currentEl != this.second &&
            currentEl != this.threed &&
            currentEl != this.lastFirst &&
            currentEl != this.lastSecond) {
            if (count === 3) {
               this.first = currentEl;
            } else if (count === 2) {
               this.second = currentEl;
            } else if (count === 1) {
               this.threed = currentEl;
            }
            group += cards[currentEl].outerHTML;
            count--;
         }
      }
      this.lastFirst = this.first;
      this.lastSecond = this.second;
      return group;
   }
}

let sliderBtnLeft = document.querySelector('.slider__left');
let sliderBtnRight = document.querySelector('.slider__right');
let slider = document.querySelector('.slider__content');

function moveLeft() {
   slider.classList.add('transition-left');
   sliderBtnLeft.removeEventListener('click', moveLeft);
   sliderBtnRight.removeEventListener('click', moveRight);
   leftGroup.innerHTML = groupGen.createNewGroup();
}
function moveRight() {
   slider.classList.add('transition-right');
   sliderBtnLeft.removeEventListener('click', moveLeft);
   sliderBtnRight.removeEventListener('click', moveRight);
   rightGroup.innerHTML = groupGen.createNewGroup();
}

sliderBtnLeft.addEventListener('click', moveLeft);
sliderBtnRight.addEventListener('click', moveRight);

slider.addEventListener('animationend', (event) => {
   if (event.animationName === 'slide-left') {
      slider.classList.remove('transition-left');
      sliderBtnLeft.addEventListener('click', moveLeft);
      sliderBtnRight.addEventListener('click', moveRight);
      centerGroup.innerHTML = leftGroup.innerHTML;
   }
   if (event.animationName === 'slide-right') {
      slider.classList.remove('transition-right');
      sliderBtnLeft.addEventListener('click', moveLeft);
      sliderBtnRight.addEventListener('click', moveRight);
      centerGroup.innerHTML = rightGroup.innerHTML;
   }
})