export function addMovieClickListeners() {
  const movieArticles = document.querySelectorAll(".movieCard__article");

  movieArticles.forEach((article) => {
    article.addEventListener("click", () => {
      const movieId = article.getAttribute("data-id");

      if (!movieId) {
        console.error("Ingen data-id hittad!");
        return;
      }

      window.location.href = `/template/movie.html?id=${movieId}`;
    });
  });
}

// export function addMovieClickListeners() {
//   const movieArticles = document.querySelectorAll(".movieCard__article");
//   console.log(movieArticles);

//   movieArticles.forEach((article) => {
//     article.addEventListener("click", () => {
//       const movieId = article.getAttribute("data-id");
//       console.log(`MovieID= ${movieId}`);

//       if (!movieId) {
//         console.error("Ingen data-id hittad!");
//         return;
//       }

//       window.location.href = `/template/movie.html/?id=${movieId}`; // Anpassa efter din routing
//     });
//   });
// }
