import {
  showFavorites,
  showMovieDetails,
  showSearchResults,
} from "./components/movieCard";

document.addEventListener("DOMContentLoaded", () => {
  if (
    window.location.pathname === "/" ||
    window.location.pathname === "/index.html"
  ) {
    console.log("index.html");
    showAllCards(cardContainerRef);
  } else if (window.location.pathname === "/favorites.html") {
    console.log("favorites.html");
    showFavorites(cardContainerRef);
  } else if (window.location.pathname === "/movie.html") {
    console.log("movie.html");
    // behållare för enskild film
    showMovieDetails(movieInformationRef);
  } else if (window.location.pathname === "/search.html") {
    console.log("search.html");
    showSearchResults(cardContainerRef);
  }
});
