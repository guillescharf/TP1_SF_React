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

  checkPagination(res.info.pages);
  showmeData(res.results);
  getCharacter(res.results)
   

});

buttonBck.addEventListener("click", async () => {
  counter = --counter;

  const data = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${counter}`
  );
  const res = await data.json();
  // controlo que el usuario no rompa la paginacion
  checkPagination(res.info.pages);
  // muestro la info nueva
  showmeData(res.results);
  getCharacter(res.results)

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
// buscador de personajes 
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
  const characters = document.querySelectorAll(".mainContainer_character__contenido");
  
  characters.forEach((character) => {
      character.addEventListener("click", (e) => {
        
        const selectedCharacter = data.filter((character) =>
            character.id === parseInt(e.target.parentElement.parentNode.id));
        showCharacterSelected(selectedCharacter);
        modal.classList.add("modal--show");
  
      });
    });
 
  
};
// Funcion que recibe un personaje por parametro y lo muestra en el modal
showCharacterSelected = (data) => {
  let body = ``;
  data.map(
    (item) =>
    (body += `
 
      <div class="characterSelected_container_modal" id =${item.id}>
      <img src =${item.image} >  
      <div class="mainContainer_character__contenido_data">
        <h1 > Name: ${item.name}</h1>
        <h3> Last Location: ${item.location.name}</h3>
        <h3> Species: ${item.species}</h3>
        <h3> Gender: ${item.gender}</h3>
        <h3> Origin:${item.origin.name}</h3>
        <h2> Status: ${item.status}</h2>

      </div>
 
      </div>
      <div class="buttonModal"> <button class="buttonBack" id="buttonModal"  type="button">Close</button> </div>
   
   
       </div>`)
  );


  modal.innerHTML = body;
  
  closeModal()
};
// Funcion para seleccionar un personaje y que te muestre una info mas detallada 


const closeModal = () => {
  const btnCloseModal = document.querySelector("#buttonModal")
if(btnCloseModal){
  btnCloseModal.addEventListener('click', (e) => {
    e.preventDefault()
    modal.classList.remove('modal--show')

  })
}

}
