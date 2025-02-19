import { movieInformationRef, createElement, appChild } from "./domUtils.js";
import { fetchMovies } from "../modules/api.js";

export function addMovieClickListeners() {
  const movieArticles = document.querySelectorAll(".movieCard__article");

  movieArticles.forEach((article) => {
    article.addEventListener("click", async () => {
      const movieId = article.getAttribute("data-id");

      if (!movieId) {
        console.error("Ingen data-id hittad!");
        return;
      }

      // Navigera till den nya sidan och skicka med movieId i URL-parametern
      window.location.href = `/template/movie.html?id=${movieId}`;
    });
  });
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
    // Hämta alla filmer från fetchMovies
    const allMovies = await fetchMovies();
    const movieData = allMovies.find((movie) => movie.imdbID === movieId);

    if (movieData) {
      // Skapa HTML-innehåll för filmen
      const singleMovie = `
          <h2>${movieData.Title}</h2>
          <img src="${movieData.Poster}" alt="${movieData.Title} poster" />
          <p>${movieData.description || `Hittade ingen beskrivning`}</p>
        `;

      // Sätt innehållet i #movieInformation
      movieInformationRef.innerHTML = singleMovie;
    } else {
      console.error("Ingen film hittades med det ID:t.");
    }
  } catch (error) {
    console.error("Fel vid hämtning av filminformation:", error);
  }
});

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
