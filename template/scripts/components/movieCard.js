//skapande av varje film-kort, stor och liten variant?
// innerhtml frånm variabel

import { getFavorites } from "/template/scripts/utils/storage.js";

// knapp för att lägga till favorit med add-eventlistener.

import { addMovieClickListeners } from "../utils/events.js";

export function renderMovies(movies, container) {
  if (!container) {
    console.error("Container hittades inte!");
    return;
  }

  container.innerHTML = movies
    .map(
      (movie) =>
        `<article class="movieCard__article" data-id="${movie.imdbID}">
          <img src="${movie.Poster}" alt="${movie.Title}" class="movieCard__img">
          <p class="movieCard__title">${movie.Title}</p>
        </article>`
    )
    .join("");

  // Lägg till event listeners efter renderingen
  addMovieClickListeners();
}

//
//
//
//
//
//
// // // Funktioner för att visa innehåll
// export function showAllCards(container) {
//   // Här kan du lägga till alla kort som finns på index-sidan
//   container.innerHTML = "<div>Alla kort här...</div>";
// }

// export function showFavorites(container) {
//   // Hämta favoriter från localStorage och visa dem
//   getFavorites();
//   container.innerHTML = ""; // Rensa befintligt innehåll

//   favorites.forEach((favorite) => {
//     const card = createArticle();
//     card.textContent = favorite.title; // Visa titel eller annan information
//     appChild(container, card);
//   });
// }

// export function showMovieDetails(container) {
//   // Här kan du lägga till logik för att visa detaljer om en film
//   container.innerHTML = "<div>Film detajer här...</div>";
// }

// export function showSearchResults(container) {
//   // Visa sökresultat, kanske genom att hämta data från en sökning
//   container.innerHTML = "<div>Sökresultat här...</div>";
// }
