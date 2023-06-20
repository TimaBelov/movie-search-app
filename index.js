const inputNode = document.querySelector(".js-input");
const btnNode = document.querySelector(".js-btn");
const filmListNode = document.querySelector(".js-film-list");
const statusNode = document.querySelector(".js-text-under-input");

const BTN_FILM_FIND_COLOR_CLASS = "find__btn_find";

let filmsArray;

const addFilmsOnPage = () => {
  html = "";
  filmsArray.forEach((item) => {
    html += `
    <div class="film_list__item">
        <div class="col"><img class="film__img" src=${item.Poster}></div>
        <div class="col">
            <p class="film__title">${item.Title}</p>
            <p class="film__year">${item.Year}</p>
            <p class="film__type">${item.Type}</p>
        </div>
    </div>
    `;
  });
  filmListNode.innerHTML = html;
};

const addErrorOnPage = (error) => {
  filmListNode.innerHTML = `<p class="film__title">${error}</p>`;
};

const changeColorBtn = () => {
  btnNode.classList.add(BTN_FILM_FIND_COLOR_CLASS);
};

const getFilm = () => {
  if (inputNode.value == "") {
    statusNode.innerHTML = "Нельзя отправить пустой запрос!";
    return;
  }

  fetch(`http://www.omdbapi.com/?apikey=5ccaa56f&s=${inputNode.value}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      console.log("Ошибка загрузки");
    })
    .then((response) => {
      if (response.Response === "True") {
        filmsArray = response.Search;
        addFilmsOnPage();
        changeColorBtn();
      } else {
        addErrorOnPage(response.Error);
      }
    });
};

btnNode.addEventListener("click", getFilm);
