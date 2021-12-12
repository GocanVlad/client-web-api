"use strict";
const baseUrl = "http://localhost:1028/api/movies/";
let currentId;
let entityIndex;

const myForm = document.getElementById("myForm");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const postM = document.querySelectorAll(".show");
const editBtn = document.getElementById("edit");
editBtn.addEventListener("click", updateRatingById);

myForm.addEventListener("submit", function postRating(e) {
  e.preventDefault();
  var x = document.getElementById("movies-list").options;

  let inputName = document.getElementById("name").value;
  let inputDescription = document.getElementById("description").value;

  fetch(baseUrl + `${x[x.selectedIndex].id}/ratings/`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: inputName,
      description: inputDescription,
    }),
  });
  closeModal();
  document.myForm.reset();
});

async function getAllMovies() {
  await fetch(baseUrl)
    .then((res) => res.json())
    .then((data) => {
      renderMovie(data);
      console.log(data);
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
      <select id="movies-list" name="movies-list" onchange="selectedItem();" >
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
      <td id="rating-id" style="display:none">${data[i].id}</td>
        <td id="rating-name ${data[i].id}">${data[i].name}</td>
        <td id="rating-description ${data[i].id}">${data[i].description}</td>
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

async function deleteRatingById(movieId, id) {
  await fetch(baseUrl + `${movieId}/ratings/${id}`, { method: "delete" }).catch(
    (error) => {
      throw new Error("NaN");
    }
  );

  getAllRatings(movieId);
}
async function updateRatingById() {
  document.getElementById("movie-id");
  var x = document.getElementById("movies-list").options;

  const putMethod = {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(getFieldValue()),
  };

  fetch(baseUrl + `${x[x.selectedIndex].id}/ratings/${currentId}`, putMethod)
    .then((response) => {
      return response.text();
    })
    .catch((error) => {
      throw new Error("bad");
    });
  await getAllMovies();
  document.myForm.reset();
  closeModal();
}

function selectedItem() {
  var x = document.getElementById("movies-list").options;
  entityIndex = x[x.selectedIndex].id;
  try {
    if (entityIndex !== "empty") {
      getAllRatings(entityIndex);
      updateCurrentId(entityIndex);
    } else {
      document.getElementById("rating-table").innerHTML = "<tr></tr>";
    }
  } catch (error) {
    console.log("Empty Option");
  }
}

function updateCurrentId(id) {
  currentId = id;
  console.log(currentId);
}

function showValues() {
  const data = initializeField();
  document.getElementById("name").value = data.name;
  document.getElementById("description").value = data.description;
}

function initializeField() {
  const data = {
    name: document.getElementById(`rating-name ${currentId}`).textContent,
    description: document.getElementById(`rating-description ${currentId}`)
      .textContent,
  };
  return data;
}

function getFieldValue() {
  const data = {
    name: document.getElementById(`rating-name ${currentId}`).value,
    description: document.getElementById(`rating-description ${currentId}`)
      .value,
  };
  return data;
}

const openCreateModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const openUpdateModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  getAllMovies();
};
overlay.addEventListener("click", closeModal);
