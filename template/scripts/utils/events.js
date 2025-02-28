import { saveFavorite } from "./storage.js";
import { searchInput, autocompleteListRef, formRef } from "./domUtils.js";
import { fetchSearchOmdb } from "../modules/api.js";
import { updateAutoCompleteList, clearAutoCompleteList } from "./utils.js";

export async function addMovieClickListeners() {
  const movieArticles = document.querySelectorAll(".movieCard__article");

  for (const article of movieArticles) {
    const image = article.querySelector(`.movieCard__img`);
    const button = article.querySelector(`.fav-btn`);
    const movieId = button.getAttribute("data-id");
    const heartSymbol = article.querySelector(`.fav-btn .heart-symbol`);
    // console.log(`mitt hjärtelement`, heartSymbol);

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

export async function setUpSearchForm() {
  searchInput.addEventListener(`input`, async (event) => {
    // autocompleteListRef.classList.remove(`d-none`);
    const movieInput = event.target.value.trim(); //tar bort inledande och avslutande whitespace
    const movies = await fetchSearchOmdb(movieInput);

    console.log(`is this array:`, movies);
    updateAutoCompleteList(movieInput, movies);
  });

  document.addEventListener("click", (event) => {
    //eventlyssnare för om INTE searchinput eller autocompletelistref innehåller mitt event target, då ska följande ske
    if (
      !searchInput.contains(event.target) &&
      !autocompleteListRef.contains(event.target)
    ) {
      searchInput.placeholder = "";
      clearAutoCompleteList();
    }
  });
  formRef.addEventListener(`submit`, async (event) => {
    event.preventDefault();

    const movieInput = searchInput.value.trim();
    const movies = await fetchSearchOmdb(movieInput);

    if (movieInput === ``) {
      console.log(`inget valt`);
      searchInput.classList.add("custom-placeholder");
      searchInput.placeholder = `Please enter text...`;
    } else if (movies.length === 0) {
      searchInput.placeholder = `No match...`;
      searchInput.value = ""; // Rensa inputfältet
    } else if (movies.length === 1) {
      window.location.href = `movie.html?id=${encodeURIComponent(
        movies[0].imdbID
      )}`;
    } else {
      window.location.href = `search.html?s=${encodeURIComponent(movieInput)}`;
    }
  });
}

export function handleMovieClick(id) {
  window.location.href = `/template/movie.html?id=${id}`; // Navigera till filmens detaljsida
  clearAutoCompleteList(); // Rensa auto-complete listan när en film är vald
}
