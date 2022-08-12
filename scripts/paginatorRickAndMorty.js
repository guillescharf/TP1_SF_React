const buttons = document.querySelectorAll('.button button')
const buttonNext = document.querySelector('.buttonNext')
const buttonBck = document.querySelector('.buttonBack')
let counter = 1


buttonNext.addEventListener('click', async ()=>{
counter++
// hago las peticiones y espero la respuesta y muestro el resultado llamando a la funcion showme 
 const data = await fetch(`https://rickandmortyapi.com/api/character/?page=${++counter}`) 
 const res = await data.json()
showmeData(res)
})

buttonBck.addEventListener('click', async ()=>{
    counter--
     const data = await fetch(`https://rickandmortyapi.com/api/character/?page=${--counter}`) 
     const res = await data.json()
     // muestro la info nueva 
    showmeData(res)
})


