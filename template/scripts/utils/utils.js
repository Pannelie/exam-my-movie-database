import { fetchSearchOmdb } from "../modules/api.js";
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
//sortera film efter betyg, top 20

//konvertera minuter till timmar+ minuter i filmtid

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

function firstCaseToUpper(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function clearAutoCompleteList() {
  autocompleteListRef.innerHTML = "";
  autocompleteListRef.classList.add(`d-none`); // Dölj listan när vi rensar den
}

export function showSearchResults(movies) {
  const queryParams = new URLSearchParams(window.location.search);
  const query = queryParams.get(`s`) || queryParams.get(`query`);
  console.log(movies);

  if (window.location.pathname.includes("movie.html") && movies.length === 1) {
    const movie = movies[0];
    movieInformationRef.innerHTML = fullSingleMovie(movie);
  } else if (window.location.pathname.includes("search.html")) {
    cardContainerRef.innerHTML = ``;
    if (movies.length === 0) {
      cardContainerRef.innerHTML = `<p>No results found for "${query}".</p>`;
    } else {
      movies.forEach((movie) => {
        cardContainerRef.innerHTML += createCard(movie);
      });
      setTimeout(() => {
        addMovieClickListeners();
      }, 0);
    }
  }
}

//förhindrar att texten avslutas mitt i, utan indikerar på att titeln egentligen är längre än vad som får plats
export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substring(0, text.lastIndexOf(" ", maxLength)) + "...";
}

export function dataExist(data, param) {
  return data && data !== `N/A` ? data : param;
}
