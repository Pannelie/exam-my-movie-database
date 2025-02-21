//plats för att lagra mina favoriter

const storageKey = `favoriteMovies`;

export function getFavorites() {
  JSON.parse(localStorage.getItem("favorites")) || []; // Returnerar en tom array om inga favoriter finns
}

export function saveFavorite(movieId) {
  let favorites = getFavorites();

  console.log("Favoriter innan ändring:", favorites);

  if (favorites.includes(movieId)) {
    // Om filmen redan är en favorit, ta bort den
    favorites = favorites.filter((id) => id !== movieId);
    console.log(`Film med ID ${movieId} togs bort från favoriter.`);
  } else {
    // Annars, lägg till den i favoriter
    favorites.push(movieId);
    console.log(`Film med ID ${movieId} lades till i favoriter.`);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites)); // Spara uppdaterad lista

  console.log("Favoriter efter ändring:", favorites);
}

// //spara mina favoriter i localStorage
// export function saveFavorites(movies) {
//   localStorage.setItem(storageKey, JSON.stringify(movies));
// }

// //hämta mina favoriter
