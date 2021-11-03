

const play = document.querySelector('.btn');
console.log(play);

const level = document.querySelector('.form-select');


play.addEventListener('click', function(){
  gioca();
})

function gioca(){
  //creo la griglia in base alla difficoltà scelta
  let difficoltàScelta = parseInt(level.value);
  console.log(difficoltàScelta);
  let dimension;
  let cellPerRiga;

  if (difficoltàScelta === 1){
    dimension = 100;
    cellPerRiga = 10;
  } else if (difficoltàScelta === 2){
    dimension = 81;
    cellPerRiga = 9;
  } else if (difficoltàScelta === 3){
    dimension = 49;
    cellPerRiga = 7;
  }
  console.log('dimensione', dimension);
  console.log('cell per riga', cellPerRiga);

  //devo resettare main altrimenti avrò sia la scritta di default sia le griglie
  document.querySelector('main').innerHTML = '';
  createGrid();

  function createGrid(){
    //creo la griglia
    const griglia = document.createElement('div');
    griglia.className = 'gs-grid';

    //ciclo for per creare tutte le celle
    for (let i = 1; i <= dimension; i++){
      //creo la singola cella
      const cell = document.createElement('div');
      cell.className = 'square';
      cell.innerHTML = `<span>${i}</span>`;

      //aggiungo classi a div a seconda della difficoltà
      if (difficoltàScelta === 1){
        cell.classList.add('square','easy');
      }
      if (difficoltàScelta === 2){
        cell.classList.add('square','hard');
      }
      if (difficoltàScelta === 3){
        cell.classList.add('square','crazy');
      }

      //gestisco comportamento cella al click rimandando alla funzione che ho creato appositamente
      cell.addEventListener('click',handleClickCell);

      //appendo la cella alla griglia
      griglia.append(cell);
    }
    
    //appendo la griglia al main
    document.querySelector('main').append(griglia);
  };


  //funzione del click sulla cella
  function handleClickCell(event){
    console.log('testo della cella',event.target.innerText);
    this.classList.add('clicked');
  }

};