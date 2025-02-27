import { cardContainerRef } from "./domUtils.js";
import { createCard } from "../components/movieCard.js";
import { addMovieClickListeners } from "./events.js";
import { fetchFullOmdb } from "../modules/api.js";
import { sortByAlphabet } from "./utils.js";

//plats för att lagra mina favoriter
export function getFavorites() {
  const favorites = localStorage.getItem("favorites");
  // console.log(favorites); // Kolla vad som verkligen hämtas från localStorage
  return JSON.parse(favorites) || []; // Returnerar en tom array om inga favoriter finns eller om JSON-parsningen misslyckas
}

export async function saveFavorite(event) {
  const button = event.target.closest(".fav-btn");
  console.log(button);
  const movieId = button.getAttribute("data-id");
  const info = await fetchFullOmdb(movieId);
  // const heartSymbol = button.querySelector(".heart-symbol");

  let favorites = getFavorites();
  console.log("Favoriter innan ändring:", favorites);
  // console.log(`my heart:`, heartSymbol);

  const isAlreadyFavorite = favorites.some((fav) => fav.imdbID === info.imdbID);

  if (isAlreadyFavorite) {
    // Om filmen redan är en favorit, ta bort den
    favorites = favorites.filter((fav) => fav.imdbID !== info.imdbID);
    console.log(`Film med ID ${info.imdbID} togs bort från favoriter.`);

    if (window.location.pathname.includes("favorites.html")) {
      button.closest("article").remove();
    }
  } else {
    // Annars, lägg till den i favoriter
    favorites.push(info);
    console.log(`Film med ID ${info.imdbID} lades till i favoriter`);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites)); // Spara uppdaterad lista

  console.log("Favoriter efter ändring:", favorites);
  updateFavoriteButtons();
}

export function showFavorites() {
  const favorites = getFavorites();
  const sortedFavorites = sortByAlphabet(favorites);

  cardContainerRef.innerHTML = ``;

  sortedFavorites.forEach((movie) => {
    const movieCardHTML = createCard(movie);
    cardContainerRef.innerHTML += movieCardHTML;
  });
  setTimeout(() => {
    addMovieClickListeners();
  }, 0);
  console.log(`hit kom jag i showFavorites`);
}

export function updateFavoriteButtons() {
  // Hämta alla knappar
  document.querySelectorAll(".fav-btn").forEach((button) => {
    const movieId = button.getAttribute("data-id");
    const heartSymbol = button.querySelector(".heart-symbol");

    // Hämta favoriter från localStorage
    const favorites = getFavorites();
    const isFavorite = favorites.some((fav) => fav.imdbID === movieId); // Kolla om filmen är en favorit

    if (isFavorite) {
      heartSymbol.classList.remove("fa-regular");
      heartSymbol.classList.add("fa-solid");
    } else {
      heartSymbol.classList.remove("fa-solid");
      heartSymbol.classList.add("fa-regular");
    }
  });
}
