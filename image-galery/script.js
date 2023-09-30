const clientID = "AqPW-5iRXlE13qzLcoA92Towjw077mb-Qv-hIG7rUmA";
const container = document.getElementById("container__img");

let state = [];

async function getPhoto(query) {
    try {
       const res = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=16&orientation=landscape&client_id=${clientID}`);
       const data = await res.json();
       state = data.results;
       setPhotos();
    } catch (error) {
        console.error(error);
      }
    }  
    function renderPhoto() {
      return state
       .map(({ urls: { regular }, user: { name } }) => {
        return `<div class="container__photo" style="background-image: url(${regular})">
                  <div class="img__text">
                     <span>photo by</span>
                     ${name}
                  </div>
                </div>`;  
    })

    .join("");
  }


     const setPhotos = () => {
      container.innerHTML = renderPhoto();
    };

    const searchInput = document.getElementById("search");
    searchInput.addEventListener("input", (event) => {
        getPhoto(event.target.value);
    });
getPhoto();

