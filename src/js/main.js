"use strict";

const searchInput = document.querySelector(".js-search-input");
const searchBtn = document.querySelector(".js-search-btn");
const searchList = document.querySelector(".js-search-list");
let animes = [];
let allFavourites = JSON.parse(localStorage.getItem("favouritesKey")) || [];
const favouritesList = document.querySelector(".js-favourites-list");
let renderFavouritesMovies = "";
const resetBtn = document.querySelector(".js-reset-btn");
const resultsMessage = document.querySelector(".js-message");

// //Función para borrar
const handleDelete = (event) => {
  const idToDelete = parseInt(event.currentTarget.id);
  const selectedFav = allFavourites.findIndex((favourite) => {
    return favourite.mal_id === idToDelete;
  });
  console.log(selectedFav);
  console.log(allFavourites);
  const deleteIndex = allFavourites.splice(selectedFav, 1);
  const remainingFavs = localStorage.setItem(
    "favouritesKey",
    JSON.stringify(allFavourites)
  );
  renderFavouritesMovies(allFavourites);
};

//Función pintar películas buscadas
const renderSearchMovies = (objects) => {
  for (const object of objects) {
    const liElement = document.createElement("li");
    liElement.setAttribute("class", "results_movie js-movie");
    liElement.setAttribute("id", object.mal_id);
    searchList.appendChild(liElement);
    const imgElement = document.createElement("img");
    imgElement.setAttribute("class", "results_movie_img");

    if (object.url === "https://myanimelist.net/anime/38876/UFO") {
      imgElement.setAttribute(
        "src",
        "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
      );
    } else {
      imgElement.setAttribute("src", object.images.jpg.image_url);
    }
    imgElement.setAttribute("alt", object.titles[0].title);
    liElement.appendChild(imgElement);
    const h3Element = document.createElement("h3");
    h3Element.setAttribute("class", "results_movie_title");
    liElement.appendChild(h3Element);
    const h3Content = document.createTextNode(object.titles[0].title);
    h3Element.appendChild(h3Content);

    const movies = document.querySelectorAll(".js-movie");
    for (const movie of movies) {
      //EVENTO FAVOURITES
      movie.addEventListener("click", handleFavs);
    }
  }
};

//Función pintar películas favoritas
renderFavouritesMovies = (objects) => {
  favouritesList.innerHTML = "";
  for (const object of objects) {
    const liElement2 = document.createElement("li");
    liElement2.setAttribute("class", "favs_movie js-fav results-title");
    liElement2.setAttribute("id", object.mal_id);
    favouritesList.appendChild(liElement2);
    const imgElement = document.createElement("img");
    imgElement.setAttribute("class", "favs_movie_img");

    if (object.url === "https://myanimelist.net/anime/38876/UFO") {
      imgElement.setAttribute(
        "src",
        "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
      );
    } else {
      imgElement.setAttribute("src", object.images.jpg.image_url);
    }
    imgElement.setAttribute("alt", object.titles[0].title);
    liElement2.appendChild(imgElement);
    const h3Element = document.createElement("h3");
    h3Element.setAttribute("class", "favs_movie_title");
    liElement2.appendChild(h3Element);
    const h3Content = document.createTextNode(object.titles[0].title);
    h3Element.appendChild(h3Content);
    const deleteIcon = document.createElement("i");
    deleteIcon.setAttribute(
      "class",
      "fa-solid fa-circle-xmark favs_movie_icon"
    );
    deleteIcon.setAttribute("style", "color: #eca3a3");
    liElement2.appendChild(deleteIcon);
  }
  const favMovies = document.querySelectorAll(".js-fav");
  for (const favMovie of favMovies) {
    //EVENTO FAVOURITES
    favMovie.addEventListener("click", handleDelete);
  }
};

//Pintar favoritas desde el LocalStorage
const savedFavourites = () => {
  if (allFavourites !== []) {
    renderFavouritesMovies(allFavourites);
  }
};

savedFavourites();

// Ejecución evento search
const handleSearch = (event) => {
  event.preventDefault();
  searchList.innerHTML = "";
  const searchValue = searchInput.value;
  fetch(`https://api.jikan.moe/v4/anime?q=${searchValue}`)
    .then((response) => response.json())
    .then((data) => {
      animes = data.data;
      renderSearchMovies(data.data);
      const pContent = document.createTextNode(data.data.length);
      resultsMessage.appendChild(pContent);
    });
};

//Evento botón search

searchBtn.addEventListener("click", handleSearch);

//Función favoritas
const handleFavs = (event) => {
  const idSelectedMovie = parseInt(event.currentTarget.id);

  for (const anime of animes) {
    if (idSelectedMovie === anime.mal_id) {
      event.currentTarget.classList.add("selected-bg");
    }
  }

  //Nuevo array
  const selectedMovie = animes.find((anime) => {
    return idSelectedMovie === anime.mal_id;
  });
  allFavourites.push(selectedMovie);

  //LocalStorage
  localStorage.setItem("favouritesKey", JSON.stringify(allFavourites));
  renderFavouritesMovies(allFavourites);
};

//Evento y función reset

const handleReset = () => {
  searchList.innerHTML = "";
  favouritesList.innerHTML = "";
};

resetBtn.addEventListener("click", handleReset);
