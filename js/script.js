const play = document.querySelector('.btn');

play.addEventListener('click', function(){
  gioca();
})

function gioca(){
  //creo la griglia in base alla difficoltà scelta
  const level = document.querySelector('.form-select');
  const difficoltàScelta = parseInt(level.value);
  console.log(difficoltàScelta);
  let dimension;
  let cellPerRiga;

  /**
   * tutte le bombe sono sempre 16
   * le bombe sono generate in modo random (ogni bomba si identifica col numero della cella)
   * le bombe stanno in un array
   */
  const ALLBOMBS = 16;
  let bombs = generateBombs();
  console.log(bombs);

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
    };
    
    //appendo la griglia al main
    document.querySelector('main').append(griglia);
  };

  /*ogni volta che clicco su una cella, dovrò confrontare se il numero della cella è presente o meno nell'array delle 16 bombe (ovvero se la cella è una bomba):
   - se è presente, la cella sarà rossa e il gioco termina
   - se non è presente nell'array, la cella sarà azzurra e potrò continuare il gioco
   */

   //funzione del click sulla cella
  function handleClickCell(event){
    console.log('testo della cella',event.target.innerText);
    this.classList.add('clicked');
  };

  //funzione per generare random le 16 bombe
  function generateBombs(){
    //parto da un array vuoto
    let bombs = [];
    console.log(bombs);
    console.log('ALLBOMBS', ALLBOMBS);
    
    //ciclo while per creare le bombe: solo se numero estratto non è presente allora aggiungo la bomba nell'array
    while(bombs.length < ALLBOMBS){
      const bomb = generateRandomInt(1, dimension);
      if(!bombs.includes(bomb)){
        bombs.push(bomb);
      };  
    };
    
    //ottengo l'array di bombe
    return bombs;
  };

};

//funzione per numeri random
function generateRandomInt(min, max){
  return Math.floor(Math.random() * (max - min) + min);
}