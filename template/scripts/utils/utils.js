import { renderTrailers } from "../modules/caroussel.js";
import {
  searchInput,
  formRef,
  cardContainerRef,
  autocompleteListRef,
  movieInformationRef,
} from "./domUtils.js";
import { fullSingleMovie, createCard } from "../components/movieCard.js";
import { addMovieClickListeners } from "./events.js";

//sortera film efter bokstavsordning
export function sortByAlphabet(movielist) {
  return movielist.sort((a, b) =>
    a.Title.toLowerCase().localeCompare(b.Title.toLowerCase())
  );
}
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

//Ordnar så första bokstaven är versal
function firstCaseToUpper(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
// uppdaterar min söklista med li-element beroende på akutella sökresultat
export function updateAutoCompleteList(input, movies) {
  clearAutoCompleteList(); //rensar listan först

  if (!movies || movies.length === 0) {
    return; // Avbryt om inga filmer hittades
  }

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

  if (matchingMovies.length === 0) {
    return; // Avbryt om inga filmer matchar
  } else {
    autocompleteListRef.classList.remove(`d-none`);
  }

  for (let i = 0; i < Math.min(matchingMovies.length, 10); i++) {
    console.log(matchingMovies[i].Title);

    const listItemRef = document.createElement(`li`);
    listItemRef.classList.add(`search__list-item`);

    listItemRef.textContent = firstCaseToUpper(matchingMovies[i].Title);
    // createCard(matchingMovies[i].name);

    listItemRef.addEventListener(`click`, () => {
      searchInput.value = matchingMovies[i].Title;
      clearAutoCompleteList();
    });

    autocompleteListRef.appendChild(listItemRef);
  }
}

//Rensar min ul och sätter den till display none
export function clearAutoCompleteList() {
  autocompleteListRef.innerHTML = "";
  autocompleteListRef.classList.add(`d-none`); // Dölj listan när vi rensar den
}

export function showSearchResults(movies) {
  const queryParams = new URLSearchParams(window.location.search);
  const query = queryParams.get(`s`) || queryParams.get(`query`);
  console.log(movies);

  //satte inte if sats på movies.length=== 0 eftersom min setUpSearchForm i events.js sköter error och vad som ska ske
  if (window.location.pathname.includes("movie.html") && movies.length === 1) {
    const movie = movies[0];
    movieInformationRef.innerHTML = fullSingleMovie(movie);
  } else {
    const sortedMovies = sortByAlphabet(movies);
    sortedMovies.forEach((movie) => {
      cardContainerRef.innerHTML += createCard(movie);
    });
    setTimeout(() => {
      addMovieClickListeners();
    }, 0);
  }
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
