import { saveFavorite } from "./storage.js";

export async function addMovieClickListeners() {
  const movieArticles = document.querySelectorAll(".movieCard__article");

  for (const article of movieArticles) {
    const image = article.querySelector(`.movieCard__img`);
    const button = article.querySelector(`.fav-btn`);
    const movieId = button.getAttribute("data-id");
    const heartSymbol = article.querySelector(`.fav-btn .heart-symbol`);
    console.log(`mitt hjärtelement`, heartSymbol);

    //lyssnare på bilden
    image.addEventListener("click", (event) => {
      console.log(`Klickade på:`, event.target);

      if (!movieId) {
        console.error("Ingen data-id hittad!");
        return;
      }

      // Navigera till den nya sidan och skicka med movieId i URL-parametern
      window.location.href = `/template/movie.html?id=${movieId}`;
    });
  }
}

document.addEventListener("click", (event) => {
  const button = event.target.closest(".fav-btn");
  if (button) {
    saveFavorite(event);
  }
});
