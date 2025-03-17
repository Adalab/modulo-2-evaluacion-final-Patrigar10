"use strict";

const searchInput = document.querySelector(".js-search-input");
const searchBtn = document.querySelector(".js-search-btn");
const searchList = document.querySelector(".js-search-list");
let animes = [];
let allFavourites = JSON.parse(localStorage.getItem("favouritesKey")) || [];
const favouritesList = document.querySelector(".js-favourites-list");
let renderFavouritesMovies = "";

/*
BUSCADOR
- Seleccionar el input, el botón y la ul
- Cuando la usuaria haga click en buscar:
    - recoger el valor del input
    - hacer la petición al servidor
    - generar un enlace dinámico que incluya el valor de la búsqueda
    - recorrer los objetos del array
    - pintar aquello que nos interese de cada objeto
*/

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
    liElement2.setAttribute("class", "favs_movie js-movie results-title");
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
};

if (allFavourites !== []) {
  renderFavouritesMovies(allFavourites);
}

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
    });
};

//Evento botón search

searchBtn.addEventListener("click", handleSearch);

/*FAVORITAS
        Dentro del fecht para que se ejecute cuando hemos obtenido respuesta de la petición y del bucle porque es donde existen las películas
        - Seleccionar todas las películas
        - Recorrer el array de películas para poder hacer sobre cada una el evento
        - Cuando la usuaria haga click sobre cualquiera de ellas
            - añadir clases
            - recoger el id de las películas seleccionadas
            - guardar el nuevo array con las películas favoritas    
            - cambiar el color de fondo y el de la fuente        
            - pintar la nueva lista    
 */
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

// Borrar favoritos
/*
Cuando la usuaria pulse el botón
 - se eliminará del array

*/
