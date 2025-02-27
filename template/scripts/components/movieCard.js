//skapande av varje film-kort, stor och liten variant?
// innerhtml frånm variabel

// import { addMovieClickListeners } from "../utils/events.js";
import { truncateText, dataExist } from "../utils/utils.js";
// import { updateFavoriteButtons } from "../utils/storage.js";

// HTML för de enskilda filmer som kortfattat ska visas upp i galleri
export function createCard(movieData) {
  const imgSrc = "/template/res/icons/missing-poster.svg";

  return `
  <article class="movieCard__article movieCard__article--cursor">
  <button class="fav-btn" aria-label="Lägg till i favoriter" data-id="${
    movieData.imdbID
  }"><i class="fa-regular fa-heart heart-symbol"></i></button>
    <img src="${dataExist(
      movieData.Poster,
      imgSrc
    )}" alt="Poster från filmen: ${
    movieData.Title
  }" class="movieCard__img movieCard__img--zoom">
    <p class="movieCard__title movieCard__title--small">${truncateText(
      movieData.Title,
      70
    )}</p>
  </article>`;
}

// HTML för enskild film med full information
export function fullSingleMovie(movieData) {
  const imgSrc = "/template/res/icons/missing-poster.svg";
  const emptyString = ``;
  const notAvailable = `Not provided`;

  return `
        <article class="movieCard__article movieCard__article--grid">
        <img src="${dataExist(movieData.Poster, imgSrc)}" alt="${
    movieData.Title
  } poster" 
            class="movieCard__img movieCard__img--grid" />
            <button class="fav-btn" aria-label="Lägg till i favoriter" data-id="${
              movieData.imdbID
            }"><i class="fa-regular fa-heart heart-symbol"></i></button>
        </article>
        <section class="movieCard__text-content">
            <h1 class="movieCard__title movieCard__title--big">${
              movieData.Title
            }</h1>
            <section class="movieCard__flex-container">
                <p class="movieCard__text movieCard__text--short">${dataExist(
                  movieData.Genre,
                  emptyString
                )}</p>
                <p class="movieCard__text movieCard__text--short">${dataExist(
                  movieData.Year,
                  emptyString
                )}</p>
                <p class="movieCard__text movieCard__text--short">${dataExist(
                  movieData.Runtime,
                  emptyString
                )}</p>
            </section>
            <p class="movieCard__text movieCard__text--plot"><strong>Plot: </strong>${dataExist(
              movieData.Plot,
              notAvailable
            )}
            </p>
           <p class="movieCard__text movieCard__text--long"><strong>Director:</strong> ${dataExist(
             movieData.Director,
             notAvailable
           )}</p>
          
        <p class="movieCard__text movieCard__text--long"><strong>Actors:</strong> ${dataExist(
          movieData.Actors,
          notAvailable
        )}</p>
        <p class="movieCard__text movieCard__text--long movieCard__text--award">${dataExist(
          movieData.Awards,
          emptyString
        )}</p>
           </section>
          `;
}
