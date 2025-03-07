let apiKey = `1737b0b7`;

export async function fetchMovies() {
  try {
    const response = await fetch(
      "https://santosnr6.github.io/Data/favoritemovies.json"
    );
    return await response.json();
  } catch (error) {
    console.error("Fel vid hämtning av filmer:", error);
    return [];
  }
}

//sökfunktion fetch, justerade imdbID till parameter vid anrop
export async function fetchFullOmdb(imdbID) {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${apiKey}&plot=full&i=${imdbID}`
    );
    return await response.json();
  } catch (error) {
    console.error(`Fel vid hämtning av filmer:`, error);
    return [];
  }
}

//sökfunktion fetch, justerade söksträng till parameter vid anrop
export async function fetchSearchOmdb(searchString) {
  if (!searchString) return []; // Undvik onödiga API-anrop

  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchString}*`
    );

    if (!response.ok) {
      throw new Error(`HTTP-fel! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`this is the data that has search: `, data);

    return data.Search || []; // Om `Search` saknas, returnera en tom array
  } catch (error) {
    console.error(`Fel vid hämtning av filmer:`, error);
    return [];
  }
}

//SÖKAPI lägg till * efteråt, wildcardasterisk, för att få med även felstavningar. t.ex. btman istället för batman.
