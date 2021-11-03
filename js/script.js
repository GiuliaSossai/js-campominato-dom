const play = document.querySelector('.btn');

play.addEventListener('click', function(){
  gioca();
})

function gioca(){
  //creo la griglia in base alla difficoltà scelta
  const level = document.querySelector('.form-select');
  const difficoltàScelta = parseInt(level.value);
  console.log(difficoltàScelta);
  let giocoFinito = false;
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

  /**
   * tutte le bombe sono sempre 16
   * le bombe sono generate in modo random (ogni bomba si identifica col numero della cella)
   * le bombe stanno in un array
  */
  const ALLBOMBS = 16;
  let bombs = generateBombs();

  console.log('array bombe', bombs);
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
  }

  /*ogni volta che clicco su una cella, dovrò confrontare se il numero della cella è presente o meno nell'array delle 16 bombe (ovvero se la cella è una bomba):
   - se è presente, la cella sarà rossa e il gioco termina
   - se non è presente nell'array, la cella sarà azzurra e potrò continuare il gioco
  */

  //funzione del click sulla cella
  function handleClickCell(event){

    if (giocoFinito == false) {

      console.log('testo della cella', event.target.innerText);
      // bisogna verificare se il testo della cella fa parte o no dell'array bombs
      let numeroCell = event.target.innerText;
      console.log('numeroCell', numeroCell);

      //console.log(bombs.indexOf("numeroCell"));

      for (i = 0; i < bombs.length; i++){
        console.log(bombs[i]);

        if(bombs[i] == numeroCell){
          this.classList.add('bomb');
          document.querySelector('main').append(`hai perso! riprova!`);
          endGame();
          giocoFinito = true;
          
        } else {
          this.classList.add('clicked');
        }
      
      }

      // if(bombs.includes(numeroCell)){
      //   this.classList.add('bomb');
      //   console.log('cella bomba', this);
      // } else {
      //   this.classList.add('clicked');
      //   console.log('cella neutrale', this);
      // }

    } else {

        console.log('il gioco è finito. inutile che continui a cliccare');
    }
    
  }

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
      } 
    }
    
    //ottengo l'array di bombe
    return bombs;
  }


  //funzione per far diventare rosse tutte le bombe alla fine del gioco
  function endGame() {
    console.log('siamo dentro alla funzione endGame');

    //selezionare tutte le celle - ottengo un array
    let allCell = document.querySelectorAll('.square');
    console.log('tutte le celle', allCell);
    
    //devo verificare una cella alla volta se è o meno una bomba (per il confronto posso usare il testo contenuto nella cella)- solo a quelle che sono bombe dovrò aggiungere la classe bomb
    //numero cella array allCell vs numero cella array bombs
    // for (let i = 0; i < allCell.length; i++){

    //   if(allCell[i].innerText === bombs[i].event.target.innerText){
    //     allCell[i].classList.add('bomb');
    //   }
    // }
  


  }



}



//funzione per numeri random
function generateRandomInt(min, max){
  return Math.floor(Math.random() * (max - min) + min);
}