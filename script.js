const apiKey = 'http://www.omdbapi.com/?i=tt3896198&apikey=ae7ed9e9'; 

function searchMovies() {
  const searchInput = document.getElementById("searchInput").value.trim();
  const moviesList = document.getElementById("moviesList");

  if (!searchInput) {
    alert("Please enter a movie title!");
    return;
  }

  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput}`)
    .then(response => response.json())
    .then(data => {
      moviesList.innerHTML = "";

      if (data.Response === "True") {
        data.Search.forEach(movie => {
          const movieCard = document.createElement("div");
          movieCard.classList.add("movie-card");
          movieCard.innerHTML = `
            <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300"}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
          `;
          moviesList.appendChild(movieCard);
        });
      } else {
        moviesList.innerHTML = `<p>No movies found. Try a different keyword.</p>`;
      }
    })
    .catch(error => {
      console.error("Error fetching movies:", error);
      moviesList.innerHTML = `<p>Something went wrong. Please try again later.</p>`;
    });
}

