import { fetchTrailers, fetchMovies } from "./modules/api.js";

// import {
//   showAllCards,
//   showFavorites,
//   showMovieDetails,
//   showSearchResults,
// } from "./components/movieCard.js";

import { cardContainerRef } from "./utils/domUtils.js";

document.addEventListener("DOMContentLoaded", function () {
  if (
    window.location.pathname === "/" ||
    window.location.pathname === "/template/index.html"
  ) {
    console.log("index.html");
    // Kör funktioner för startsidan, t.ex. hämta trailers och filmer
    fetchTrailers();
    fetchMovies();
    // showAllCards(cardContainerRef);
  } else if (window.location.pathname === "/template/favorites.html") {
    console.log("favorites.html");
    showFavorites(cardContainerRef);
    // Kör funktioner för favoritsidan om du har några
  } else if (window.location.pathname === "/template/movie.html") {
    console.log("movie.html");
    showMovieDetails(movieInformationRef);
    // Kör funktioner för enskild filmvisning
  } else if (window.location.pathname === "/template/search.html") {
    console.log("search.html");
    showSearchResults(cardContainerRef);
    // Kör funktioner för söksidan
  }
});
