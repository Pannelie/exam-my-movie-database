// Funktioner för att visa innehåll
export function showAllCards(container) {
  // Här kan du lägga till alla kort som finns på index-sidan
  container.innerHTML = "<div>Alla kort här...</div>";
}

export function showFavorites(container) {
  // Hämta favoriter från localStorage och visa dem
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  container.innerHTML = ""; // Rensa befintligt innehåll

  favorites.forEach((favorite) => {
    const card = document.createElement("div");
    card.textContent = favorite.title; // Visa titel eller annan information
    container.appendChild(card);
  });
}

export function showMovieDetails(container) {
  // Här kan du lägga till logik för att visa detaljer om en film
  container.innerHTML = "<div>Film detajer här...</div>";
}

export function showSearchResults(container) {
  // Visa sökresultat, kanske genom att hämta data från en sökning
  container.innerHTML = "<div>Sökresultat här...</div>";
}
