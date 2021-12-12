'use strict'
const baseUrl = "http://localhost:1028/api/movies/";
let currentId
async function getAllMovies() {
  await fetch(baseUrl)
    .then((res) => res.json())
    .then((data) => {
      renderMovie(data);
      console.log(data) 
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
        <td><button onclick="deleteRatingById(${currentId},${data[i].id})" id="delete-movie" style="background-color:rgb(206, 87, 50)">🗑️</button>
        <button onclick="updateCurrentId(${data[i].id});
        openUpdateModal();showValues();" class="show-modal" id="update-movie" style="background-color:#1e81d3">
          Update Rating
        </button></td>
      </tr>
  `;
  }
  document.getElementById("rating-table").innerHTML = tableBody;
};

async function deleteRatingById(movieId,id) {
  await fetch(baseUrl + `${movieId}/ratings/${id}`, { method: "delete" }).catch(
    (error) => {
      throw new Error("NaN");
    }
  );
  
  getAllRatings(movieId);
}

function selectedItem() {
  var x = document.getElementById("movies-list").options;
  try {
   if( x[x.selectedIndex].id !== 'empty' ){
    getAllRatings(x[x.selectedIndex].id);
    updateCurrentId(x[x.selectedIndex].id) }
    else
    {document.getElementById("rating-table").innerHTML='<tr></tr>'}
  } catch (error) {
    console.log("Empty Option")
  }
  
}
function updateCurrentId(id) {
  currentId = id;
}

