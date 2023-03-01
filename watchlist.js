const movieList = document.querySelector("#movie-list");

let movies = JSON.parse(localStorage.getItem("watchlist")) || [];

document.addEventListener("click", function (e) {
  if (e.target.id === "remove-movie-btn") {
    removeFromWatchlist(e.target.dataset.title);
    localStorage.setItem("watchlist", JSON.stringify(movies));
    render();
  }
});

function removeFromWatchlist(title) {
  movies = movies.filter((movie) => {
    return movie.Title !== title;
  });
}

function generateWatchlistHtml() {
  if (movies.length === 0) {
    return `
        <div id="start-searching-div" class="start-searching-div">
        <h2>Your watchlist is looking a little empty...</h2>
        <a href="index.html">
            <img src="images/add-icon.png" alt="">
            <span>Let’s add some movies!</span>
        </a>
    </div>
        `;
  }

  return movies
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
                <div class="remove-btn-div">
                    <img src="images/remove-icon.png" alt="">
                    <span data-title="${movie.Title}" id="remove-movie-btn" >Remove</span>
                </div>
            </div>
            <p class="plot">${movie.Plot}</p>
        </div>
    </div>
        `;
    })
    .join("");
}

function render() {
  movieList.innerHTML = generateWatchlistHtml();
}

render();
