const params = new URLSearchParams(location.search);
const filmID = params.get("id");

const filmCardNode = document.querySelector(".js-film-card");

const renderFilmCard = (filmInfo) => {
  filmCardNode.innerHTML = `
    <div class="film_item">
        <div class="col">
            <img class="film_card__img" src=${filmInfo.Poster}>
        </div>
        <div class="col">
            <p class="film__title">${filmInfo.Title}</p>
            <p class="film__description">Год:<span>${filmInfo.Year}</span></p>
            <p class="film__description">Рейтинг:<span>${filmInfo.imdbRating}</span></p>
            <p class="film__description">Дата выхода:<span>${filmInfo.Released}</span></p>
            <p class="film__description">Продолжительность:<span>${filmInfo.Runtime}</span></p>
            <p class="film__description">Жанр:<span>${filmInfo.Genre}</span></p>
            <p class="film__description">Режиссер:<span>${filmInfo.Director}</span></p>
            <p class="film__description">Сценарий:<span>${filmInfo.Writer}</span></p>
            <p class="film__description">Актеры:<span>${filmInfo.Actors}</span></p>
        </div>
    </div>
    <p class="film__plot">${filmInfo.Plot}</p>
    `;
};

fetch(`http://www.omdbapi.com/?apikey=5ccaa56f&i=${filmID}`)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    console.log("Ошибка загрузки");
  })
  .then((response) => {
    renderFilmCard(response);
  });
