import 'bootstrap/dist/css/bootstrap.css';
import './css/index.scss';

import {
  emptyCategoryRedirect,
  createNewMovie,
  clearInputValues,
  renderElementgroup,
  editWatchedBoolean,
  populateEditForm,
  checkForSearchInput,
  postEdittedData,
  clearRenderedMovies
} from './functions';

//Button Initialisations
const deletebutton = document.getElementById('deletebtn');
const navHome = document.getElementById('home');
const actionlnk = document.getElementById('Action');
const Animation = document.getElementById('Animation');
const Family = document.getElementById('Family');
const History = document.getElementById('History');
const Thriller = document.getElementById('Thriller');
const Fantasy = document.getElementById('Fantasy');
const Comedy = document.getElementById('Comedy');
const Sci_Fi = document.getElementById('Sci-Fi');
const Mystery = document.getElementById('Mystery');
const Crime = document.getElementById('Crime');
const Drama = document.getElementById('Drama');
const Horror = document.getElementById('Horror');
const Adventure = document.getElementById('Adventure');
const watchbtn = document.getElementById('watchbtn');
const unwatchedid = document.getElementById('unwatchedid');
const watchedid = document.getElementById('watchedid');
const searchbtn = document.getElementById('searchbtn');
const saveButton = document.getElementById('save');
const saveEditButton = document.getElementById('saveedit');

const addlibrary = document.getElementById('addToLibrary');
const MovieFormModal = document.getElementById('staticBackdrop');
const modalLabel = document.getElementById('staticBackdropLabel');

window.addEventListener('load', () => {
  if (localStorage.getItem("database") === null) {
    localStorage.setItem("database", "[]");
  }
  if (localStorage.getItem("id") === null) {
    localStorage.setItem("id", "0");
  }
  renderElementgroup('all');
})

const enableSaveButtonAndLabel = () => {
  modalLabel.textContent = 'Add Movie';
  saveEditButton.style.display = 'none';
  saveButton.style.display = 'inline';
}

const enableEditButtonAndLabel = () => {
  modalLabel.textContent = 'Edit Movie';
  saveEditButton.removeAttribute('disabled');
  saveButton.style.display = 'none';
  saveEditButton.style.display = 'inline';
}

addlibrary.addEventListener('click', () => {
  clearInputValues();
  enableSaveButtonAndLabel();
  MovieFormModal.setAttribute('data-arg', 'addmovie')
})

saveButton.addEventListener('click', () => {
  createNewMovie();
  clearInputValues();
  renderElementgroup('all');
  alert('Movie added successfully');
})

saveEditButton.addEventListener('click', (event) => {
  let editIndex = parseInt(event.target.name, 10);
  postEdittedData(editIndex);
  saveEditButton.setAttribute('disabled', true);
  alert('Movie Editted successfully');
  clearInputValues();
  clearRenderedMovies();
  renderElementgroup('all');
})

watchbtn.addEventListener('click', (event) => {
  let editIndex = parseInt(event.target.getAttribute('data-ind'), 10);
  editWatchedBoolean(editIndex);
  window.open(event.target.getAttribute('data-href'));
})


deletebutton.addEventListener('click', (event) => {
  let data = JSON.parse(localStorage.getItem('database'));
  data.splice(parseInt(event.target.name, 10), 1);
  localStorage.setItem('database', JSON.stringify(data));
  renderElementgroup('all');
});

MovieFormModal.addEventListener('focus', (event) => {
  if (event.target.getAttribute("data-arg") !== "addmovie") {
    let editIndex = parseInt(event.target.getAttribute("data-arg"), 10);
    enableEditButtonAndLabel();
    saveEditButton.setAttribute('name', editIndex);
    populateEditForm(editIndex);
  }

})

navHome.addEventListener('click', () => {
  renderElementgroup('all');
})

actionlnk.addEventListener('click', () => {
  renderElementgroup('Action');
  emptyCategoryRedirect();
})
Animation.addEventListener('click', () => {
  renderElementgroup('Animation');
  emptyCategoryRedirect();
})
Family.addEventListener('click', () => {
  renderElementgroup('Family');
  emptyCategoryRedirect();
})
History.addEventListener('click', () => {
  renderElementgroup('History');
  emptyCategoryRedirect();
})
Thriller.addEventListener('click', () => {
  renderElementgroup('Thriller');
  emptyCategoryRedirect();
})
Fantasy.addEventListener('click', () => {
  renderElementgroup('Fantasy');
  emptyCategoryRedirect();
})
Comedy.addEventListener('click', () => {
  renderElementgroup('Comedy');
  emptyCategoryRedirect();
})
Sci_Fi.addEventListener('click', () => {
  renderElementgroup('Sci-Fi');
  emptyCategoryRedirect();
})
Mystery.addEventListener('click', () => {
  renderElementgroup('Mystery');
  emptyCategoryRedirect();
})
Crime.addEventListener('click', () => {
  renderElementgroup('Crime');
  emptyCategoryRedirect();
})
Drama.addEventListener('click', () => {
  renderElementgroup('Drama');
  emptyCategoryRedirect();
})
Horror.addEventListener('click', () => {
  renderElementgroup('Horror');
  emptyCategoryRedirect();
})
Adventure.addEventListener('click', () => {
  renderElementgroup('Adventure');
  emptyCategoryRedirect();
})

unwatchedid.addEventListener('click', () => {
  renderElementgroup('unwatched');
  emptyCategoryRedirect();
})
watchedid.addEventListener('click', () => {
  renderElementgroup('watched');
  emptyCategoryRedirect();
})

searchbtn.addEventListener('click', (event) => {
  event.preventDefault();
  clearRenderedMovies();
  checkForSearchInput();
})