let resultSection = document.querySelector(".resultSection");
let memory = JSON.parse(localStorage.getItem("favAdded"));

async function getFavs() {
  for (let imdbID of memory) {
    // console.log(imdbID)
    const response2 = await axios.get(
      `http://www.omdbapi.com/?i=${imdbID}&apikey=96b29eca`
    );
    // console.log(response2)
    let movieData = response2.data;
    let card = document.createElement("div");
    card.innerHTML = `<div class="card searchItemsCard" style="width: 18rem;">
                                <header>
                                    <div>
                                    <img class="card-img-top movieImg" src="${movieData.Poster}"/>
                                    <div class="cardRating">
                                        <span class="cardRatingFilled" id="imdbRating">IMDB : ${movieData.imdbRating}</span>
                                    </div>
                                    </div>
                                </header>
                                <div class="card-body">
                                    <h5 class="card-title" id="movieTitle">${movieData.Title} , ${movieData.Year}</h5>
                                </div>
                                <div class="card-body">
                                    <span id="genre">${movieData.Genre}</span>
                                </div>
                                <div class="card-body">
                                    <button class="favButton" id="${movieData.imdbID}">
                                    &hearts;
                                    </button>
                                </div> 
                            </div>`;
    resultSection.append(card);
    let favButton = document.querySelector(`#${movieData.imdbID}`);
    favButton.addEventListener("click", (event) => {
      let fav = JSON.parse(localStorage.getItem("favAdded"));
      console.log(movieData.imdbID);
      console.log(fav);
      if (fav.includes(movieData.imdbID)) {
        for (let i = 0; i < fav.length; i++) {
          if (fav[i] === movieData.imdbID) {
            let unFav = fav.splice(i, 1);
            localStorage.setItem("favAdded", JSON.stringify(fav));
            resultSection.removeChild(card);
          }
        }
      }
    });
  }
}

getFavs();
