import { movieInformationRef, createElement, appChild } from "./domUtils.js";
import { fetchMovies, fetchFullOmdb } from "../modules/api.js";
import { saveFavorite, getFavorites } from "./storage.js";
import { fullSingleMovie } from "../components/movieCard.js";

export async function addMovieClickListeners() {
  const movieArticles = document.querySelectorAll(".movieCard__article");

  for (const article of movieArticles) {
    const movieId = article.getAttribute("data-id");
    const image = article.querySelector(`.movieCard__img`);
    const button = article.querySelector(`.fav-btn`);
    const heartSymbol = article.querySelector(`.fav-btn .heart-symbol`);
    //lyssnare på bilden
    image.addEventListener("click", (event) => {
      console.log(`Klickade på:`, event.target);

      if (!movieId) {
        console.error("Ingen data-id hittad!");
        return;
      }

      // Navigera till den nya sidan och skicka med movieId i URL-parametern
      window.location.href = `/template/movie.html?id=${movieId}`;
    });
    button.addEventListener(`click`, async (event) => {
      console.log(`favorit klickad`);
      const info = await fetchFullOmdb(movieId);
      console.log(`information om:`, info);
      toggleHeart(heartSymbol);

      saveFavorite(info);
    });
  }
}

export function toggleHeart(heartSymbol) {
  if (heartSymbol.classList.contains("fa-regular")) {
    console.log(`changing color to yellow`);
    heartSymbol.classList.remove("fa-regular");
    heartSymbol.classList.add("fa-solid");
  } else {
    console.log(`changing color to black`);
    heartSymbol.classList.remove("fa-solid");
    heartSymbol.classList.add("fa-regular");
  }
}

export function updateHeartIcon() {
  console.log(`uppdateradicon`);
  toggleHeart();
}

document.addEventListener("DOMContentLoaded", async () => {
  // Hämta movieId från URL-parametern
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");

  if (!movieId) {
    console.error("Ingen movieId hittades i URL-parametrarna.");
    return;
  }

  try {
    // Hämta detaljerad information om filmen
    const movieData = await fetchFullOmdb(movieId);

    if (movieData && movieData.Response !== "False") {
      // Sätt innehållet från functionen singleMovie (html)
      movieInformationRef.innerHTML = fullSingleMovie(movieData);
    } else {
      console.error("Ingen film hittades med det ID:t.");
    }
  } catch (error) {
    console.error("Fel vid hämtning av filminformation:", error);
  }
});

// document.addEventListener("DOMContentLoaded", async () => {
//   // Hämta movieId från URL-parametern
//   const urlParams = new URLSearchParams(window.location.search);
//   const movieId = urlParams.get("id");

//   if (!movieId) {
//     console.error("Ingen movieId hittades i URL-parametrarna.");
//     return;
//   }

//   try {
//     // Hämta alla filmer från fetchMovies

//     // const allMovies = await fetchFullOmdb(movieId);
//     const allMovies = await fetchMovies();
//     const movieData = allMovies.find((movie) => movie.imdbID === movieId);

//     if (movieData) {
//       // Skapa HTML-innehåll för filmen
//       const singleMovie = `
//           <h2 class="movieCard__title movieCard__title--big">${
//             movieData.Title
//           }</h2>
//           <img src="${movieData.Poster}" alt="${
//         movieData.Title
//       } poster" class="movieCard__img movieCard__img--grid" />
//           <p class="movieCard__text">${
//             movieData.description || `Hittade ingen beskrivning`
//           }</p>
//         `;

//       // Sätt innehållet i #movieInformation
//       movieInformationRef.innerHTML = singleMovie;
//     } else {
//       console.error("Ingen film hittades med det ID:t.");
//     }
//   } catch (error) {
//     console.error("Fel vid hämtning av filminformation:", error);
//   }
// });

// export function addMovieClickListeners() {
//   const movieArticles = document.querySelectorAll(".movieCard__article");

//   movieArticles.forEach((article) => {
//     article.addEventListener("click", async () => {
//       const movieId = article.getAttribute("data-id");

//       if (!movieId) {
//         console.error("Ingen data-id hittad!");
//         return;
//       }

//       try {
//         // Hämta alla filmer från fetchMovies
//         const allMovies = await fetchMovies();
//         console.log(allMovies);

//         // Hitta filmen med det aktuella movieId
//         const movieData = allMovies.find((movie) => movie.imdbID === movieId);

//         console.log(movieData);
//         if (movieData) {
//           const singleMovie = `
//               <h2>${movieData.Title}</h2>
//               <img src="${movieData.Poster}" alt="${movieData.Title} poster" />
//               <p>${movieData.description || `ingen beskrivning tillgänglig`}</p>
//             `;
//           console.log(singleMovie);
//           document.querySelector(`#movieInformation`).innerHTML = singleMovie;

//           // Navigera till den separata film-sidan
//           window.location.href = `/template/movie.html?id=${movieId}`;
//         } else {
//           console.error("Filminformation hittades inte.");
//         }
//       } catch (error) {
//         console.error("Fel vid hämtning av filminformation:", error);
//       }
//     });
//   });
// }
