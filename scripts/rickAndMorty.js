var url = "https://rickandmortyapi.com/api/character";
const selector = document.querySelector(".mainContainer_character");

const getData = async () => {
  try {
    const data = await fetch(url);
    const res = await data.json();
    showmeData(res);
  } catch (error) {
    console.log(error);
  }
};
getData();

const showmeData = (data) => {

  let body = ``;
  data.results.map(
    (item) =>
    
      (body += `<div class="mainContainer_character__contenido">
    <div > <img  class =mx-40 src =${item.image}>  <h3 class ="mainContainer_character__contenido_status">${item.status}</h3></div>
     <h1 >${item.name}</h1>
      <h3>${item.location.name}</h3>
  
     </div>`)
  );
  selector.innerHTML = body;
};
