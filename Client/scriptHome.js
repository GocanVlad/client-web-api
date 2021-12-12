"use strict";

const getMovies = document.getElementById("movies");
async function getAllMovies() {
  const movies = await fetch(baseUrl + "movies")
    .then((res) => res.json())
    .then((data) => {
      renderMovie(data);
    })
    .catch((error) => {
      console.log(error);
    });
}
getMovies.addEventListener("click", getAllMovies);
