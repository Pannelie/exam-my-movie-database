import { renderTrailers } from "../modules/caroussel.js";
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
