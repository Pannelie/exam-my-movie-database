import { cardContainerRef } from "./domUtils.js";
import { createCard } from "../components/movieCard.js";
import { addsingleFavListener } from "./events.js";

//plats för att lagra mina favoriter
export function getFavorites() {
  const favorites = localStorage.getItem("favorites");
  console.log(favorites); // Kolla vad som verkligen hämtas från localStorage
  return JSON.parse(favorites) || []; // Returnerar en tom array om inga favoriter finns eller om JSON-parsningen misslyckas
}

export function saveFavorite(info) {
  let favorites = getFavorites();

  console.log("Favoriter innan ändring:", favorites);

  const isAlreadyFavorite = favorites.some((fav) => fav.imdbID === info.imdbID);

  if (isAlreadyFavorite) {
    // Om filmen redan är en favorit, ta bort den
    favorites = favorites.filter((fav) => fav.imdbID !== info.imdbID);
    console.log(`Film med ID ${info.imdbID} togs bort från favoriter.`);
  } else {
    // Annars, lägg till den i favoriter
    favorites.push(info);
    console.log(`Film med ID ${info.imdbID} lades till i favoriter`);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites)); // Spara uppdaterad lista

  console.log("Favoriter efter ändring:", favorites);
}

export function showFavorites() {
  const favorites = getFavorites();

  cardContainerRef.innerHTML = ``;

  favorites.forEach((movie) => {
    const movieCardHTML = createCard(movie);
    cardContainerRef.innerHTML += movieCardHTML;
  });

  setTimeout(() => {
    addsingleFavListener();
  }, 0);
}
