import { fetchTrailers, fetchMovies, fetchFullOmdb } from "./modules/api.js";
import { renderMovies, fullSingleMovie } from "./components/movieCard.js";
import { cardContainerRef, movieInformationRef } from "./utils/domUtils.js";
import { showFavorites, updateFavoriteButtons } from "./utils/storage.js";

async function handlePageLoad() {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");
  const path = window.location.pathname;

  updateFavoriteButtons();

  if (
    path === "/template/" ||
    path === "/" ||
    path === "/template/index.html"
  ) {
    console.log("index.html");

    try {
      fetchTrailers();
      const movies = await fetchMovies();
      if (movies.length > 0) {
        renderMovies(movies, cardContainerRef);
        updateFavoriteButtons();
      } else {
        console.error("Inga filmer att visa.");
      }
    } catch (error) {
      console.error("Fel vid hämtning av filmer:", error);
    }
  } else if (path === "/template/favorites.html") {
    console.log("favorites.html");
    showFavorites();
    updateFavoriteButtons();
  } else if (path === "/template/movie.html") {
    console.log("movie.html");
    updateFavoriteButtons();

    if (!movieId) {
      console.error("Ingen movieId hittades i URL-parametrarna.");
      return;
    }

    try {
      const movieData = await fetchFullOmdb(movieId);
      if (movieData && movieData.Response !== "False") {
        movieInformationRef.innerHTML = fullSingleMovie(movieData);
        updateFavoriteButtons();
      } else {
        console.error("Ingen film hittades med det ID:t.");
      }
    } catch (error) {
      console.error("Fel vid hämtning av filminformation:", error);
    }
  } else if (path === "/template/search.html") {
    console.log("search.html");
    updateFavoriteButtons();
  } else {
    console.warn("Okänd sida:", path);
  }
}

document.addEventListener("DOMContentLoaded", handlePageLoad);
