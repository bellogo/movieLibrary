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
const main = document.getElementById('movies');
const searchinput = document.getElementById('searchinput');

// FUNCTIONS

const clearRenderedMovies = () => {
    main.innerHTML = '';
}

const editWatchedBoolean = (editIndex) => {
    let data = JSON.parse(localStorage.getItem('database'));
    if (data[editIndex].watched === false) {
        data[editIndex].watched = true;
        localStorage.setItem('database', JSON.stringify(data));
    }
}


const renderThisElement = (allData, index) => {
    let genreSpan = '';
    let cardDiv = document.createElement('div');
    for (let i = 0; i < allData[index].genre.length; i++) {
        if (i === allData[index].genre.length - 1) {
            genreSpan += `${allData[index].genre[i]}`
        } else {
            genreSpan = `${allData[index].genre[i]}, `
        }
    }
    main.appendChild(cardDiv);
    cardDiv.classList.add('card');
    cardDiv.innerHTML = `
      <h6 class="title">${allData[index].title}</h6>
      <div class="background shadow bg-black rounded-lg" style="background-image: url(&quot;${allData[index].imagelnk}&quot;);
      ">
        <div class=" hover shadow bg-black rounded-lg">
          <span class="genre">${genreSpan}</span>
          <span class="rating">Rating: ${allData[index].rating}</span>
          <p>${allData[index].description}</p>
          <a href=${allData[index].trailerlnk} target="_blank" id="${allData[index].id}trailer" class="trailers ">Watch Trailer</a>
          <div id="buttons" class="buton btn-group" role="group" aria-label="Button group with nested dropdown">
    <button name=${index} type="button" class="edit btn btn-secondary" data-toggle="modal" data-target="#staticBackdrop" onClick= "
    const MovieFormModal = document.getElementById('staticBackdrop');
    MovieFormModal.setAttribute('data-arg', event.target.name);

    ">Edit</button>
    <button name=${index} type="button" class="delete btn btn-secondary" data-toggle="modal" data-target="#exampleModal" onClick="
    deletebtn.setAttribute('name', event.target.name);
    ">Delete</button>
  
    <div class="btn-group" role="group">
      <button id="btnGroupDrop1" type="button" title="Watch & Download Links" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Links
      </button>
      <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
      <a class="dropdown-item links" name=${index} target="_blank" href=${allData[index].watchlnk} data-toggle="modal" data-target="#watchmodal" onClick="
      watchbtn.setAttribute('data-ind', event.target.name);
      watchbtn.setAttribute('data-href', event.target.href);
      
      ">Watch</a>

        <a class="dropdown-item links" target="_blank" href=${allData[index].downloadLq}>Download LQ</a>
        <a class="dropdown-item links" target="_blank" href=${allData[index].downloadHq}>Download HQ</a>
  
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

const createNewMovie = () => {
    let data = JSON.parse(localStorage.getItem("database"));
    let movieId = parseInt(localStorage.getItem("id"), 10);
    movieId++;
    localStorage.setItem("id", movieId);
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
        id: movieId
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

const checkForSearchInput = () => {
    let val = searchinput.value;
    let data = JSON.parse(localStorage.getItem('database'));
    const testRegex = new RegExp(val, "gi");
    for (let h = data.length - 1; h > -1; h--) {
        if (testRegex.test(data[h].title) === true) {
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
}


const clearInputValues = () => {
    titleInput.value = '';
    ratingInput.value = '';
    descriptionInput.value = '';
    imageLinkInput.value = '';
    watchLinkInput.value = '';
    trailerLinkInput.value = '';
    downloadLqInput.value = '';
    downloadHqInput.value = '';
    for (let i = 0; i < allCheckBoxes.length; i++) {
        if (allCheckBoxes[i].checked === true) {
            allCheckBoxes[i].checked = false;
        }
    }
}

const emptyCategoryRedirect = () => {
    if (main.childElementCount === 0) {
        let r = confirm('There are No Movies in this category\nClick OK to view All Movies\nor cancel and choose another category');
        if (r === true) {
            renderElementgroup('all');
        }
    }
}


export {
    emptyCategoryRedirect,
    createNewMovie,
    clearInputValues,
    renderElementgroup,
    editWatchedBoolean,
    populateEditForm,
    checkForSearchInput,
    postEdittedData,
    clearRenderedMovies
};