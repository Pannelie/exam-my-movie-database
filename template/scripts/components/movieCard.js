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
    updateHeartIcon();
  });
}

export function createCard(movie) {
  return `
  <article class="movieCard__article" data-id="${movie.imdbID}">
  <button class="fav-btn"><i class="fa-regular fa-heart heart-symbol"></i></button>
    <img src="${movie.Poster}" alt="${movie.Title}" class="movieCard__img movieCard__img--zoom">
    <p class="movieCard__title movieCard__title--small">${movie.Title}</p>
  </article>`;
}

export function fullSingleMovie(movieData) {
  return `
        <article class="movieCard__article">
        <img src="${movieData.Poster}" alt="${movieData.Title} poster" 
            class="movieCard__img movieCard__img--grid" />
            <button class="fav-btn"><i class="fa-regular fa-heart heart-symbol"></i></button>
        </article>
        <section class="movieCard__text-content">
            <h2 class="movieCard__title movieCard__title--big">${
              movieData.Title
            }</h2>
            <section class="movieCard__flex-container">
                <p class="movieCard__text movieCard__text--short">${
                  movieData.Genre
                }</p>
                <p class="movieCard__text movieCard__text--short">${
                  movieData.Year
                }</p>
                <p class="movieCard__text movieCard__text--short">${
                  movieData.Runtime
                }</p>
            </section>
            <p class="movieCard__text movieCard__text--plot">${
              movieData.Plot || `Hittade ingen beskrivning`
            }
            </p>
            ${
              movieData.Director && movieData.Director !== "N/A"
                ? `<p class="movieCard__text movieCard__text--long"><strong>Director:</strong> ${movieData.Director}</p>`
                : ""
            }
        <p class="movieCard__text movieCard__text--long"><strong>Actors:</strong> ${
          movieData.Actors
        }</p>
        ${
          movieData.Awards && movieData.Awards !== "N/A"
            ? `<p class="movieCard__text movieCard__text--long movieCard__text--award">${movieData.Awards}</p>`
            : ""
        }</section>
          `;
}
