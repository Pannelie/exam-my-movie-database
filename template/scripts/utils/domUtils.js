//Hämtat section för mina trailers
// export const trailersContainerRef = document.querySelector(`.trailer`);

//section för rekommenderade filmer, återanvänds på index, favorites och search
export const cardContainerRef = document.querySelector(`#cardContainer`);

//detaljer för enskild film
export const movieInformationRef = document.querySelector(`#movieInformation`);

export function createArticle() {
  document.createElement("article");
}

export function appChild(container, item) {
  container.appendChild(item);
}
