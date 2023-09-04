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

document.querySelector('.control.left').removeEventListener('click', function() {
	if (currentItem = 0) {
    document.querySelector(".control.left").style.opacity = "0.5";
    document.querySelector(".control.left").classList.add('disable');
	}
});

/*document.querySelector('.buttonPagination').addEventListener('click', function() {
	if (isEnabled) {
		previousItem(currentItem);
	}
});

/*document.querySelector('.control.right').addEventListener('click', function() {
	if (isEnabled) {
		nextItem(currentItem);
	}
});*/

/*document.querySelector('.tag').removeEventListener('click', function() {
	if (currentItem = 0) {
		PAGIN_LEFT.style.opacity = "0.5";
    PAGIN_LEFT.classList.add('disabled');
	}
});*/

window.onload = function () {
  addTagsClickHandler();
}

const addTagsClickHandler = () => {
  document.querySelector('.strategies__tags').addEventListener('click', (e) => {
    if (e.target.classList.contains('tag')) {
      let clickedTag = e.target;
      removeSelectedTags();
      selectClickedTag(clickedTag);
    }
  })
} 

const removeSelectedTags = () => {
  let tags = document.querySelectorAll('.strategies__tags .tag');
  tags.forEach(tag => {
    tag.classList.remove('tag_selected');
    tag.classList.add('tag_bordered');
  })
}

const selectClickedTag = (clickedTag) => {
  clickedTag.classList.add('tag_selected');
  clickedTag.classList.remove('tag_bordered');
}

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

//секция favorites//

const radioButtons = document.querySelectorAll('input[name="favorites"]');
const cards = document.querySelectorAll('.bg-description');
let visibleRange = [0, 3];


function fadeOutCards() {
   cards.forEach(card => {
      card.style.transition = 'opacity 0.5s ease';
      card.style.opacity = 0;
      card.style.pointerEvents = 'none';
   });
}


function fadeInCards(start, end) {
   for (let i = start; i <= end; i++) {
      cards[i].style.transition = 'opacity 0.5s ease';
      cards[i].style.opacity = 1;
      cards[i].style.pointerEvents = 'auto';
   }
}

radioButtons[0].checked = true;

function showAllCards() {
  cards.forEach(card => {
     card.classList.remove('hidden');
  });
}

fadeInCards(visibleRange[0], visibleRange[1]);

radioButtons.forEach((radio, index) => {
  radio.addEventListener('change', () => {
     fadeOutCards();

     switch (radio.value) {
        case 'winter':
           visibleRange = [0, 3];
           break;
        case 'spring':
           visibleRange = [4, 7];
           break;
        case 'summer':
           visibleRange = [8, 11];
           break;
        case 'autumn':
           visibleRange = [12, 15];
           break;
     }

     setTimeout(() => {
        fadeInCards(visibleRange[0], visibleRange[1]);
        showAllCards(); 
     }, 500); 
  });
});

// drop menu no auth //

/*document.addEventListener('click', function(event) {
  let id = event.target.dataset.toggleId;
  if (!id) return;

  let elem = document.getElementById(id);

  elem.hidden = !elem.hidden;
});

window.addEventListener('keydown', (e) => {
  if (e.key === "Escape") {
       document.querySelector(".drop-menu-no-auth").classList.remove("hidden")
  }
});
document.body.addEventListener('click', event => {
  if (event._isClickWithInMenu) return;
  document.querySelector(".drop-menu-no-auth").classList.remove("hidden")
});*/

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("drop-menu-no-auth").addEventListener("click", function() {
      document.querySelector(".drop-menu-no-auth").classList.toggle("visible")
  })
})


window.addEventListener('keydown', (e) => {
  if (e.key === "Escape") {
       document.querySelector(".drop-menu-no-auth").classList.remove("visible")
  }
});


document.getElementById("profile").addEventListener('click', event => {
  event._isClickWithInProfile = true;
});
document.getElementById("drop-menu-no-auth").addEventListener('click', event => {
  event._isClickWithInProfile = true;
});
document.body.addEventListener('click', event => {
  if (event._isClickWithInProfile) return;
  document.querySelector(".drop-menu-no-auth").classList.remove("visible")
});

// модальные окна //

// for login //

document.getElementById("modal-login-open-btn").addEventListener("click", function() {
  document.getElementById("modal-for-login").classList.add("opened")
})

document.getElementById("btn-for-login-register").addEventListener("click", function() {
  document.getElementById("modal-for-login").classList.add("opened")
})

// Закрыть модальное окно
document.getElementById("close-modal-for-login-btn").addEventListener("click", function() {
  document.getElementById("modal-for-login").classList.remove("opened")
})

// Закрыть модальное окно при нажатии на Esc
window.addEventListener('keydown', (e) => {
  if (e.key === "Escape") {
      document.getElementById("modal-for-login").classList.remove("opened")
  }
});

// Закрыть модальное окно при клике вне его
document.querySelector("#modal-for-login .modal-login").addEventListener('click', event => {
  event._isClickWithInModal = true;
});
document.getElementById("modal-for-login").addEventListener('click', event => {
  if (event._isClickWithInModal) return;
  event.currentTarget.classList.remove('opened');
});

// for register //

document.getElementById("modal-register-open-btn").addEventListener("click", function() {
  document.getElementById("modal-for-register").classList.add("opened")
})

document.getElementById("btn-for-open-register").addEventListener("click", function() {
  document.getElementById("modal-for-register").classList.add("opened")
})

// Закрыть модальное окно
document.getElementById("close-modal-for-register-btn").addEventListener("click", function() {
  document.getElementById("modal-for-register").classList.remove("opened")
})

// Закрыть модальное окно при нажатии на Esc
window.addEventListener('keydown', (e) => {
  if (e.key === "Escape") {
      document.getElementById("modal-for-register").classList.remove("opened")
  }
});

// Закрыть модальное окно при клике вне его
document.querySelector("#modal-for-register .modal-register").addEventListener('click', event => {
  event._isClickWithInModal = true;
});
document.getElementById("modal-for-register").addEventListener('click', event => {
  if (event._isClickWithInModal) return;
  event.currentTarget.classList.remove('opened');
});
