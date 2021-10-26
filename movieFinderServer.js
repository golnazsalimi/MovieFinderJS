// http://www.omdbapi.com/?i=tt3896198&apikey=96b29eca
// 96b29eca
let search = document.querySelector("#search");
let input = document.querySelector("#filmTitleSearch");
let searchBar = document.querySelector(".searchBar");
let resultSection = document.querySelector(".resultSection");
let searchItemsCard = document.querySelector(".searchItemsCard");
let logBtn = document.querySelector("#logBtn");
let loggedInUserId = null;

function isUserLogged() {
  if (localStorage.getItem("user")) {
    loggedInUserId = JSON.parse(localStorage.getItem("user"));
    logBtn.innerHTML = "log out";
  }
}

logBtn.addEventListener("click", () => localStorage.removeItem("user"));

isUserLogged();

input.addEventListener("click", () => {
  input.value = "";
});

function searchHeader() {
  searchBar.innerHTML = "";
  let resultHeader = document.createElement("header");
  resultHeader.innerHTML = `<header class="resultSectionHeader">
                              <h2 class="searchHeaderTitle">
                                Showing search result for <b> ${input.value}</b> movie.
                              </h2>
                            </header>`;
  searchBar.append(resultHeader);
}

async function getMovie() {
  resultSection.innerHTML = "";
  const response = await axios.get(
    `http://www.omdbapi.com/?s=${input.value}&apikey=96b29eca`
  );
  let movies = response.data.Search;
  let user = null;
  if (loggedInUserId) {
    let user = await axios.get(`http://localhost:3000/users/${loggedInUserId}`);
    user = user.data;
  }
  for (const item of movies) {
    const response2 = await axios.get(
      `http://www.omdbapi.com/?i=${item.imdbID}&apikey=96b29eca`
    );
    let movieData = response2.data;
    let card = document.createElement("div");
    card.innerHTML = `<div class="card searchItemsCard" style="width: 18rem;">
                            <header>
                              <div>
                                <img class="card-img-top movieImg" src="${
                                  movieData.Poster
                                }"/>
                                <div class="cardRating">
                                  <span class="cardRatingFilled" id="imdbRating">IMDB : ${
                                    movieData.imdbRating
                                  }</span>
                                </div>
                              </div>
                            </header>
                            <div class="card-body">
                              <h5 class="card-title" id="movieTitle">${
                                item.Title
                              } , ${item.Year}</h5>
                            </div>
                            <div class="card-body">
                              <span id="genre">${movieData.Genre}</span>
                            </div>
                            <div class="card-body">
                              <button class="btn ${
                                loggedInUserId ? null : "hide"
                              } ${
      loggedInUserId && user.favorite.find((fav) => fav == movieData.imdbID)
        ? "favButton"
        : null
    }" id="${movieData.imdbID}" type="submit">
                              &hearts;
                              </button>
                            </div> 
                          </div>`;
    resultSection.append(card);
    let favButton = document.querySelector(`#${movieData.imdbID}`);

    favButton.addEventListener("click", async (event) => {
      // console.log(user)
      let check = user.favorite.findIndex((fav) => fav == movieData.imdbID);
      console.log(check);
      if (check == -1) {
        user.favorite.push(movieData.imdbID);
        await axios.put(`http://localhost:3000/users/${loggedInUserId}`, user);
        favButton.classList.add("favButton");
      } else {
        user.favorite.splice(check, 1);
        await axios.put(`http://localhost:3000/users/${loggedInUserId}`, user);
        favButton.classList.remove("favButton");
      }
    });
  }
}

input.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    searchHeader();
    getMovie();
  }
});

search.addEventListener("click", (e) => {
  searchHeader();
  getMovie();
});
