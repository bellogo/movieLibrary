const axios = require('axios');

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
};

const editWatchedBoolean = (editIndex) => {
    let data = JSON.parse(localStorage.getItem('database'));
    if (data.watched === false) {
        data.watched = true;
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
      <div class="background shadow bg-black rounded-lg" style="background-image: url(&quot;${allData[index].imgLink}&quot;);
      ">
        <div class=" hover shadow bg-black rounded-lg">
          <span class="genre">${genreSpan}</span>
          <span class="rating">Rating: ${allData[index].rating}</span>
          <p>${allData[index].description}</p>
          <a href=${allData[index].trailerLink} target="_blank" id="${allData[index].id}trailer" class="trailers ">Watch Trailer</a>
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
      <a class="dropdown-item links" name=${index} target="_blank" href=${allData[index].watchLink} data-toggle="modal" data-target="#watchmodal" onClick="
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


const renderElementgroup = async (group) => {
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
        const { data } = await axios.get("https://netflix-skinny-double.herokuapp.com/api/v1/movies");
        if(data.status === "success") {
            clearRenderedMovies();
            for (let a = data.data.length - 1; a > -1; a--) {
                renderThisElement(data.data, a);
            }
            localStorage.setItem("database", JSON.stringify(data.data));
        }else{
            alert(`${data.message}`);
        }
   
    }
};

const getCheckBoxArray = () => {
    let genreList = [];
    for (let i = 0; i < allCheckBoxes.length; i++) {
        if (allCheckBoxes[i].checked === true) {
            genreList.push(allCheckBoxes[i].value);
        }
    }
    return genreList;
}

const createNewMovie = async () => {
    const checkBox = getCheckBoxArray();
    let serverResponse;
        let object = {};
    
        if(titleInput.value !== ''){
            object.title = titleInput.value;
        }
        if(checkBox.length !== 0){
            object.genre = checkBox;
        }if(ratingInput.value !== ''){
            object.rating = ratingInput.value;
        }if(descriptionInput.value !== ''){
            object.description = descriptionInput.value;
        }
        if(imageLinkInput.value !== ''){
            object.imgLink = imageLinkInput.value;
        }
        if(trailerLinkInput.value !== ''){
            object.trailerLink = trailerLinkInput.value;
        }
        if(watchLinkInput.value !== ''){
            object.watchLink = watchLinkInput.value;
        }
        if(downloadLqInput.value !== ''){
            object.description = downloadLqInput.value;
        }
        if(downloadHqInput.value !== ''){
            object.downloadHq = downloadHqInput.value;
        }
        
        await axios.post('https://netflix-skinny-double.herokuapp.com/api/v1/movie', object).then(res => {
        serverResponse = res.data;
        }).catch(err => {
        serverResponse = err.response.data;
    });
    return serverResponse;
};

const populateEditForm = (editIndex) => {
    let data = JSON.parse(localStorage.getItem("database"));
    titleInput.value = data[editIndex].title;
    ratingInput.value = data[editIndex].rating;
    descriptionInput.value = data[editIndex].description;
    imageLinkInput.value = data[editIndex].imgLink;
    watchLinkInput.value = data[editIndex].watchLink;
    trailerLinkInput.value = data[editIndex].trailerLink;
    downloadLqInput.value = data[editIndex].downloadLq;
    downloadHqInput.value = data[editIndex].downloadHq;
};
const postEdittedData = async (editIndex) => {
    let response;
    const movie = JSON.parse(localStorage.getItem("database"))[editIndex];
    let data = {};
    if(movie.title !== titleInput.value){
        data.title = titleInput.value;
    }
    data.rating = ratingInput.value;
    data.description = descriptionInput.value;
    data.imgLink = imageLinkInput.value;
    data.trailerLink = trailerLinkInput.value;
    data.watchLink = watchLinkInput.value;
    data.downloadLq = downloadLqInput.value;
    data.downloadHq = downloadHqInput.value;

    if (getCheckBoxArray().length > 0) {
        data.genre = getCheckBoxArray();
    }
    await axios.patch(`https://netflix-skinny-double.herokuapp.com/api/v1/movie/${movie._id}`, data).then(res => {
        response = res.data;
        }).catch(err => {
        response = err.response.data;
    });
    return response;
};

const deleteMovie = async (event) => {
    let response;
    let index = parseInt(event.target.name, 10);
    let data = JSON.parse(localStorage.getItem('database'));
    await axios.delete(`https://netflix-skinny-double.herokuapp.com/api/v1/movie/${data[index]._id}`).then(res => {
        response = res.data;
        }).catch(err => {
        response = err.response.data;
    });
    return response;
};

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
    clearRenderedMovies,
    deleteMovie
};