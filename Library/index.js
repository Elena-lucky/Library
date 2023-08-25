const BTN_LEFT = document.querySelector("#btn-left");
const BTN_RIGHT = document.querySelector("#btn-right");
const CAROUSEL = document.querySelector("#carousel");
const ITEM_LEFT = document.querySelector("#item-left");
const ITEM_RIGHT = document.querySelector("#item-right");
const PAGIN_LEFT = document.querySelector("#pagin-left");
const PAGIN_RIGHT = document.querySelector("#pagin-right");

/*const createCardTemplate = () => {
    const card = document.createElement("img");
    card.classList.add("inside");
    return card;
  }*/

const moveLeft = () => {
    CAROUSEL.classList.add("transition-left");
    BTN_LEFT.removeEventListener("click", moveLeft);
    PAGIN_LEFT.removeEventListener("click", moveLeft); 
    BTN_RIGHT.removeEventListener("click", moveRight);
    PAGIN_RIGHT.removeEventListener("click", moveRight);
};

const moveRight = () => {
    CAROUSEL.classList.add("transition-right");
    BTN_RIGHT.removeEventListener("click", moveRight);
    PAGIN_RIGHT.removeEventListener("click", moveRight);  
    BTN_LEFT.removeEventListener("click", moveLeft);
    PAGIN_LEFT.removeEventListener("click", moveLeft); 
};

BTN_LEFT.addEventListener("click", moveLeft);
PAGIN_LEFT.addEventListener("click", moveLeft);
BTN_RIGHT.addEventListener("click", moveRight);
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

/*changedItem.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    const card = createCardTemplate();
    changedItem.appendChild(card);
  }*/
    
  BTN_LEFT.addEventListener("click", moveLeft);
  BTN_RIGHT.addEventListener("click", moveRight);
  PAGIN_LEFT.addEventListener("click", moveLeft);
  PAGIN_RIGHT.addEventListener("click", moveRight);
})




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