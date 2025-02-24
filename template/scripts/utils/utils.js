import { fetchSearchOmdb } from "../modules/api.js";
import { renderTrailers } from "../modules/caroussel.js";
import {
  searchInput,
  formRef,
  cardContainerRef,
  autocompleteListRef,
} from "./domUtils.js";
//sortera film efter betyg, top 20

// Stor bokstav i början

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
    const movieInput = event.target.value;
    const movies = await fetchSearchOmdb(movieInput);
    console.log(searchInput);
    console.log(movies);
    updateAutoCompleteList(event.target.value.toLowerCase(), movies);
  });
}

export function updateAutoCompleteList(input, movies) {
  const matchingMovies = movies.filter((m) => m.Title.includes(input));
  console.log(matchingMovies);

  for (let i = 0; i < matchingMovies.length; i++) {
    if (i == 10) break;
    console.log(matchingMovies[i].Title);
    const listItemRef = document.createElement(`li`);
    listItemRef.classList.add(`search__list-item`);

    listItemRef.textContent = firstCaseToUpper(matchingMovies[i].Title);
    // createCard(matchingMovies[i].name);

    autocompleteListRef.appendChild(listItemRef);
  }
}

function firstCaseToUpper(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
