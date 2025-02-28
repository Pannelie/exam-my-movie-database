import { renderTrailers } from "../modules/caroussel.js";
import {
  searchInput,
  cardContainerRef,
  autocompleteListRef,
  movieInformationRef,
} from "./domUtils.js";
import { fullSingleMovie, createCard } from "../components/movieCard.js";
import { addMovieClickListeners, handleMovieClick } from "./events.js";

//renderar ut mina trailers i min carousel på index.html
export function renderRandomTrailers(movies) {
  if (!movies || movies.length === 0) {
    console.error("Inga filmer att slumpa.");
    return;
  }

  // Slumpa 5 trailers
  const shuffled = movies.sort(() => 0.5 - Math.random()); // Blandar listan
  const selectedTrailers = shuffled.slice(0, 5); // Tar de första 5 filmerna

  console.log(selectedTrailers);

  // Rendera trailers
  selectedTrailers.forEach((movie, index) => {
    renderTrailers(movie, index + 1); // Anpassa renderingen efter behov
  });
}

//renderar ut mina filmer på index.html i alfabetisk ordning
export function renderMovies(movies, container) {
  if (!container) {
    console.error("Container hittades inte!");
    return;
  }
  const sortedMovies = sortByAlphabet(movies);

  container.innerHTML = sortedMovies.map(createCard).join("");

  // Lägg till event listeners efter renderingen
  setTimeout(() => {
    addMovieClickListeners();
  }, 0);
}
// renderar ut sökresultaten
export function renderSearchResults(movies) {
  console.log(`Skriver ut mina sökresultat`);

  const sortedMovies = sortByAlphabet(movies);
  sortedMovies.forEach((movie) => {
    cardContainerRef.innerHTML += createCard(movie);
  });
  setTimeout(() => {
    addMovieClickListeners();
  }, 0);
}

// uppdaterar min söklista med li-element beroende på akutella sökresultat
export function updateAutoCompleteList(input, movies) {
  clearAutoCompleteList(); //rensar listan först

  if (!movies || input.length < 3) {
    autocompleteListRef.classList.add(`d-none`);
    return; // Avbryt om inga filmer hittades
  }

  autocompleteListRef.classList.remove("d-none");

  const inputLower = input.toLowerCase();
  const matchingMovies = movies
    .filter((m) => m.Title.toLowerCase().startsWith(inputLower)) // Filmer som börjar med sökordet
    .concat(
      movies.filter(
        (m) =>
          m.Title.toLowerCase().includes(inputLower) && // Filmer som innehåller sökordet någonstans
          !m.Title.toLowerCase().startsWith(inputLower)
      )
    );

  console.log(`the same as:`, matchingMovies);

  if (input.length > 3 && matchingMovies.length === 0) {
    noMatch();
    return;
  }

  if (matchingMovies.length > 1) {
    showAllSearches(matchingMovies, input);
  }

  createListItem(matchingMovies);
}

function showAllSearches(match, input) {
  if (match.length > 1) {
    const showAllItem = document.createElement(`li`);
    showAllItem.classList.add(
      `search__list-item`,
      `search__list-item--cursor`,
      `search__list-show-all`
    );

    const showAllText = document.createElement(`p`);
    showAllText.textContent = `All results`;
    showAllText.classList.add(`search__list-text--big`);

    showAllItem.appendChild(showAllText);
    showAllItem.addEventListener("click", () => {
      window.location.href = `/template/search.html?query=${input}`; // Navigera till en sida som visar alla sökresultat
      clearAutoCompleteList(); // Rensa auto-complete listan när användaren klickar
    });

    autocompleteListRef.appendChild(showAllItem);
  }
}

function noMatch() {
  const showAllItem = document.createElement(`li`);
  showAllItem.classList.add(`search__list-item`, `search__list-show-all`);

  const showAllText = document.createElement(`p`);
  showAllText.textContent = `No match`;
  showAllText.classList.add(`search__list-text--big`);

  showAllItem.appendChild(showAllText);
  autocompleteListRef.appendChild(showAllItem);
}

function createListItem(match) {
  for (let i = 0; i < Math.min(match.length, 10); i++) {
    console.log(match[i].Title);
    //skapa list-item
    const listItemRef = document.createElement(`li`);
    listItemRef.classList.add(`search__list-item`, `search__list-item--cursor`);

    //skapar img
    const listItemImg = document.createElement(`img`);
    listItemImg.src = dataExist(
      match[i].Poster,
      "/template/res/icons/missing-poster.svg"
    );
    listItemImg.alt = `Poster från filmen: ${match[i].Title}`;
    listItemImg.classList.add("search__list-img");

    //skapar text-elementch
    const listItemText = document.createElement("p");
    listItemText.textContent = firstCaseToUpper(match[i].Title);
    listItemText.classList.add("search__list-text");

    // listItemRef.textContent = firstCaseToUpper(matchingMovies[i].Title);
    // createCard(matchingMovies[i].name);

    listItemRef.appendChild(listItemImg);
    listItemRef.appendChild(listItemText);

    listItemRef.addEventListener(`click`, () =>
      handleMovieClick(match[i].imdbID)
    );

    autocompleteListRef.appendChild(listItemRef);
  }
}
//Rensar min ul och sätter den till display none
export function clearAutoCompleteList() {
  autocompleteListRef.innerHTML = "";
  autocompleteListRef.classList.add(`d-none`); // Dölj listan när vi rensar den
}

//förhindrar att texten avslutas mitt i, utan indikerar på att titeln egentligen är längre än vad som får plats
export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substring(0, text.lastIndexOf(" ", maxLength)) + "...";
}
//kort if/else för vad som ska visas beroende på om data existerar eller inte
export function dataExist(data, param) {
  return data && data !== `N/A` ? data : param;
}
//Ordnar så första bokstaven är versal
function firstCaseToUpper(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
//sortera film efter bokstavsordning
export function sortByAlphabet(movielist) {
  return movielist.sort((a, b) =>
    a.Title.toLowerCase().localeCompare(b.Title.toLowerCase())
  );
}
