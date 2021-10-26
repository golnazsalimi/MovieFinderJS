// http://www.omdbapi.com/?i=tt3896198&apikey=96b29eca
// 96b29eca
let search = document.querySelector('#search');
let input = document.querySelector('#filmTitleSearch');
let searchBar = document.querySelector('.searchBar')
let resultSection = document.querySelector('.resultSection');
let searchItemsCard = document.querySelector('.searchItemsCard');

input.addEventListener('click', () => {
  input.value = '';
})

function searchHeader() {
  searchBar.innerHTML = "";
  let resultHeader = document.createElement('header');
  resultHeader.innerHTML = `<header class="resultSectionHeader">
                              <h2 class="searchHeaderTitle">
                                Showing search result for <b> ${input.value}</b> movie.
                              </h2>
                            </header>`;
  searchBar.append(resultHeader);
}

async function getMovie() {
  resultSection.innerHTML = "";
  const response = await axios.get(`http://www.omdbapi.com/?s=${input.value}&apikey=96b29eca`);
  // console.log(response.data)
  let movies = response.data.Search;
  // console.log(response.data.Search)
  // console.log(movies);
  for (const item of movies) {
    const response2 = await axios.get(`http://www.omdbapi.com/?i=${item.imdbID}&apikey=96b29eca`);
    let movieData = response2.data  
    let card = document.createElement('div'); 
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
                              <h5 class="card-title" id="movieTitle">${item.Title} , ${item.Year}</h5>
                            </div>
                            <div class="card-body">
                              <span id="genre">${movieData.Genre}</span>
                            </div>
                            <div class="card-body">
                              <button class="btn ${JSON.parse(localStorage.getItem('favAdded')).find(item=>item === movieData.imdbID) ? 'favButton':null}" id="${movieData.imdbID}">
                              &hearts;
                              </button>
                            </div> 
                          </div>`
    resultSection.append(card);
    let favButton = document.querySelector(`#${movieData.imdbID}`)
    favButton.addEventListener('click', (event) => {
      let favorite = localStorage.getItem('favAdded'); 
      if (!favorite) {
        localStorage.setItem('favAdded',JSON.stringify([movieData.imdbID]));
        event.target.classList.add('favButton')
      } else {
        favorite = JSON.parse(favorite);
        if (favorite.includes(movieData.imdbID)) {
          for( let i = 0; i < favorite.length; i++){ 
            if ( favorite[i] === movieData.imdbID) { 
              favorite.splice(i, 1); 
            }
          }
          event.target.classList.remove('favButton')          
        } else {
        favorite.push(movieData.imdbID);   
        event.target.classList.add('favButton')
        }
        localStorage.setItem('favAdded',JSON.stringify(favorite))        
      }
    })
  }
}

input.addEventListener('keydown', (e) => {
  if (e.keyCode == 13) {
    searchHeader();
    getMovie();
  }
})

search.addEventListener('click', (e) => {
  searchHeader();
  getMovie();
});


