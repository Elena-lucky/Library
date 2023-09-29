const clientID = "AqPW-5iRXlE13qzLcoA92Towjw077mb-Qv-hIG7rUmA";
const container = document.getElementById("container__img");

let state = [];

const getPhotos = async () => {
    try {
        const url = `https://api.unsplash.com/photos/random?client_id=${clientID}&count=16`;
        const res = await fetch(url);
        const data = await res.json();
    
        if (res.ok && data.length) {
            state = data;
            setPhotos();
        }
    } catch (err) {
        console.log(err);
      }
    };
    
    const renderPhoto = () => {
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
    };
    
    
    const setPhotos = () => {
        container.innerHTML = renderPhoto();
    };
    
    getPhotos();

