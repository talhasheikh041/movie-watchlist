const movieInput = document.querySelector("#movie-input");
const searchBtn = document.querySelector("#search-btn");
const searchList = document.querySelector("#search-list");
const startExploringDiv = document.querySelector("#start-exploring-div");

const searchlistArray = [];
const watchListArray = JSON.parse(localStorage.getItem("watchlist")) || [];

movieInput.addEventListener("keydown", function (e) {
  if (e.type === "click" || (e.type === "keydown" && e.keyCode === 13)) {
    fetchMoviesData();
  }
});
searchBtn.addEventListener("click", function (e) {
  if (e.type === "click" || (e.type === "keydown" && e.keyCode === 13)) {
    fetchMoviesData();
  }
});

document.addEventListener("click", function (e) {
  if (e.target.id === "add-movie-btn") {
    addMovieToWatchlist(e);
  }
});

function addMovieToWatchlist(e) {
  if (
    watchListArray.findIndex(
      (movie) => movie.Title === e.target.dataset.title
    ) === -1
  ) {
    const addMovieObj = searchlistArray.find(
      (movie) => movie.Title === e.target.dataset.title
    );
    watchListArray.push(addMovieObj);
    localStorage.setItem("watchlist", JSON.stringify(watchListArray));
    alert("Added to your watchlist!!");
  } else {
    alert("Already present in your watchlist..!");
  }
}

async function fetchMoviesData() {
  const searchResponse = await fetch(
    `https://www.omdbapi.com/?apikey=36660f2f&s=${movieInput.value}`
  );
  const searchData = await searchResponse.json();

  if (searchData.Response === "True") {
    searchlistArray.length = 0;
    searchData.Search.forEach(async (item) => {
      const moviesResponse = await fetch(
        `https://www.omdbapi.com/?apikey=36660f2f&i=${item.imdbID}`
      );
      const movieObj = await moviesResponse.json();
      searchlistArray.push(movieObj);
    });
    searchList.innerHTML = `<div class="lds-dual-ring"></div>`;
    setTimeout(() => {
      renderMovies();
    }, 1500);
  } else {
    renderErrorMessage();
  }
}

function generateMoviesHtml() {
  return searchlistArray
    .map((movie) => {
      return `
            <div class="movie">
            <div class="img-container">
                <img class="movie-img" src="${movie.Poster}" alt="">
            </div>
            <div class="description-container">
                <div class="title">
                    <h2 class="movie-title">${movie.Title}</h2>
                    <p class="movie-year">(${movie.Year})</p>
                    <img src="images/star-icon.png" alt="" class="star-icon">
                    <p class="movie-rating">${movie.imdbRating}</p>
                </div>
                <div class="details">
                    <p class="movie-timing">${movie.Runtime}</p>
                    <p class="movie-genre">${movie.Genre}</p>
                    <div class="add-btn-div">
                        <img src="images/add-icon.png" alt="">
                        <span data-title="${movie.Title}" id="add-movie-btn" >Watchlist</span>
                    </div>
                </div>
                <p class="movie-description">${movie.Plot}</p>
            </div>
        </div>
            `;
    })
    .join("");
}

function renderMovies() {
  searchList.innerHTML = generateMoviesHtml();
}

function renderErrorMessage() {
  searchList.innerHTML = `
    <h2 style="
        text-align: center;
        color: #787878;
        margin-top: 30px;
        ">
    Unable to find what you’re looking for. Please try another search.</h2>
  `;
}
