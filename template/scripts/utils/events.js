import { movieInformationRef, createElement, appChild } from "./domUtils.js";
import { fetchMovies, fetchFullOmdb } from "../modules/api.js";
import {
  saveFavorite,
  getFavorites,
  updateFavoriteButtons,
} from "./storage.js";
import { fullSingleMovie } from "../components/movieCard.js";

export async function addsingleFavListener() {
  const movieArticles = document.querySelectorAll(".movieCard__article");

  for (const article of movieArticles) {
    const button = article.querySelector(`.fav-btn`);
    const movieId = button.getAttribute(`data-id`);
    const heartSymbol = article.querySelector(`.fav-btn .heart-symbol`);
    console.log(`mitt hjärtelement`, heartSymbol);

    // button.addEventListener(`click`, async (event) => {
    //   favEventListener(movieId, heartSymbol);
    // });
  }
}

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
    // button.addEventListener(`click`, async (event) => {
    //   favEventListener(movieId, heartSymbol);
    // });
  }
}

// export async function favEventListener(movieId, heartSymbol) {
//   console.log(`favorit klickad`);
//   const info = await fetchFullOmdb(movieId);
//   console.log(`information om:`, info);
//   toggleFavorite();
// }

// export async function toggleFavorite(event) {
//   const button = event.target.closest(".fav-btn");
//   console.log(button);
//   const movieId = button.getAttribute("data-id");
//   const info = await fetchFullOmdb(movieId);

//   let favorites = getFavorites();
//   console.log("Favorites before toggle:", favorites);

//   const heartSymbol = button.querySelector("i");

//   console.log(`det här är favorite info:`, favorites[movieId]);
//   if (favorites.includes(movieId)) {
//     favorites = favorites.filter((id) => id !== info);
//     console.log(`changing to non-favorite`);
//     heartSymbol.classList.remove("fa-solid");
//     heartSymbol.classList.add("fa-regular");
//     if (window.location.pathname.includes("favorites.html")) {
//       button.closest("article").remove();
//     }
//   } else {
//     favorites.push(info);
//     console.log(`changing color to favorite`);
//     heartSymbol.classList.remove("fa-regular");
//     heartSymbol.classList.add("fa-solid");
//   }
//   localStorage.setItem("favorites", JSON.stringify(favorites)); // Spara uppdaterade favoriter
//   console.log("Favorites after toggle:", favorites);
// }

document.addEventListener("click", (event) => {
  const button = event.target.closest(".fav-btn");
  if (button) {
    saveFavorite(event);
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  // Hämta movieId från URL-parametern
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");

  if (!movieId) {
    console.error("Ingen movieId hittades i URL-parametrarna.");
    return;
  }

  try {
    // Hämta detaljerad information om filmen
    const movieData = await fetchFullOmdb(movieId);

    if (movieData && movieData.Response !== "False") {
      // Sätt innehållet från functionen singleMovie (html)
      movieInformationRef.innerHTML = fullSingleMovie(movieData);
      updateFavoriteButtons();
    } else {
      console.error("Ingen film hittades med det ID:t.");
    }
  } catch (error) {
    console.error("Fel vid hämtning av filminformation:", error);
  }
});
