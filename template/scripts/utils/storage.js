import { cardContainerRef } from "./domUtils.js";
import { createCard } from "../components/movieCard.js";
import { addsingleFavListener } from "./events.js";
import { fetchFullOmdb } from "../modules/api.js";

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
  const heartSymbol = button.querySelector("i");

  let favorites = getFavorites();
  console.log("Favoriter innan ändring:", favorites);

  const isAlreadyFavorite = favorites.some((fav) => fav.imdbID === info.imdbID);

  if (isAlreadyFavorite) {
    // Om filmen redan är en favorit, ta bort den
    favorites = favorites.filter((fav) => fav.imdbID !== info.imdbID);
    console.log(`Film med ID ${info.imdbID} togs bort från favoriter.`);
    heartSymbol.classList.remove("fa-solid");
    heartSymbol.classList.add("fa-regular");

    if (window.location.pathname.includes("favorites.html")) {
      button.closest("article").remove();
    }
  } else {
    // Annars, lägg till den i favoriter
    favorites.push(info);
    console.log(`Film med ID ${info.imdbID} lades till i favoriter`);
    heartSymbol.classList.remove("fa-regular");
    heartSymbol.classList.add("fa-solid");
  }

  localStorage.setItem("favorites", JSON.stringify(favorites)); // Spara uppdaterad lista

  console.log("Favoriter efter ändring:", favorites);
  updateFavoriteButtons();
}

export function showFavorites() {
  const favorites = getFavorites();

  cardContainerRef.innerHTML = ``;

  favorites.forEach((movie) => {
    const movieCardHTML = createCard(movie);
    cardContainerRef.innerHTML += movieCardHTML;
  });
}

export function updateFavoriteButtons() {
  const favorites = getFavorites(); // Hämtar favoriter från localStorage

  // Gå igenom alla knappar med fav-btn-klassen
  document.querySelectorAll(".fav-btn").forEach((button) => {
    const movieId = button.getAttribute("data-id");

    const heartSymbol = button.querySelector("i");

    if (favorites.includes(movieId)) {
      // Om filmen är en favorit, sätt hjärtat till solid
      heartSymbol.classList.remove("fa-regular");
      heartSymbol.classList.add("fa-solid");
    } else {
      // Om filmen inte är en favorit, sätt hjärtat till regular
      heartSymbol.classList.remove("fa-solid");
      heartSymbol.classList.add("fa-regular");
    }
  });
}
