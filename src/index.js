// import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './css/index.scss';
import './functions';
// import {
//   saveButton,
//   createNewMovie,
//   clearInputValues,
//   logDatabasetoConsole,
//   renderElement,
//   renderElementgroup,
//   editclick,
//   modalLabel,
//   addlibrary,
//   editButtonClickAction,
//   titleInput,
//   ratingInput,
//   downloadHqInput,
//   downloadLqInput,
//   trailerLinkInput,
//   imageLinkInput,
//   descriptionInput,
//   allCheckBoxes,
//   postEdittedData,
//   populateEditFormReturnIndex,
//   saveEditButton,
//   clearRenderedMovies,
//   closebutton,
//   enableEditButton,
//   enableSaveButton,
//   main
// } from './functions';



// INPUT INITIALISATIONS
const titleInput = document.getElementById('title_input');
const allCheckBoxes = document.getElementsByClassName('check');
const ratingInput = document.getElementById('rating_input');
const descriptionInput = document.getElementById('description_input');
const imageLinkInput = document.getElementById('image-link_input');
const trailerLinkInput = document.getElementById('trailer-link_input');
const watchLinkInput = document.getElementById('watch-link_input');
const downloadLqInput = document.getElementById('download-linklq_input');
const downloadHqInput = document.getElementById('download-linkhq_input');
const editclick = document.getElementsByClassName('edit');
const main = document.getElementById('movies');
const modalLabel = document.getElementById('staticBackdropLabel');
const addlibrary = document.getElementById('addToLibrary');
const MovieFormModal = document.getElementById('staticBackdrop');
const searchinput = document.getElementById('searchinput');



// BUTTON INITIALISATIONS
const saveButton = document.getElementById('save');
const saveEditButton = document.getElementById('saveedit');
const closebutton = document.getElementsByClassName('closebtn');
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


// FUNCTIONS
const enableSaveButton = () => {
  saveEditButton.style.display = 'none';
  saveButton.style.display = 'inline';
}

const enableEditButton = () => {
  saveButton.style.display = 'none';
  saveEditButton.style.display = 'inline';
}

const clearRenderedMovies = () => {
  main.innerHTML = '';
}

const renderThisElement = (allData, a) => {
  let genreSpan = '';
  let cardDiv = document.createElement('div');
  let header = document.createElement('h6');
  for (let i = 0; i < allData[a].genre.length; i++) {
    if (i === allData[a].genre.length - 1) {
      genreSpan += `${allData[a].genre[i]}`
    } else {
      genreSpan = `${allData[a].genre[i]}, `
    }
  }


  main.appendChild(cardDiv);
  cardDiv.classList.add('card');
  cardDiv.innerHTML = `
      <h6 class="title">${allData[a].title}</h6>
      <div class="background shadow bg-black rounded-lg" style="background-image: url(&quot;${allData[a].imagelnk}&quot;);
      ">
        <div class=" hover shadow bg-black rounded-lg">
          <span class="genre">${genreSpan}</span>
          <span class="rating">Rating: ${allData[a].rating}</span>
          <p>${allData[a].description}</p>
          <a href=${allData[a].trailerlnk} target="_blank" id="${allData[a].id}trailer" class="trailers ">Watch Trailer</a>
          <div id="buttons" class="buton btn-group" role="group" aria-label="Button group with nested dropdown">
    <button name=${a} type="button" class="edit btn btn-secondary" data-toggle="modal" data-target="#staticBackdrop" onClick= "
    const MovieFormModal = document.getElementById('staticBackdrop');
    MovieFormModal.setAttribute('data-arg', event.target.name);

    ">Edit</button>
    <button name=${a} type="button" class="delete btn btn-secondary" data-toggle="modal" data-target="#exampleModal" onClick="
    deletebtn.setAttribute('name', event.target.name);
    ">Delete</button>
  
    <div class="btn-group" role="group">
      <button id="btnGroupDrop1" type="button" title="Watch & Download Links" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Links
      </button>
      <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
      <a class="dropdown-item links" name=${a} target="_blank" href=${allData[a].watchlnk} data-toggle="modal" data-target="#watchmodal" onClick="
      watchbtn.setAttribute('data-ind', event.target.name);
      watchbtn.setAttribute('data-href', event.target.href);
      
      ">Watch</a>

        <a class="dropdown-item links" target="_blank" href=${allData[a].downloadLq}>Download LQ</a>
        <a class="dropdown-item links" target="_blank" href=${allData[a].downloadHq}>Download HQ</a>
  
      </div>
    </div>
  </div>
        </div>
      </div>
    </div>`
}


