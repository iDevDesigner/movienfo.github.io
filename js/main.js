$(document).ready(() => {
    // alert("hello");

    $("#searchForm").on('submit', (e) => {
        // console.log($("#searchText").val());

        let searchtext = $("#searchText").val();
        getMovies(searchtext);
        e.preventDefault();
    });
});

function getMovies(searchtext) {
    //     console.log(searchtext);
    //     api key= ebdf8bef

    axios.get('http://www.omdbapi.com/?apikey=ebdf8bef&s=' + searchtext)
        .then((response) => {
            console.log(response);
            let movies = response.data.Search;
            let output = '';

            $.each(movies, (index, movie) => {
                output += `
                    <div class="col-md-3">
                        <div class="card card-body bg-light text-center">
                            <img src="${movie.Poster}">
                            <h5>${movie.Title}</h5>
                            <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                        </div>
                    </div>                
                `;
            });

            $("#movies").html(output);

        })
        .catch((err) => {
            console.log(err);
        });
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html'
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');


    axios.get('http://www.omdbapi.com/?apikey=ebdf8bef&i=' + movieId + '&plot=full')
        .then((response) => {
            console.log(response);
            let movie = response.data;
            // console.log(movie);

            let output = `

                <div class="row">

                    <div class="col-md-4">
                    <img src="${movie.Poster}" class="thumbnail">
                    </div>

                    <div class="col-md-8">
                    <h2>${movie.Title}</h2>
                    <ul class="list-group">
                    <li class="list-group-item"><strong>Genra: </strong>${movie.Genre}</li>
                    <li class="list-group-item"><strong>Released: </strong>${movie.Released}</li>
                    <li class="list-group-item"><strong>Rating: </strong>${movie.Rated}</li>
                    <li class="list-group-item"><strong>imdbRating: </strong>${movie.imdbRating}</li>
                    <li class="list-group-item"><strong>Director: </strong>${movie.Director}</li>
                    <li class="list-group-item"><strong>Writer: </strong>${movie.Writer}</li>
                    <li class="list-group-item"><strong>Actors: </strong>${movie.Actors}</li>

                    </ul>
                    </div>

                </div>
                <div class="row plot">
                    <div class="card bg-light inplot">
                        <h3> Plot </h3>
                        ${movie.Plot}
                        <hr>
                        <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View imdb</a>
                        <a href="index.html" class="btn btn-default">Go back to Search</a>
                    </div>
                </div>

                `;

            $("#movie").html(output);


        })
        .catch((err) => {
            console.log(err);
        });

}