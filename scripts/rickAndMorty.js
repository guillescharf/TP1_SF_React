var url = "https://rickandmortyapi.com/api/character";
const selector = document.querySelector(".mainContainer_character");
console.log(selector);


document.addEventListener('DOMContentLoaded',()=>{
  getData();

})

const getData = async () => {
  try {
    const data = await fetch(url);
    const res = await data.json();
    showmeData(res.results);
    searchCharacter(res.results);
    getCharacter(res.results)

  } catch (error) {
    console.log(error);
  }
};


const showmeData = (data) => {
console.log(data)
  let body = ``;
  data.map(
    (item) =>
    
      (body += `
    <div class="mainContainer_character__contenido" id =${item.id}>
    <div > <img src =${item.image}>  
    <h3 class ="mainContainer_character__contenido_status ${
      item.status === "Alive"
        ? "characterAlive"
        : item.status === "unknown"
        ? "characterUnknown"
        : "characterDead"
    }" >${item.status}</h3>
    </div>
    <div class="mainContainer_character__contenido_data">
     <h1 >${item.name}</h1>
      <h3>${item.location.name}</h3>
  </div>
     </div>`)
  );
  selector.innerHTML = body;





  
};


