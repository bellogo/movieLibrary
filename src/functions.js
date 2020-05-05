

// INPUT INITIALISATIONS
const titleInput = document.getElementById('title_input');
const allCheckBoxes = document.getElementsByClassName('check');
const ratingInput = document.getElementById('rating_input');
const descriptionInput = document.getElementById('description_input');
const imageLinkInput = document.getElementById('image-link_input');
const trailerLinkInput = document.getElementById('trailer-link_input');
const watchlinkinput = document.getElementById('watch-link_input');
const downloadLqInput = document.getElementById('download-linklq_input');
const downloadHqInput = document.getElementById('download-linkhq_input');
const editclick = document.getElementsByClassName('edit');
const main = document.getElementById('movies');
const modalLabel = document.getElementById('staticBackdropLabel');
const addlibrary = document.getElementById('addToLibrary');
const navHome = document.getElementById('home');

// BUTTON INITIALISATIONS
const saveButton = document.getElementById('save');
const saveEditButton = document.getElementById('saveedit');
const closebutton = document.getElementsByClassName('closebtn');



// FUNCTIONS
const getEditId = (event) => {
    console.log(event.target.tagName);
  
  }

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


const renderElement = (object) => {
    // CREATED ELEMENTS
    let genreSpan = '';
    // let ratingSpan = document.createElement('span');
    // let descriptionP = document.createElement('p');
    // let trailerLink = document.createElement('a');
    // let buttonDiv = document.createElement('div');
    // let editButton = document.createElement('button');
    // let deleteButton = document.createElement('button');
    // let dlqButton = document.createElement('button');
    // let dhqButton = document.createElement('button');
    // let hoverDiv = document.createElement('div');
    // let backgroundDiv = document.createElement('div');
    // let titleHeader = document.createElement('h6');
    
    let cardDiv = document.createElement('div');
    for (let i = 0; i < object.genre.length; i++) {
        if (i === object.genre.length - 1) {
            genreSpan += `${object.genre[i]}`
        } else {
            genreSpan = `${object.genre[i]}, `
        }
    }
    let event = 4;

    main.appendChild(cardDiv);
    cardDiv.classList.add('card');
    cardDiv.innerHTML = `
    <h6 class="title">${object.title}</h6>
    <div class="background shadow bg-black rounded-lg" style="background-image: url(&quot;${object.imagelnk}&quot;);
    ">
      <div class=" hover shadow bg-black rounded-lg">
        <span>${genreSpan}</span>
        <span>Rating: ${object.rating}</span>
        <p>${object.description}</p>
        <a href=${object.trailerlnk} target="_blank " id="${object.id}trailer" class="trailers ">Watch Trailer</a>
        <div class="buton btn-group" role="group" aria-label="Button group with nested dropdown">
  <button type="button" class="edit btn btn-secondary" data-toggle="modal" data-target="#staticBackdrop" onClick= "getEditId(event)" id=${localStorage.getItem('index')}>Edit</button>
  <button type="button" class="btn btn-secondary" onClick=${localStorage.getItem('index')}>Del</button>

  <div class="btn-group" role="group">
    <button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Download
    </button>
    <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
      <a class="dropdown-item" href=${object.downloadLq}>Low Quality</a>
      <a class="dropdown-item" href=${object.downloadHq}>High Quality</a>
      <a class="dropdown-item" href=${object.watchlnk}>Watch</a>

    </div>
  </div>
</div>
      </div>
    </div>
  </div>`

}


const renderElementgroup = (group) => {
    if (group === "all") {
        let allData = JSON.parse(localStorage.getItem("database"));
        clearRenderedMovies();
        // allData.map(item => renderElement(item));
        for (let a = allData.length - 1; a > -1; a--) {
            localStorage.setItem('index', a);
            renderElement(allData[a]);
        }
    } else if (group == 'action' || 'adventure' || 'horror' || 'drama' || 'crime' || 'mystery' || 'sci-fi' || 'comedy' || 'fantasy' || 'thriller' || 'history' || 'family' || 'animation') {
        let allData = JSON.parse(localStorage.getItem("database"));
        clearRenderedMovies();
        for (let b = allData.length - 1; b > -1; b--) {
            for (let c = 0; c < allData.length; c++) {
                if (group == allData[b].genre[c]) {
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
        watchlnk: watchlinkinput.value,
        downloadLq: downloadLqInput.value,
        downloadHq: downloadHqInput.value,
        watched: false,
        id: createNewId()
    });
    localStorage.setItem("database", JSON.stringify(data));
}

const populateEditFormReturnIndex = (editId) => {
    let data = JSON.parse(localStorage.getItem("database"));
    for (let j = 0; j < data.length; j++) {
        if (data[j].id === editId) {
            titleInput.value = data[j].title;
            ratingInput.value = data[j].rating;
            descriptionInput.value = data[j].description;
            imageLinkInput.value = data[j].imagelnk;
            trailerLinkInput.value = data[j].trailerlnk;
            downloadLqInput.value = data[j].downloadLq;
            downloadHqInput.value = data[j].downloadHq;
        }
    }
}
const postEdittedData = (editId) => {
    let data = JSON.parse(localStorage.getItem("database"));
    for (let j = 0; j < data.length; j++) {
        if (data[j].id === editId) {
            data[j].title = titleInput.value;
            data[j].rating = ratingInput.value;
            data[j].description = descriptionInput.value;
            data[j].imagelnk = imageLinkInput.value;
            data[j].trailerlnk = trailerLinkInput.value;
            data[j].downloadLq = downloadLqInput.value;
            data[j].downloadHq = downloadHqInput.value;
            data[j].genre = getCheckBoxArray();
        }
    }
    localStorage.setItem("database", JSON.stringify(data));
}



const clearInputValues = () => {
    titleInput.value = '';
    uncheckCheckedInput();
    ratingInput.value = '';
    descriptionInput.value = '';
    imageLinkInput.value = '';
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
// logDatabasetoConsole();

