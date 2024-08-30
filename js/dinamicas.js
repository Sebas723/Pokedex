const cardList = document.querySelector("#cardList");
let URL = "https://pokeapi.co/api/v2/pokemon/";
const navButtonSelected = document.querySelectorAll(".btn-header");


for (let i = 1; i <= 151; i++) {
  fetch(URL + i)
    .then((response) => response.json())
    .then((data) => listarPokemons(data));
}

function listarPokemons(data) {

    let types = data.types.map(type => 
        `
        <p class="${type.type.name} rounded">${type.type.name}</p>

        `);
    types = types.join('');

    let dataId = data.id.toString();

    if(dataId.length == 1){
        dataId = "00" + dataId;
    }
    
    if (dataId.length == 2){
        dataId = "0" + dataId;
    }


  const div = document.createElement('div');
  div.classList.add('card');
  div.innerHTML = `
            <p class="text-back"></p>
            <div class="card-img">
                <img src="${data.sprites.other["official-artwork"].front_default}" alt="" height="180px" width="180px">
            </div>
            <div class="card-info">
                <p class="white card-id rounded">#${dataId}</p>
                <h2 class="card-name">${data.name}</h2>
            </div>
            <div class="card-type">
                ${types}
            </div>
            <div class="card-statistics">
                <p class="white rounded">${data.height}M</p>
                <p class="white rounded">${data.weight}KG</p>
            </div>
            `;
    cardList.append(div);
}

navButtonSelected.forEach(boton => boton.addEventListener("click", (event) =>{
    const botonId = event.currentTarget.id;

    cardList.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
          .then((response) => response.json())
          .then(data => {
            const tipos = data.types.map(type => type.type.name);

            if(botonId === "ver-todos"){
                listarPokemons(data);
            }

            if (tipos.some(tipo => tipo.includes(botonId))){
                listarPokemons(data);
            }
          });
      }
}))
