import { fetchTrailers, fetchMovies } from "./modules/api.js";
import {
  addMovieClickListeners,
  addsingleFavListener,
} from "./utils/events.js";
import { renderMovies } from "./components/movieCard.js";
import { cardContainerRef } from "./utils/domUtils.js";
import { showFavorites } from "./utils/storage.js";

// Funktion som hanterar varje sidtyp
async function handlePageLoad() {
  const path = window.location.pathname;

  if (
    path === "/template/" ||
    path === "/" ||
    path === "/template/index.html"
  ) {
    console.log("index.html");

    // Hämta och rendera filmer för startsidan
    try {
      fetchTrailers();
      const movies = await fetchMovies();

      if (movies.length > 0) {
        renderMovies(movies, cardContainerRef);
        addMovieClickListeners(); // Lägg till event efter renderingen
      } else {
        console.error("Inga filmer att visa.");
      }
    } catch (error) {
      console.error("Fel vid hämtning av filmer:", error);
    }
  } else if (path === "/template/favorites.html") {
    console.log("favorites.html");
    addsingleFavListener();
    showFavorites();
  } else if (path === "/template/movie.html") {
    console.log("movie.html");
  } else if (path === "/template/search.html") {
    console.log("search.html");
  } else {
    console.warn("Okänd sida:", path);
  }
}

// Kör funktionen när sidan har laddats
document.addEventListener("DOMContentLoaded", handlePageLoad);

// import { fetchTrailers, fetchMovies } from "./modules/api.js";
// import { addMovieClickListeners } from "./utils/events.js";
// import { renderMovies } from "./components/movieCard.js";

// // import {
// //   showAllCards,
// //   showFavorites,
// //   showMovieDetails,
// //   showSearchResults,
// // } from "./components/movieCard.js";

// import { cardContainerRef } from "./utils/domUtils.js";

// document.addEventListener("DOMContentLoaded", async () => {
//   if (
//     window.location.pathname === "/template/" ||
//     window.location.pathname === "/" ||
//     window.location.pathname === "/template/index.html"
//   ) {
//     console.log("index.html");
//     // Kör funktioner för startsidan, t.ex. hämta trailers och filmer
//     fetchTrailers();
//     fetchMovies();

//     // showAllCards(cardContainerRef);
//   } else if (window.location.pathname === "/template/favorites.html") {
//     console.log("favorites.html");
//     showFavorites(cardContainerRef);
//     // Kör funktioner för favoritsidan om du har några
//   } else if (window.location.pathname === "/template/movie.html") {
//     console.log("movie.html");
//     showMovieDetails(movieInformationRef);
//     // Kör funktioner för enskild filmvisning
//   } else if (window.location.pathname === "/template/search.html") {
//     console.log("search.html");
//     showSearchResults(cardContainerRef);
//     // Kör funktioner för söksidan
//   }
// });
