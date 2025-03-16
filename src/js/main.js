"use strict";

const searchInput = document.querySelector(".js-search-input");
const searchBtn = document.querySelector(".js-search-btn");
const searchList = document.querySelector(".js-search-list");
let movies = [];

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

//Función evento search

const handleSearch = (event) => {
  event.preventDefault();
  searchList.innerHTML = "";
  const searchValue = searchInput.value;
  //   console.log(searchValue);
  fetch(`https://api.jikan.moe/v4/anime?q=${searchValue}`)
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data);
      //   console.log(data.data);
      for (const object of data.data) {
        console.log(object);
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
        movies = document.querySelectorAll(".js-movie");
        console.log(movies);
        // console.log(movies);

        for (const movie of movies) {
          //Función añadir favoritas

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
  const idSelectedMovie = event.currentTarget.id;
  //   const favouritesArray = movies.find((movie) => {
  //     return idSelectedMovie === movie.id;
  //   });
};
