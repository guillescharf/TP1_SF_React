const buttonNext = document.querySelector(".buttonNext");
const buttonBck = document.querySelector(".buttonBack");
const searcher = document.querySelector("#searcher");
const modal = document.querySelector(".characterSelected_container");

let counter = 1;

buttonNext.addEventListener("click", async () => {
  counter = ++counter;

  // hago las peticiones y espero la respuesta y muestro el resultado llamando a la funcion showme
  const data = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${counter}`
  );
  const res = await data.json();

  checkPagination(counter, res.info.pages);
  showmeData(res.results);
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
  showmeData(res.results);
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
    let filterName = data.filter((character) =>
      character.name.includes(
        e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
      )
    );
    showmeData(filterName);
  });
};

const getCharacter = (data) => {
  const character = document.querySelectorAll(
    ".mainContainer_character__contenido"
  );
  character.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.add("modal--show");

      const selectedCharacter = data.filter(
        (character) =>
          character.id === parseInt(e.target.parentElement.parentNode.id)
      );
      showCharacterSelected(selectedCharacter);
    });
  });
};
showCharacterSelected = (data) => {
  let body = ``;
  data.map(
    (item) =>
      (body += `
 
      <div class="characterSelected_container_modal" id =${item.id}>
      <img src =${item.image} >  
      <h3 class ="mainContainer_character__contenido_status ${
        item.status === "Alive"
          ? "characterAlive"
          : item.status === "unknown"
          ? "characterUnknown"
          : "characterDead"
      }" >${item.status}</h3>
      <div class="mainContainer_character__contenido_data">
        <h1 >${item.name}</h1>
        <h3>${item.location.name}</h3>
      </div>
 
      </div>
      <div class="buttonModal"> <button class="buttonBack" id="buttonModal"  type="button">Close</button> </div>
   
   
       </div>`)
  );
  
  modal.innerHTML = body;

  closeModal()
};

const closeModal =()=>{
  const btnCloseModal = document.querySelector("#buttonModal")

  btnCloseModal.addEventListener('click',(e)=>{
    e.preventDefault()
    modal.classList.remove('modal--show')

  })
}
