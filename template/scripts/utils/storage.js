//plats för att lagra mina favoriter
export function getFavorites() {
  JSON.parse(localStorage.getItem("favorites")) || []; // Returnerar en tom array om inga favoriter finns
}

export function saveFavorite(movieId) {
  console.log(saveFavorite);
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
