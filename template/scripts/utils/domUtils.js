//Hämtat section för mina trailers
const trailersContainerRef = document.querySelector(`.trailer`);

//section för rekommenderade filmer, återanvänds på index, favorites och search
const cardContainerRef = document.querySelector(`#cardContainer`);

//detaljer för enskild film
const movieInformationRef = document.querySelector(`#movieInformation`);

function createArticle() {
  document.createElement("article");
}

function appChild(container, item) {
  container.appendChild(item);
}
