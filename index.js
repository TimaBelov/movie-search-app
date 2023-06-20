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
    <section class="film_list__item" id=${item.imdbID}>
            <div class="col"><img class="film__img" src=${item.Poster}></div>
            <div class="col">
                <p class="film__title">${item.Title}</p>
                <p class="film__year">${item.Year}</p>
                <p class="film__type">${item.Type}</p>
            </div>
        </a>
    </section>
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
  if (inputNode.value == "" || !inputNode.value.replace(/\s/g, "").length) {
    statusNode.innerHTML = "Нельзя отправить пустой запрос!";
    inputNode.value = "";
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
        localStorage.setItem("films", JSON.stringify(filmsArray));
        console.log(filmsArray);
        addFilmsOnPage();
        changeColorBtn();
      } else {
        addErrorOnPage(response.Error);
      }
    });
};

const exportFilm = (event) => {
  let target = event.target.closest("section");
  window.location.href = `film.html?id=${target.id}`;
};

btnNode.addEventListener("click", getFilm);
filmListNode.addEventListener("click", exportFilm);

const init = () => {
  filmsArray = JSON.parse(localStorage.getItem("films"));
  addFilmsOnPage();
};
init();
