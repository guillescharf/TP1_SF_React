const buttonNext = document.querySelector(".buttonNext");
const buttonBck = document.querySelector(".buttonBack");
const searcher = document.querySelector("#searcher");

let counter = 1;

buttonNext.addEventListener("click", async () => {
  counter = ++counter;

  // hago las peticiones y espero la respuesta y muestro el resultado llamando a la funcion showme
  const data = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${counter}`
  );
  const res = await data.json();

  checkPagination(counter, res.info.pages);
  showmeData(res, counter);
});

buttonBck.addEventListener("click", async () => {
  counter = --counter;

  const data = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${counter}`
  );
  const res = await data.json();
  // controlo que el usuario no rompa la paginacion
  checkPagination(counter, res.info.pages);
  // muestro la info nueva
  showmeData(res);
});

const checkPagination = (counter, pages) => {
  if (counter == pages) {
    buttonNext.classList.remove("buttonVisible");
    buttonNext.classList.add("buttonHidden");
  } else {
    buttonNext.classList.add("buttonVisible");
    buttonNext.classList.remove("buttonHidden");
  }
};

const searchCharacter = (data) => {
  searcher.addEventListener("keydown", (e) => {
    let filterName = data.filter((character) => console.log(character));
  });
};
