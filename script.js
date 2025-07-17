const API_KEY = "ae7ed9e9";
const movieResult = document.getElementById("movieResult");
const overlay = document.querySelector(".overlay");
const loader = document.getElementById("loader");

// Keyboard Enter Support
document.getElementById("searchInput").addEventListener("keyup", (e) => {
  if (e.key === "Enter") searchMovie();
});

// Toggle Navbar
document.getElementById("toggleBtn").addEventListener("click", () => {
  document.getElementById("navLinks").classList.toggle("show");
});

// Search Movie
function searchMovie() {
  const query = document.getElementById("searchInput").value;
  if (!query) return;

  loader.style.display = "block";
  movieResult.classList.add("hidden");

  fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(query)}&apikey=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => {
      loader.style.display = "none";

      if (data.Response === "False") {
        movieResult.innerHTML = `<p>❌ Movie not found.</p>`;
        movieResult.classList.remove("hidden");
        overlay.style.backgroundImage = "";
        return;
      }

      movieResult.innerHTML = `
        <img src="${data.Poster !== "N/A" ? data.Poster : "assets/fallback.jpg"}" alt="Poster" />
        <div>
          <h2>${data.Title} (${data.Year})</h2>
          <p><strong>Genre:</strong> ${data.Genre}</p>
          <p><strong>IMDb Rating:</strong> ${data.imdbRating}</p>
          <p><strong>Plot:</strong> ${data.Plot}</p>
        </div>
      `;
      movieResult.classList.remove("hidden");

      overlay.style.backgroundImage = data.Poster !== "N/A"
        ? `url('${data.Poster}')` : "";
    })
    .catch(() => {
      loader.style.display = "none";
      movieResult.innerHTML = `<p>⚠️ Error fetching movie data.</p>`;
      movieResult.classList.remove("hidden");
    });
}

// Home
function goHome() {
  movieResult.innerHTML = "<h2>Welcome to Movie Finder 🍿</h2>";
  movieResult.classList.remove("hidden");
  overlay.style.backgroundImage = "url('Assets/image.avif')";
}

// Top 10 Movies
function showTop10Movies() {
  const ids = [
    "tt0111161", "tt0068646", "tt0071562", "tt0468569", "tt0050083",
    "tt0108052", "tt0167260", "tt0110912", "tt0060196", "tt0137523"
  ];
  fetchAndDisplayTopMovies(ids, "Top 10 Movies 🎬");
}

// Top 5 Movies
function showTop5Movies() {
  const ids = [
    "tt0111161", "tt0068646", "tt0071562", "tt0468569", "tt0050083"
  ];
  fetchAndDisplayTopMovies(ids, "Top 5 Movies ⭐");
}

// Reusable Fetch Function
function fetchAndDisplayTopMovies(ids, titleText) {
  loader.style.display = "block";
  movieResult.classList.add("hidden");

  const promises = ids.map(id =>
    fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`).then(res => res.json())
  );

  Promise.all(promises)
    .then(movies => {
      loader.style.display = "none";
      overlay.style.backgroundImage = "";
      movieResult.innerHTML = `<h2>${titleText}</h2>
        <div class="movie-grid">
          ${movies.map(movie => `
            <div class="movie-card">
              <img src="${movie.Poster}" alt="${movie.Title}" />
              <div>
                <h3>${movie.Title} (${movie.Year})</h3>
                <p><strong>Rating:</strong> ${movie.imdbRating}</p>
                <p>${movie.Plot}</p>
              </div>
            </div>
          `).join("")}
        </div>`;
      movieResult.classList.remove("hidden");
    })
    .catch(() => {
      loader.style.display = "none";
      movieResult.innerHTML = "<p>Error fetching top movies.</p>";
      movieResult.classList.remove("hidden");
    });
}
