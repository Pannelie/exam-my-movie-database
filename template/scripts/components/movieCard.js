//skapande av varje film-kort, stor och liten variant?
// innerhtml frånm variabel

import { getFavorites } from "/template/scripts/utils/storage.js";
import { addMovieClickListeners, updateHeartIcon } from "../utils/events.js";

export function renderMovies(movies, container) {
  if (!container) {
    console.error("Container hittades inte!");
    return;
  }

  container.innerHTML = movies.map(createCard).join("");

  // Lägg till event listeners efter renderingen
  setTimeout(() => {
    addMovieClickListeners();
  }, 0);
  document.querySelectorAll(".fav-btn").forEach((heartIcon) => {
    const movieId = heartIcon
      .closest(".movieCard__article")
      .getAttribute("data-id");
    updateHeartIcon(heartIcon, movieId);
  });
}

export function createCard(movie) {
  return `
  <article class="movieCard__article" data-id="${movie.imdbID}">
  <button class="fav-btn"><i class="fa-regular fa-heart heart-symbol"></i></button>
    <img src="${movie.Poster}" alt="${movie.Title}" class="movieCard__img">
    <p class="movieCard__title movieCard__title--small">${movie.Title}</p>
  </article>`;
}