const renderElementgroup = (group) => {
  if (group === 'action' || 'adventure' || 'horror' || 'drama' || 'crime' || 'mystery' || 'sci-fi' || 'comedy' || 'fantasy' || 'thriller' || 'history' || 'family' || 'animation') {
    let allData = JSON.parse(localStorage.getItem("database"));
    clearRenderedMovies();
    for (let b = allData.length - 1; b > -1; b--) {
      for (let c = 0; c < allData[b].genre.length; c++) {
        if (group === allData[b].genre[c]) {
          renderThisElement(allData, b);
        }
      }
    }
  }

  if (group === 'unwatched') {
    let allData = JSON.parse(localStorage.getItem("database"));
    clearRenderedMovies();
    for (let p = allData.length - 1; p > -1; p--) {
      if (allData[p].watched === false) {
        renderThisElement(allData, p);
      }
    }
  }

  if (group === 'watched') {
    let allData = JSON.parse(localStorage.getItem("database"));
    clearRenderedMovies();
    for (let t = allData.length - 1; t > -1; t--) {
      if (allData[t].watched === true) {
        renderThisElement(allData, t);
      }
    }
  }

  if (group === "all") {
    let allData = JSON.parse(localStorage.getItem("database"));
    clearRenderedMovies();
    for (let a = allData.length - 1; a > -1; a--) {
      renderThisElement(allData, a);
    }
  }
}
const getCheckBoxArray = () => {
  let genreList = [];
  for (let i = 0; i < allCheckBoxes.length; i++) {
    if (allCheckBoxes[i].checked === true) {
      genreList.push(allCheckBoxes[i].value);
    }
  }
  return genreList;
}

const countCheckedInput = () => {
  let count = 0;
  for (let i = 0; i < allCheckBoxes.length; i++) {
    if (allCheckBoxes[i].checked === true) {
      count++;
    }
  }
  return count;
}

const uncheckCheckedInput = () => {
  for (let i = 0; i < allCheckBoxes.length; i++) {
    if (allCheckBoxes[i].checked === true) {
      allCheckBoxes[i].checked = false;
    }
  }
}

const createNewId = () => {
  let movieId = parseInt(localStorage.getItem("id"), 10);
  movieId++;
  localStorage.setItem("id", movieId);
  return movieId;
}

const createNewMovie = () => {
  let data = JSON.parse(localStorage.getItem("database"))
  data.push({
    title: titleInput.value,
    genre: getCheckBoxArray(),
    rating: ratingInput.value,
    description: descriptionInput.value,
    imagelnk: imageLinkInput.value,
    trailerlnk: trailerLinkInput.value,
    watchlnk: watchLinkInput.value,
    downloadLq: downloadLqInput.value,
    downloadHq: downloadHqInput.value,
    watched: false,
    id: createNewId()
  });
  localStorage.setItem("database", JSON.stringify(data));
}

const populateEditForm = (editIndex) => {
  let data = JSON.parse(localStorage.getItem("database"));
  titleInput.value = data[editIndex].title;
  ratingInput.value = data[editIndex].rating;
  descriptionInput.value = data[editIndex].description;
  imageLinkInput.value = data[editIndex].imagelnk;
  watchLinkInput.value = data[editIndex].watchlnk;
  trailerLinkInput.value = data[editIndex].trailerlnk;
  downloadLqInput.value = data[editIndex].downloadLq;
  downloadHqInput.value = data[editIndex].downloadHq;
}
const postEdittedData = (editIndex) => {
  let data = JSON.parse(localStorage.getItem('database'));
  data[editIndex].title = titleInput.value;
  data[editIndex].rating = ratingInput.value;
  data[editIndex].description = descriptionInput.value;
  data[editIndex].imagelnk = imageLinkInput.value;
  data[editIndex].trailerlnk = trailerLinkInput.value;
  data[editIndex].watchlnk = watchLinkInput.value;
  data[editIndex].downloadLq = downloadLqInput.value;
  data[editIndex].downloadHq = downloadHqInput.value;

  if (getCheckBoxArray().length > 0) {
    data[editIndex].genre = getCheckBoxArray();
  }
  localStorage.setItem('database', JSON.stringify(data));
}



const clearInputValues = () => {
  titleInput.value = '';
  uncheckCheckedInput();
  ratingInput.value = '';
  descriptionInput.value = '';
  imageLinkInput.value = '';
  watchLinkInput.value = '';
  trailerLinkInput.value = '';
  downloadLqInput.value = '';
  downloadHqInput.value = '';
}

const logDatabasetoConsole = () => {
  console.log(JSON.parse(localStorage.getItem("database")));
}
const confirmEmptyCategory = () => {
  if (main.childElementCount === 0) {
    let r = confirm('There are No Movies in this category\nClick OK to view All Movies\nor cancel and choose another category');
    if (r === true) {
      renderElementgroup('all');
    }
  }
}


// export {
//     saveButton,
//     createNewMovie,
//     clearInputValues,
//     logDatabasetoConsole,
//     renderElement,
//     renderElementgroup,
//     editclick,
//     modalLabel,
//     addlibrary,
//     titleInput,
//     ratingInput,
//     downloadHqInput,
//     downloadLqInput,
//     trailerLinkInput,
//     imageLinkInput,
//     descriptionInput,
//     allCheckBoxes,
//     postEdittedData,
//     populateEditFormReturnIndex,
//     saveEditButton,
//     clearRenderedMovies,
//     closebutton,
//     enableEditButton,
//     enableSaveButton,
//     main
// };
logDatabasetoConsole();








