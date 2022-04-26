const containerWidth = document.querySelector('.container').clientWidth;
const sliderContent = document.querySelector('.slider__content');
const firstPage = document.querySelector('#firstPage');
const prePage = document.querySelector('#prePage');
const currentPage = document.querySelector('#currentPage');
const nextPage = document.querySelector('#nextPage');
const lastPage = document.querySelector('#lastPage');

const cardsForDesktop = new Map();

const cardsForTablet = new Map();

const cardsForMobile = new Map();

function generatePage(cardsInPage) {
   let namePets = Object.keys(pets);
   let pageHTML = '';
   for (let i = 0; i < cardsInPage; i++) {
      let randomCard = Math.floor(Math.random() * 8);
      let name = namePets[randomCard];
      if (namePets[randomCard] !== undefined) {
         let card = document.createElement('div');
         let img = document.createElement('img');
         let subtitle = document.createElement('span');
         let btn = document.createElement('button');

         card.className = 'pet-card';
         img.className = 'pet-card__img';
         subtitle.className = 'pet-card__subtitle';
         btn.className = 'pet-card__button button-wihtout-bg';

         img.src = '../' + pets[`${name}`].img;
         subtitle.textContent = pets[`${name}`].name;
         btn.textContent = 'Learn more';
         card.append(img, subtitle, btn);
         pageHTML += card.outerHTML;
         delete namePets[randomCard];
      } else {
         i--;
      }
   }
   return pageHTML;
}

function fillData() {
   for (let i = 1; i <= 16; i++) {
      if (i >= 1 && i <= 6) {
         cardsForDesktop.set(i, generatePage(8));
         cardsForTablet.set(i, generatePage(6));
         cardsForMobile.set(i, generatePage(3));
      } else if (i >= 7 && i <= 8) {
         cardsForTablet.set(i, generatePage(6));
         cardsForMobile.set(i, generatePage(3));
      } else if (i >= 9 && i <= 16) {
         cardsForMobile.set(i, generatePage(3));
      }
   }
}
fillData();

window.addEventListener('load', () => {
   if (containerWidth > 1279) {
      sliderContent.innerHTML = cardsForDesktop.get(1);
   } else if (containerWidth <= 1279 && containerWidth > 768) {
      sliderContent.innerHTML = cardsForTablet.get(1);
   } else if (containerWidth <= 767) {
      sliderContent.innerHTML = cardsForMobile.get(1);
   }
})

function paginationForward() {
   currentPage.textContent = +currentPage.textContent + 1;
   if (+currentPage.textContent > 1) {
      prePage.addEventListener('click', paginationBack);
      firstPage.addEventListener('click', comeBackToStart);
      prePage.classList.remove('slider__move--disable');
      firstPage.classList.remove('slider__move--disable');
   }
   if (containerWidth > 1279) {
      if (+currentPage.textContent === 6) {
         nextPage.removeEventListener('click', paginationForward);
         nextPage.classList.add('slider__move--disable');
         lastPage.classList.add('slider__move--disable');
      }
      sliderContent.innerHTML = cardsForDesktop.get(+currentPage.textContent);
   } else if (containerWidth <= 1279 && containerWidth >= 768) {
      if (+currentPage.textContent === 8) {
         nextPage.removeEventListener('click', paginationForward);
         nextPage.classList.add('slider__move--disable');
         lastPage.classList.add('slider__move--disable');
      }
      sliderContent.innerHTML = cardsForTablet.get(+currentPage.textContent);
   } else if (containerWidth <= 767) {
      if (+currentPage.textContent === 16) {
         nextPage.removeEventListener('click', paginationForward);
         nextPage.classList.add('slider__move--disable');
         lastPage.classList.add('slider__move--disable');
      }
      sliderContent.innerHTML = cardsForMobile.get(+currentPage.textContent);
   }
}

function paginationBack() {
   currentPage.textContent = +currentPage.textContent - 1;
   if (+currentPage.textContent === 1) {
      prePage.removeEventListener('click', paginationBack);
      firstPage.removeEventListener('click', comeBackToStart);
      prePage.classList.add('slider__move--disable');
      firstPage.classList.add('slider__move--disable');
   }
   if (containerWidth > 1279) {
      if (+currentPage.textContent < 6) {
         nextPage.addEventListener('click', paginationForward);
         lastPage.addEventListener('click', goToForward);
         nextPage.classList.remove('slider__move--disable');
         lastPage.classList.remove('slider__move--disable');
      }
      sliderContent.innerHTML = cardsForDesktop.get(+currentPage.textContent);
   } else if (containerWidth <= 1279 && containerWidth >= 768) {
      if (+currentPage.textContent < 8) {
         nextPage.addEventListener('click', paginationForward);
         lastPage.addEventListener('click', goToForward);
         nextPage.classList.remove('slider__move--disable');
         lastPage.classList.remove('slider__move--disable');
      }
      sliderContent.innerHTML = cardsForTablet.get(+currentPage.textContent);
   } else if (containerWidth <= 767) {
      if (+currentPage.textContent < 16) {
         nextPage.addEventListener('click', paginationForward);
         lastPage.addEventListener('click', goToForward);
         nextPage.classList.remove('slider__move--disable');
         lastPage.classList.remove('slider__move--disable');
      }
      sliderContent.innerHTML = cardsForMobile.get(+currentPage.textContent);
   }
}

function comeBackToStart() {
   if (+currentPage.textContent > 1) {
      nextPage.addEventListener('click', paginationForward);
      lastPage.addEventListener('click', goToForward);
      prePage.removeEventListener('click', paginationBack);
      firstPage.removeEventListener('click', comeBackToStart);
      currentPage.textContent = 1;
      if (containerWidth > 1279) {
         sliderContent.innerHTML = cardsForDesktop.get(1);
      } else if (containerWidth <= 1279 && containerWidth >= 768) {
         sliderContent.innerHTML = cardsForTablet.get(1);
      } else if (containerWidth <= 767) {
         sliderContent.innerHTML = cardsForMobile.get(1);
      }
      prePage.classList.add('slider__move--disable');
      firstPage.classList.add('slider__move--disable');
      nextPage.classList.remove('slider__move--disable');
      lastPage.classList.remove('slider__move--disable');
   }
}
function goToForward() {
   if (!lastPage.classList.contains('slider__move--disable')) {
      prePage.classList.remove('slider__move--disable');
      firstPage.classList.remove('slider__move--disable');
      prePage.addEventListener('click', paginationBack);
      firstPage.addEventListener('click', comeBackToStart);
      if (containerWidth > 1279) {
         currentPage.textContent = 6;
         sliderContent.innerHTML = cardsForDesktop.get(6);
      } else if (containerWidth <= 1279 && containerWidth >= 768) {
         currentPage.textContent = 8;
         sliderContent.innerHTML = cardsForTablet.get(8);
      } else if (containerWidth <= 767) {
         currentPage.textContent = 16;
         sliderContent.innerHTML = cardsForMobile.get(16);
      }
      nextPage.classList.add('slider__move--disable');
      lastPage.classList.add('slider__move--disable');
      lastPage.removeEventListener('click', goToForward);
      nextPage.removeEventListener('click', paginationForward);
   }
}
nextPage.addEventListener('click', paginationForward);
lastPage.addEventListener('click', goToForward);