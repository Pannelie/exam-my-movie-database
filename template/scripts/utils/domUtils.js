//Hämtat section för mina trailers
// export const trailersContainerRef = document.querySelector(`.trailer`);

//section för rekommenderade filmer, återanvänds på index, favorites och search
export const cardContainerRef = document.querySelector(`#cardContainer`);

//detaljer för enskild film
export const movieInformationRef = document.querySelector(`#movieInformation`);

export function createElement(tag) {
  document.createElement("tag");
}

export function appChild(container, item) {
  container.appendChild(item);
}

//searchfield
export const searchInput = document.querySelector(`#searchInput`);

export function querySelector(element) {
  const item = document.querySelector(`element`);
  return item;
}

export const searchBtn = document.querySelector(`#searchBtn`);

export const formRef = document.querySelector(`#searchForm`);

export const autocompleteListRef = document.querySelector(`#autocompleteList`);

export const movieCardArticleRef =
  document.querySelector(`.movieCard__article`);
