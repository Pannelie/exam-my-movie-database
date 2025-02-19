import { renderTrailers } from "./caroussel.js";

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
    let response = await fetch(
      "https://santosnr6.github.io/Data/favoritemovies.json"
    );
    let recommendedMovies = await response.json();

    // let recommendedMovies = data.results.slice(0, 38);

    moviesContainer.innerHTML = recommendedMovies
      .map(
        (movie) =>
          `<div class="movie">
              <img src="${movie.poster_path}" alt="${movie.title}">
              <p>${movie.title}</p>
          </div>`
      )
      .join("");
  } catch (error) {
    console.error("Fel vid hämtning av filmer:", error);
  }
}

// Anropa funktionen när sidan laddas
document.addEventListener("DOMContentLoaded", fetchTrailers);

