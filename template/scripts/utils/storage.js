//plats för att lagra mina favoriter

const storageKey = `favoriteMovies`;

//spara mina favoriter i localStorage
export function saveFavorites(movies) {
  localStorage.setItem(storageKey, JSON.stringify(movies));
}

//hämta mina favoriter
export function getFavorites() {
  const storedFavorites = localStorage.getItem(storageKey);
  return storedFavorites ? JSON.parse(storedFavorites) : [];
}

// Funktion för att toggla mellan att lägga till och ta bort från favoriter
export function toggleFavorite(movie, button) {
  let favorites = getFavorites();

  // Kontrollera om filmen redan finns i favoriter
  const movieIndex = favorites.findIndex((fav) => fav.title === movie.title);

  if (movieIndex === -1) {
    // Om filmen inte finns, lägg till den
    favorites.push(movie);
    button.textContent = "Ta bort favorit"; // Uppdatera knapptexten
  } else {
    // Om filmen finns, ta bort den
    favorites.splice(movieIndex, 1);
    button.textContent = "Lägg till favorit"; // Uppdatera knapptexten
  }

  // Spara den uppdaterade listan av favoriter
  saveFavorites(favorites);
}
