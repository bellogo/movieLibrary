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
// BUTTON INITIALISATIONS
const saveButton = document.getElementById('save');
const saveEditButton = document.getElementById('saveedit');
const closebutton = document.getElementsByClassName('closebtn');



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


const renderElementgroup = (group) => {
  if (group === "all") {
    let allData = JSON.parse(localStorage.getItem("database"));
    clearRenderedMovies();
    // allData.map(item => renderElement(item));
    for (let a = allData.length - 1; a > -1; a--) {

      let genreSpan = '';
      let cardDiv = document.createElement('div');
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
              <span>${genreSpan}</span>
              <span>Rating: ${allData[a].rating}</span>
              <p>${allData[a].description}</p>
              <a href=${allData[a].trailerlnk} target="_blank " id="${allData[a].id}trailer" class="trailers ">Watch Trailer</a>
              <div class="buton btn-group" role="group" aria-label="Button group with nested dropdown">
        <button name=${a} type="button" class="edit btn btn-secondary" data-toggle="modal" data-target="#staticBackdrop" onClick= "

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
        const saveButton = document.getElementById('save');
        const saveEditButton = document.getElementById('saveedit');

        
        modalLabel.textContent = 'Edit Movie';
        let editIndex = parseInt(event.target.name, 10);
        saveButton.style.display = 'none';
        saveEditButton.style.display = 'inline';

        let data = JSON.parse(localStorage.getItem('database'));
        titleInput.value = data[editIndex].title;
        ratingInput.value = data[editIndex].rating;
        descriptionInput.value = data[editIndex].description;
        imageLinkInput.value = data[editIndex].imagelnk;
        watchLinkInput.value = data[editIndex].watchlnk;
        trailerLinkInput.value = data[editIndex].trailerlnk;
        downloadLqInput.value = data[editIndex].downloadLq;
        downloadHqInput.value = data[editIndex].downloadHq;
        localStorage.setItem('editid', editIndex)
        saveEditButton.setAttribute('name', editIndex);


        ">Edit</button>
        <button type="button" class="btn btn-secondary" onClick=>Del</button>
      
        <div class="btn-group" role="group">
          <button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Download
          </button>
          <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
            <a class="dropdown-item" href=${allData[a].downloadLq}>Low Quality</a>
            <a class="dropdown-item" href=${allData[a].downloadHq}>High Quality</a>
            <a class="dropdown-item" href=${allData[a].watchlnk}>Watch</a>
      
          </div>
        </div>
      </div>
            </div>
          </div>
        </div>`


      // renderElement(allData[a]);
    }
  } else if (group === 'action' || 'adventure' || 'horror' || 'drama' || 'crime' || 'mystery' || 'sci-fi' || 'comedy' || 'fantasy' || 'thriller' || 'history' || 'family' || 'animation') {
    let allData = JSON.parse(localStorage.getItem("database"));
    clearRenderedMovies();
    for (let b = 0; b < allData.length; b++) {
      for (let c = 0; c < allData.length; c++) {
        if (group === allData[b].genre[c]) {
          renderElement(allData[a]);
        }
      }
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

const populateEditFormReturnIndex = (editInd) => {
  let data = JSON.parse(localStorage.getItem("database"));
  titleInput.value = data[editInd].title;
  ratingInput.value = data[editInd].rating;
  descriptionInput.value = data[editInd].description;
  imageLinkInput.value = data[editInd].imagelnk;
  watchLinkInput.value = data[editInd].watchlnk;
  trailerLinkInput.value = data[editInd].trailerlnk;
  downloadLqInput.value = data[editInd].downloadLq;
  downloadHqInput.value = data[editInd].downloadHq;
}
const postEdittedData = (editInd) => {
  let data = JSON.parse(localStorage.getItem("database"));
  data[editInd].title = titleInput.value;
  data[editInd].rating = ratingInput.value;
  data[editInd].description = descriptionInput.value;
  data[editInd].imagelnk = imageLinkInput.value;
  data[editInd].trailerlnk = trailerLinkInput.value;
  data[editInd].watchlnk = watchLinkInput.value;
  data[editInd].downloadLq = downloadLqInput.value;
  data[editInd].downloadHq = downloadHqInput.value;
  data[editInd].genre = getCheckBoxArray();

  localStorage.setItem("database", JSON.stringify(data));
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

  // console.log(main)


})

const trial = () => {
  for (let i = 0; i < editclick.length; i++) {
    editclick[i].addEventListener('click', (event) => {
      let editIndex = parseInt(event.target.name, 10);
      modalLabel.textContent = 'Edit Movie';
      enableEditButton();
      console.log(editIndex);
      populateEditFormReturnIndex(editIndex);

      saveEditButton.addEventListener('click', () => {
        postEdittedData(editIndex);
        renderElementgroup('all');
        // clearInputValues();
        alert('Movie Editted successfully');

      })

    })
  }


}









// closebutton[0].addEventListener('click', () => {
//   clearInputValues();
// })
// closebutton[1].addEventListener('click', () => {
//   clearInputValues();
// })



addlibrary.addEventListener('click', () => {
  enableSaveButton();
  modalLabel.textContent = 'Add Movie';
})

saveButton.addEventListener('click', () => {
  createNewMovie();
  clearInputValues();
  renderElementgroup('all');
  alert('Movie added successfully');
})

saveEditButton.addEventListener('click', (event) => {
  if(event.target.name == localStorage.getItem("editid")){
    let data = JSON.parse(localStorage.getItem('database'));
let editIndex = parseInt(localStorage.getItem("editid"),10);
    data[editIndex].title = titleInput.value;
  data[editIndex].rating = ratingInput.value;
  data[editIndex].description = descriptionInput.value;
  data[editIndex].imagelnk = imageLinkInput.value;
  data[editIndex].trailerlnk = trailerLinkInput.value;
  data[editIndex].watchlnk = watchLinkInput.value;
  data[editIndex].downloadLq = downloadLqInput.value;
  data[editIndex].downloadHq = downloadHqInput.value;
  const getCheckBoxArray = () => {
    let genreList = [];
    for (let i = 0; i < allCheckBoxes.length; i++) {
      if (allCheckBoxes[i].checked === true) {
        genreList.push(allCheckBoxes[i].value);
      }
    }
    return genreList;
  }
  if(getCheckBoxArray().length>0){
    data[editIndex].genre = getCheckBoxArray();
  }
  localStorage.setItem('database', JSON.stringify(data));
  alert('Movie Editted successfully');
  main.innerHTML = '';
  }
  
  
renderElementgroup('all'); 
})