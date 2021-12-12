const baseUrl = "http://localhost:1028/api/movies/";

async function getAllMovies() {
  await fetch(baseUrl)
    .then((res) => res.json())
    .then((data) => {
      renderMovie(data);
    })
    .catch((error) => {
      console.log(error);
    });
}
getAllMovies();

async function getAllRatings(movieId) {
  await fetch(baseUrl + `${movieId}/ratings/`)
    .then((res) => res.json())
    .then((data) => {
      renderRating(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

const renderMovie = function (data) {
  let listBody = `
    <label for="ratings">Choose a movie:</label>
      <select id="movies-list" name="movies-list" onchange="selectedItem()" >
        <option id="empty" value="empty"></option>
    `;
  for (let i = 0; i < data.length; i++) {
    listBody += ` 
    
      <option id="${data[i].id}" value="${data[i].name}">${data[i].name}</option>`;
    getAllRatings(data[i].id);
  }

  document.getElementById("div1").innerHTML = listBody;
};

const renderRating = function (data) {
  let tableBody = "";
  for (let i = 0; i < data.length; i++) {
    tableBody += `
      <tr>
        <td id="rating-name">${data[i].name}</td>
        <td id="rating-description">${data[i].description}</td>
        <td><button onclick="deleteRatingById(${data[i].id})" id="delete-movie" style="background-color:rgb(206, 87, 50)">🗑️</button></td>
      </tr>
  `;
  }
  document.getElementById("rating-table").innerHTML = tableBody;
};

async function deleteRatingById(id) {
  await fetch(baseUrl + `${movieId}/ratings/${id}`, { method: "delete" }).catch(
    (error) => {
      throw new Error("NaN");
    }
  );
  getAllMovies();
}

function selectedItem() {
  var x = document.getElementById("movie-list").value;
  console.log(x);
  document.getElementById("div2").innerHTML = "You selected: " + x;
}