window.addEventListener('load', () => {
  if (localStorage.getItem("database") === null) {
    localStorage.setItem("database", "[]");
  }
  if (localStorage.getItem("id") === null) {
    localStorage.setItem("id", "0");
  }
  renderElementgroup('all');


})



addlibrary.addEventListener('click', () => {
  clearInputValues();
  enableSaveButton();
  modalLabel.textContent = 'Add Movie';
  MovieFormModal.setAttribute('data-arg', 'addmovie')

})

saveButton.addEventListener('click', () => {
  createNewMovie();
  clearInputValues();
  renderElementgroup('all');
  alert('Movie added successfully');
})

saveEditButton.addEventListener('click', (event) => {

  let data = JSON.parse(localStorage.getItem('database'));
  let editIndex = parseInt(event.target.name, 10);
  postEdittedData(editIndex);
  alert('Movie Editted successfully');
  clearRenderedMovies();
  saveEditButton.setAttribute('disabled', true);
  renderElementgroup('all');
  clearInputValues();

})

watchbtn.addEventListener('click', (event) => {
  console.log(event.target.getAttribute('data-ind'));
  let data = JSON.parse(localStorage.getItem('database'));
  let editIndex = parseInt(event.target.getAttribute('data-ind'), 10);
  if (data[editIndex].watched === false) {
    data[editIndex].watched = true;
    localStorage.setItem('database', JSON.stringify(data));
  }
  window.open(event.target.getAttribute('data-href'))
})


deletebutton.addEventListener('click', (event) => {
  let data = JSON.parse(localStorage.getItem('database'));
  data.splice(parseInt(event.target.name, 10), 1);
  localStorage.setItem('database', JSON.stringify(data));
  renderElementgroup('all');
});

MovieFormModal.addEventListener('focus', (event) => {
  // console.log(event.target.getAttribute("data-arg"));
  if (event.target.getAttribute("data-arg") !== "addmovie") {
    modalLabel.textContent = 'Edit Movie';
    let editIndex = parseInt(event.target.getAttribute("data-arg"), 10);
    saveEditButton.removeAttribute('disabled');
    saveButton.style.display = 'none';
    saveEditButton.style.display = 'inline';
    saveEditButton.setAttribute('name', editIndex);
    populateEditForm(editIndex);

  }

})



navHome.addEventListener('click', () => {
  renderElementgroup('all');
})

actionlnk.addEventListener('click', () => {
  renderElementgroup('Action');
  confirmEmptyCategory();

})
Animation.addEventListener('click', () => {
  renderElementgroup('Animation');
  confirmEmptyCategory();
})
Family.addEventListener('click', () => {
  renderElementgroup('Family');
  confirmEmptyCategory();
})
History.addEventListener('click', () => {
  renderElementgroup('History');
  confirmEmptyCategory();
})
Thriller.addEventListener('click', () => {
  renderElementgroup('Thriller');
  confirmEmptyCategory();
})
Fantasy.addEventListener('click', () => {
  renderElementgroup('Fantasy');
  confirmEmptyCategory();
})
Comedy.addEventListener('click', () => {
  renderElementgroup('Comedy');
  confirmEmptyCategory();
})
Sci_Fi.addEventListener('click', () => {
  renderElementgroup('Sci-Fi');
  confirmEmptyCategory();
})
Mystery.addEventListener('click', () => {
  renderElementgroup('Mystery');
  confirmEmptyCategory();
})
Crime.addEventListener('click', () => {
  renderElementgroup('Crime');
  confirmEmptyCategory();
})
Drama.addEventListener('click', () => {
  renderElementgroup('Drama');
  confirmEmptyCategory();
})
Horror.addEventListener('click', () => {
  renderElementgroup('Horror');
  confirmEmptyCategory();
})
Adventure.addEventListener('click', () => {
  renderElementgroup('Adventure');
  confirmEmptyCategory();
})
unwatchedid.addEventListener('click', () => {
  renderElementgroup('unwatched');
})
watchedid.addEventListener('click', () => {
  renderElementgroup('watched');
})

searchbtn.addEventListener('click', (event) => {
let val = searchinput.value;
  event.preventDefault();
  clearRenderedMovies();
  let data = JSON.parse(localStorage.getItem('database'));

  // console.log(val)
const testRegex = new RegExp(val, "gi");
for (let h = data.length - 1; h > -1; h--) {
if(testRegex.test(data[h].title) === true){
  // console.log('yhjbhjhh')
  renderThisElement(data, h);

}

}
searchinput.value = '';
if (main.childElementCount === 0) {
  let r = confirm('Search returned no results\nClick OK to view All Movies\nor cancel to search again');
  if (r === true) {
    renderElementgroup('all');
  }
}
})