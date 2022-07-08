// Accessing the html elements
let movieSearch = document.getElementById("movie-search");
let search = document.getElementById("search-btn");
let results = document.getElementById("results");

//function to access data from api
let getMovie = () => {
    let movieName = movieSearch.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

    //If no input is entered
    if (movieName.length <= 0) {
        results.innerHTML = `
            <div id="notFound">
            <img src="/images/search.png">
            <h2>Search any Movie</h2>
            </div>
        `;
    }
    else {
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                // console.log(data);

                //If we get response from API
                if (data.Response == 'True') {
                    results.innerHTML = `
                    <div class="info">
                        <img src="${data.Poster}" class="poster">
                        <div class="details">
                            <h2 id="title">${data.Title}</h2><hr>
                            <div class="release">
                                <h4 id="year">Released in ${data.Year}</h4>
                                <h4>Runtime : ${data.Runtime}</h4>
                                <h4>Rated : ${data.Rated}</h4>
                            </div>
                            <h4 class="directed">Directed by : ${data.Director}</h4>
                            <h4 class="rating"><span>${data.Ratings[1].Source}</span> : <span>${data.Ratings[1].Value}</span></h4>
                            <h4>imdb Rating : ${data.imdbRating}</h4>
                        </div>
                    </div><hr>
                    <div class="genre">
                        <h5>Cast : ${data.Actors}</h5>
                        <h5>Genre : ${data.Genre}</h5>
                        <h5>Language : ${data.Language}</h5>
                    </div><hr>
                    <div class="plot">
                        <h5 class="desc">Plot - </h5>
                        <h5>${data.Plot}</h5>
                    </div>
                `;
                }
                else {
                    results.innerHTML = `
                        <h2 id="notFound">Movie not found</h2>
                    `;
                }
            })
    }
}

search.addEventListener('click', getMovie);
window.addEventListener('load', getMovie);