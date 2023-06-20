const params = new URLSearchParams(location.search);
const filmID = params.get("id");

const filmCardNode = document.querySelector(".js-film-card");

const renderFilmCard = (filmInfo) => {
  filmCardNode.innerHTML = `
    <div class="col">
        <img class="fim_card__img" src=${filmInfo.Poster}>
    </div>
    <div class="col">
        <p class="film__title>${filmInfo.Title}</p>
        <p class="film__year>Год:<span>${filmInfo.Year}</span></p>
        <p class="film__rating>Рейтинг:<span>${filmInfo.imdbRating}</span></p>
        <p class="film__released>Дата выхода:<span>${filmInfo.Released}</span></p>
        <p class="film__runtime>Продолжительность:<span>${filmInfo.Runtime}</span></p>
        <p class="film__genre>Жанр:<span>${filmInfo.Genre}</span></p>
        <p class="film__director>Режиссер:<span>${filmInfo.Director}</span></p>
        <p class="film__writer>Сценарий:<span>${filmInfo.Writer}</span></p>
        <p class="film__actors>Актеры:<span>${filmInfo.Actors}</span></p>
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
