//skapande av varje film-kort, stor och liten variant?
// innerhtml frånm variabel

import { addMovieClickListeners } from "../utils/events.js";
import { movieCardImgRef } from "../utils/domUtils.js";
import { truncateText } from "../utils/utils.js";
// import { updateFavoriteButtons } from "../utils/storage.js";

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
}

export function createCard(movieData) {
  const poster =
    movieData.Poster && movieData.Poster !== "N/A"
      ? movieData.Poster
      : "/template/res/icons/missing-poster.svg";

  return `
  <article class="movieCard__article movieCard__article--cursor">
  <button class="fav-btn" data-id="${
    movieData.imdbID
  }"><i class="fa-regular fa-heart heart-symbol"></i></button>
    <img src="${poster}" alt="${
    movieData.Title
  }" class="movieCard__img movieCard__img--zoom">
    <p class="movieCard__title movieCard__title--small">${truncateText(
      movieData.Title,
      70
    )}</p>
  </article>`;
}

export function fullSingleMovie(movieData) {
  const poster =
    movieData.Poster && movieData.Poster !== "N/A"
      ? movieData.Poster
      : "/template/res/icons/missing-poster.svg";
  return `
        <article class="movieCard__article">
        <img src="${poster}" alt="${movieData.Title} poster" 
            class="movieCard__img movieCard__img--grid" />
            <button class="fav-btn" data-id="${
              movieData.imdbID
            }"><i class="fa-regular fa-heart heart-symbol"></i></button>
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
