let apiKey = `1737b0b7`;

import { renderTrailers } from "./caroussel.js";
import { cardContainerRef } from "../utils/domUtils.js";
import { addMovieClickListeners } from "../utils/events.js";

export async function fetchTrailers() {
  try {
    const response = await fetch(
      "https://santosnr6.github.io/Data/favoritemovies.json"
    ); // Ersätt med rätt API-url
    const data = await response.json();

    if (!data || data.length === 0) {
      console.error("Inga trailers hittades.");
      return;
    }

    // Slumpa 5 trailers
    const shuffled = data.sort(() => 0.5 - Math.random()); // Blandar listan
    const selectedTrailers = shuffled.slice(0, 5); // Tar de första 5 filmerna
    console.log(selectedTrailers);
    // Rendera trailers
    selectedTrailers.forEach((movie, index) => {
      renderTrailers(movie, index + 1);
    });
  } catch (error) {
    console.error("Fel vid hämtning av trailers:", error);
  }
}

export async function fetchMovies() {
  try {
    const response = await fetch(
      "https://santosnr6.github.io/Data/favoritemovies.json"
    );
    return await response.json();
  } catch (error) {
    console.error("Fel vid hämtning av filmer:", error);
    return [];
  }
}

//sökfunktion fetch, justerade söksträng till parameter vid anrop
export async function fetchSearchOmdb(searchString) {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchString}`
    );
    return await response.json();
  } catch (error) {
    console.error(`Fel vid hämtning av filmer:`, error);
    return [];
  }
}

//sökfunktion fetch, justerade imdbID till parameter vid anrop
export async function fetchFullOmdb(imdbID) {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${apiKey}&plot=full&i=${imdbID}`
    );
    return await response.json();
  } catch (error) {
    console.error(`Fel vid hämtning av filmer:`, error);
    return [];
  }
}

// export async function fetchMovies() {
//   try {
//     let response = await fetch(
//       "https://santosnr6.github.io/Data/favoritemovies.json"
//     );
//     let recommendedMovies = await response.json();
//     console.log(recommendedMovies);

//     // let recommendedMovies = data.results.slice(0, 38);

//     cardContainerRef.innerHTML = recommendedMovies
//       .map(
//         (movie) =>
//           // <a href=/template/movie.html/${movie.imdbID} class="movieCard__link">
//           `
//         <article class="movieCard__article" data-id="${movie.imdbID}">
//               <img src="${movie.Poster}" alt="${movie.Title}" class="movieCard__img">
//               <p class="movieCard__title">${movie.Title}</p>
//           </article>`
//       )
//       .join("");

//     addMovieClickListeners();
//   } catch (error) {
//     console.error("Fel vid hämtning av filmer:", error);
//   }
// }

//SÖKAPI lägg till * efteråt, wildcardasterisk, för att få med även felstavningar. t.ex. btman istället för batman.
