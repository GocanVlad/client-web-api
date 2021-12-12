"use strict";
let currentId;

const myForm = document.getElementById("myForm");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const postM = document.querySelectorAll(".show");

const baseUrl = "http://localhost:1028/api/movies/";

myForm.addEventListener("submit", function postMovie(e) {
  e.preventDefault();
  let inputName = document.getElementById("title").value;
  let inputGenre = document.getElementById("genre").value;
  fetch(baseUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: inputName,
      genre: inputGenre,
    }),
  });
  closeModal();
  getAllMovies();
  document.myForm.reset();
});

const renderMovie = function (data) {
  let tableBody = "";
  for (let i = 0; i < data.length; i++) {
    tableBody += `
              <tr>
                <td id="movie-id" style="display:none">${data[i].id}</td>
                <td id="movie-title">${data[i].name}</td>
                <td id="movie-genre">${data[i].genre}</td>
                <td>
                  <button onclick="updateCurrentId(${data[i].id});openUpdateModal();showValues();" class="show-modal" id="update-movie" style="background-color:#1e81d3">
                    Update Movie
                  </button>
                  <button onclick="deleteMovieById(${data[i].id})" id="delete-movie" style="background-color:rgb(206, 87, 50)">
                  🗑️
                  </button>
                  </td>
              </tr>
              `;
    document.getElementById("movie-table").innerHTML = tableBody;
  }
};

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

async function deleteMovieById(id) {
  await fetch(baseUrl + `${id}`, { method: "delete" }).catch((error) => {
    throw new Error("NaN");
  });
  getAllMovies();
}

function showValues() {
  const data = initializeField();
  document.getElementById("title").value = data.name;
  document.getElementById("genre").value = data.genre;
}

function initializeField() {
  const data = {
    name: document.getElementById("movie-title").textContent,
    genre: document.getElementById("movie-genre").textContent,
  };
  console.log(data);
  return data;
}

function getFieldValue() {
  const data = {
    name: document.getElementById("title").value,
    genre: document.getElementById("genre").value,
  };
  return data;
}

function updateCurrentId(id) {
  currentId = id;
}

const editBtn = document.getElementById("edit");
editBtn.addEventListener("click", updateMovieById);

async function updateMovieById() {
  document.getElementById("movie-id");
  const putMethod = {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(getFieldValue()),
  };

  fetch(baseUrl + `${currentId}`, putMethod)
    .then((response) => {
      return response.text();
    })
    .catch((error) => {
      throw new Error("bad");
    });
  await getAllMovies();
  document.myForm.reset();
}

const openCreateModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  document.getElementById("edit").style.display = "none";
};

const openUpdateModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  document.getElementById("submit").style.display = "none";
  document.getElementById("submit").disabled = true;
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  getAllMovies();
};
overlay.addEventListener("click", closeModal);
window.addEventListener("load", getAllMovies());
