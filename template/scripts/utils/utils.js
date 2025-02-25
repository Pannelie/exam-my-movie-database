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
    // autocompleteListRef.classList.remove(`d-none`);
    const movieInput = event.target.value.trim(); //tar bort inledande och avslutande whitespace
    const movies = await fetchSearchOmdb(movieInput);

    console.log(movies);
    updateAutoCompleteList(movieInput, movies);
  });

  document.addEventListener("click", (event) => {
    //eventlyssnare för om INTE searchinput eller autocompletelistref innehåller mitt event target, då ska följande ske
    if (
      !searchInput.contains(event.target) &&
      !autocompleteListRef.contains(event.target)
    ) {
      clearAutoCompleteList();
    }
  });
}

export function updateAutoCompleteList(input, movies) {
  clearAutoCompleteList(); //rensar listan först

  if (!movies || movies.length === 0) return; //om movies inte existerar eller är lika med noll så avbryts koden

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

  console.log(matchingMovies);

  if (matchingMovies.length === 0) {
    autocompleteListRef.classList.add(`d-none`);
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
