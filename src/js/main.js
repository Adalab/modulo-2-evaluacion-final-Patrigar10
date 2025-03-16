"use strict";

const searchInput = document.querySelector(".js-search-input");
const searchBtn = document.querySelector(".js-search-btn");
const searchList = document.querySelector(".js-search-list");
let animes = [];
let allFavourites = [];
const favouritesList = document.querySelector(".js-favourites-list");

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

// Ejecución evento search

const handleSearch = (event) => {
  event.preventDefault();
  searchList.innerHTML = "";
  const searchValue = searchInput.value;
  fetch(`https://api.jikan.moe/v4/anime?q=${searchValue}`)
    .then((response) => response.json())
    .then((data) => {
      animes = data.data;

      for (const object of data.data) {
        const liElement = document.createElement("li");
        liElement.setAttribute("class", "movie js-movie");
        liElement.setAttribute("id", object.mal_id);
        searchList.appendChild(liElement);
        const imgElement = document.createElement("img");
        imgElement.setAttribute("class", "movie_img");

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
        h3Element.setAttribute("class", "movie_title");
        liElement.appendChild(h3Element);
        const h3Content = document.createTextNode(object.titles[0].title);
        h3Element.appendChild(h3Content);

        const movies = document.querySelectorAll(".js-movie");
        for (const movie of movies) {
          //EVENTO FAVOURITES
          movie.addEventListener("click", handleFavs);
        }
      }
    });
};

//Evento botón search

searchBtn.addEventListener("click", handleSearch);

/*FAVORITAS
        Dentro del fecht para que se ejecute cuando hemos obtenido respuesta de la petición y del bucle porque es donde existen las películas
        - Seleccionar todas las películas
        - Recorrer el array de películas para poder hacer sobre cada una el evento
        - Cuando la usuaria haga click sobre cualquiera de ellas
            - recoger el id de las películas seleccionadas
            - guardar el nuevo array con las películas favoritas    
            - cambiar el color de fondo y el de la fuente        
            - pintar la nueva lista    
        */
const handleFavs = (event) => {
  const idSelectedMovie = parseInt(event.currentTarget.id);
  const selectedMovie = animes.find((anime) => {
    return idSelectedMovie === anime.mal_id;
  });
  allFavourites += selectedMovie;
  console.log(allFavourites);
};
