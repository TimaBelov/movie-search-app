const params = new URLSearchParams(location.search);
const filmID = params.get("id");

fetch(`http://www.omdbapi.com/?apikey=5ccaa56f&i=${filmID}`)
  .then((response) => {
    if (response.ok) {
        return response.json();
      }
      console.log("Ошибка загрузки");
  })
  .then((response) => {
    console.log(response);
  });
