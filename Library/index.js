const CAROUSEL = document.querySelector("#carousel");
const ITEM_LEFT = document.querySelector("#item-left");
const ITEM_RIGHT = document.querySelector("#item-right");
const PAGIN_LEFT = document.querySelector("#pagin-left");
const PAGIN_RIGHT = document.querySelector("#pagin-right");


const moveLeft = () => {
  const isFirstSlide = ITEM_LEFT.id === "item-active";
  if (!isFirstSlide) {
   CAROUSEL.classList.add("transition-left");
   PAGIN_LEFT.removeEventListener("click", moveLeft); 
   PAGIN_RIGHT.removeEventListener("click", moveRight);
   }
};

const moveRight = () => {
  const isLastSlide = ITEM_RIGHT.id === "item-active";
  if (!isLastSlide) {
     CAROUSEL.classList.add("transition-right");
     PAGIN_RIGHT.removeEventListener("click", moveRight);  
     PAGIN_LEFT.removeEventListener("click", moveLeft);
    } 
};

PAGIN_LEFT.addEventListener("click", moveLeft);
PAGIN_RIGHT.addEventListener("click", moveRight);

CAROUSEL.addEventListener("animationend", (animationEvent) => {
  let changedItem;
  if (animationEvent.animationName === "move-left") {
    CAROUSEL.classList.remove("transition-left");
    changedItem = ITEM_LEFT;
   document.querySelector("#item-active").innerHTML = ITEM_LEFT.innerHTML;
  } else {
    CAROUSEL.classList.remove("transition-right");
    changedItem = ITEM_RIGHT;
   document.querySelector("#item-active").innerHTML = ITEM_RIGHT.innerHTML;
  }
    
  PAGIN_LEFT.addEventListener("click", moveLeft);
  PAGIN_RIGHT.addEventListener("click", moveRight);
  
  const isFirstSlide = ITEM_LEFT.id === "item-active";
  const isLastSlide = ITEM_RIGHT.id === "item-active";

  if (isFirstSlide) {
      PAGIN_LEFT.style.opacity = "0.5";
      PAGIN_LEFT.removeEventListener("click", moveLeft);
  } else {
    PAGIN_LEFT.style.opacity = "1";
    PAGIN_LEFT.addEventListener("click", moveLeft);
  }

  if (isLastSlide) {
    PAGIN_RIGHT.style.opacity = "0.5";
    PAGIN_RIGHT.removeEventListener("click", moveRight);
  } else {
    PAGIN_RIGHT.style.opacity = "1";
    PAGIN_RIGHT.addEventListener("click", moveRight);
  }
});

let items = document.querySelectorAll('.carousel-adaptive .item');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
	currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
	isEnabled = false;
	items[currentItem].classList.add(direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('active', direction);
	});
}

function showItem(direction) {
	items[currentItem].classList.add('next', direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('next', direction);
		this.classList.add('active');
		isEnabled = true;
	});
}

function nextItem(n) {
	hideItem('to-left');
	changeCurrentItem(n + 1);
	showItem('from-right');
}

function previousItem(n) {
	hideItem('to-right');
	changeCurrentItem(n - 1);
	showItem('from-left');
}

document.querySelector('.control.left').addEventListener('click', function() {
	if (isEnabled) {
		previousItem(currentItem);
	}
});

document.querySelector('.control.right').addEventListener('click', function() {
	if (isEnabled) {
		nextItem(currentItem);
	}
});

/*document.querySelector('.control.right').removeEventListener('click', function() {
	if (currentItem = 4) {
		items[currentItem].addEventListener('animationend');
	}
});*/




document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("burger").addEventListener("click", function() {
        document.querySelector(".header").classList.toggle("open")
    })
})


window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
         document.querySelector(".header").classList.remove("open")
    }
});


document.getElementById("menu").addEventListener('click', event => {
    event._isClickWithInMenu = true;
});
document.getElementById("burger").addEventListener('click', event => {
    event._isClickWithInMenu = true;
});
document.body.addEventListener('click', event => {
    if (event._isClickWithInMenu) return;
    document.querySelector(".header").classList.remove("open")
});