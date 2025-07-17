const API_KEY = "ae7ed9e9"; // Your OMDb API key

function searchMovie() {
  const query = document.getElementById("searchInput").value;
  const loader = document.getElementById("loader");
  const result = document.getElementById("movieResult");
  const overlay = document.querySelector(".overlay");

  if (!query) return;

  loader.style.display = "block";
  result.classList.add("hidden");

  fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(query)}&apikey=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => {
      loader.style.display = "none";

      if (data.Response === "False") {
        result.innerHTML = `<p>❌ Movie not found.</p>`;
        result.classList.remove("hidden");
        overlay.style.backgroundImage = "";
        return;
      }

      result.innerHTML = `
        <img src="${data.Poster !== "N/A" ? data.Poster : "assets/fallback.jpg"}" alt="Poster" />
        <div>
          <h2>${data.Title} (${data.Year})</h2>
          <p><strong>Genre:</strong> ${data.Genre}</p>
          <p><strong>IMDb Rating:</strong> ${data.imdbRating}</p>
          <p><strong>Plot:</strong> ${data.Plot}</p>
        </div>
      `;
      result.classList.remove("hidden");

      if (data.Poster !== "N/A") {
        overlay.style.backgroundImage = `url('${data.Poster}')`;
        overlay.style.backgroundSize = "cover";
        overlay.style.backgroundPosition = "center";
      } else {
        overlay.style.backgroundImage = "";
      }
    })
    .catch((err) => {
      loader.style.display = "none";
      result.innerHTML = `<p>⚠️ Error fetching movie data.</p>`;
      result.classList.remove("hidden");
    });
}
