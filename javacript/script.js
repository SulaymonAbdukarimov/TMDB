//TMDB
const API_KEY = "api_key=2783f79163eb708200b1a5e760fdf087";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY; //WHAT IS POPULARS API
const FREE_TO_WATCH =
  BASE_URL +
  "/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc&" +
  API_KEY; //Free To Watch API
const TRENDING = BASE_URL + "/tv/airing_today?" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + "/search/movie?" + API_KEY;
const main = document.getElementById("movies-list");
const main_list_free = document.getElementById("movies-list-free");
const trendMovie = document.getElementById("trendMovie");
const form = document.getElementById("form");
const search = document.getElementById("search");
const search_btn = document.getElementById("search-button");

getMovies(API_URL);
getFreeMovie(FREE_TO_WATCH);
getTrendingMovie(TRENDING);

function getTrendingMovie(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showTrending(data.results, "trendingMovie");
      console.log(data.results);
    });
}
function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data.results, "popularMovie");
      // console.log(API_URL);
    });
}

function getFreeMovie(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // console.log(FREE_TO_WATCH);
      showMovies(data.results, "freeMovie");
    });
}
function showTrending(data, type) {
  let movieCard = "";
  data.forEach((movie) => {
    const { name, first_air_date, poster_path, vote_average, release_date } =
      movie;
    movieCard += `
    <div class="card">
      <img src="${IMG_URL + poster_path}" class="card-img-top" alt="${name}">
     <div class="card-body movie-info">
        <span class=" ${getColor(
          vote_average
        )} rate">${vote_average}<sup class="precentage">%</sup></span>
           <a href="#" class="card-title">${name}</a>
          <h6 class="data_of_movie">${first_air_date}</h6>
      </div>
    </div>
    `;
  });

  trendMovie.innerHTML += movieCard;
}

function showMovies(data, type) {
  let movieCard = "";
  data.forEach((movie) => {
    const { title, poster_path, vote_average, release_date } = movie;
    movieCard += `
    <div class="card">
      <img src="${IMG_URL + poster_path}" class="card-img-top" alt="${title}">
     <div class="card-body movie-info">
        <span class=" ${getColor(
          vote_average
        )} rate">${vote_average}<sup class="precentage">%</sup></span>
           <a href="#" class="card-title">${title}</a>
          <h6 class="data_of_movie">${release_date}</h6>
      </div>
    </div>
    `;
  });
  if (type === "popularMovie") {
    main.innerHTML += movieCard;
  } else if (type === "freeMovie") {
    main_list_free.innerHTML += movieCard;
  } else {
    trendMovie.innerHTML += movieCard;
  }
}

function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
/*SEARCH*/
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
    getMovies(searchURL + "&query=" + searchTerm);
  } else {
    getMovies(API_URL);
  }
});

search_btn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
    getMovies(searchURL + "&query=" + searchTerm);
  } else {
    getMovies(API_URL);
  }
});

/* /SEARCH*/

// var navbar = document.querySelector("nav");
// window.addEventListener("scroll", () => {
//   if (window.scrollY > 20) {
//     navbar.classList.add("bekil");
//   } else {
//     navbar.classList.remove("bekil");
//   }
// });
