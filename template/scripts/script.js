import { fetchMovies, fetchFullOmdb, fetchSearchOmdb } from "./modules/api.js";
import { fullSingleMovie } from "./components/movieCard.js";
import { cardContainerRef, movieInformationRef } from "./utils/domUtils.js";
import { renderFavorites, updateFavoriteButtons } from "./utils/storage.js";
import {
  renderRandomTrailers,
  renderSearchResults,
  renderMovies,
} from "./utils/utils.js";
import { setUpSearchForm } from "./utils/events.js";

async function handlePageLoad() {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");
  const searchQuery = urlParams.get("s") || urlParams.get("query");
  const path = window.location.pathname;
  console.log(`if search:`, searchQuery);

  const movies = await fetchMovies();

  updateFavoriteButtons();
  // setUpSearchForm();

  if (
    path === "/template/" ||
    path === "/" ||
    path === "/template/index.html"
  ) {
    console.log("index.html");

    try {
      // fetchTrailers();

      if (movies.length > 0) {
        renderRandomTrailers(movies);
        renderMovies(movies, cardContainerRef);
        updateFavoriteButtons();
        setUpSearchForm();
      } else {
        console.error("Inga filmer att visa.");
      }
    } catch (error) {
      console.error("Fel vid hämtning av filmer:", error);
    }
  } else if (path === "/template/favorites.html") {
    console.log("favorites.html");
    try {
      renderFavorites();
      updateFavoriteButtons();
      setUpSearchForm();
    } catch (error) {
      console.error(`fel vid hämtning`, error);
    }
  } else if (path === "/template/movie.html") {
    console.log("movie.html");
    setUpSearchForm();
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

    if (searchQuery) {
      try {
        const movies = await fetchSearchOmdb(searchQuery);
        console.log(movies);

        renderSearchResults(movies);
      } catch (error) {
        console.error(`Fel vid hämtning av sökresultat:`, error);
      }
    }
    updateFavoriteButtons();
    setUpSearchForm();
  } else {
    console.warn("Okänd sida:", path);
  }
}

document.addEventListener("DOMContentLoaded", handlePageLoad);
