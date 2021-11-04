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
  const ALLBOMBS = 2;
  let bombs = generateBombs();

  //contatore tentativi validi e variabili tentativi
  let attempts = 0;
  const attemptsList = [];
  const maxAttempts = dimension - ALLBOMBS;

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
   - se è presente, la cella sarà rossa e il gioco termina: end game
   - se non è presente nell'array, la cella sarà azzurra e potrò continuare il gioco: 
      - devo incrementare il conto dei tentativi validi se tentativo non è già stato fatto (devo avere contatore che incrementa a ogni cella blu che attivo) 
      - salvo tutti i tentativi fatti
      - colore cella azzurra
    - se completo le caselle valide: end game
  */

  //funzione del click sulla cella
  function handleClickCell(event){
    console.log('testo della cella', event.target.innerText);
    // bisogna verificare se il testo della cella fa parte o no dell'array bombs
    let numeroCell = parseInt(event.target.innerText);
    console.log('numeroCell', numeroCell);

    if(bombs.includes(numeroCell)){
      console.log('il gioco è finito');
      endGame();
    } else {
      //check se tentativo già fatto
      //se numero cella non è compreso nell'array dei tentativi già fatti
      if (!attemptsList.includes(numeroCell)){
        attempts ++;  //incremento il contatore dei tentativi validi
        attemptsList.push(numeroCell); //aggiungo il tentativo dentro   l'elenco
        this.classList.add('clicked'); //cella azzurra

        //check se ho completato tutte le celle
        if (attempts === maxAttempts){
           console.log('il gioco è finito');
          endGame();
        }
      }
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
    
    //restituisco l'array di bombe
    return bombs;
  }


  //funzione che termina il gioco (sia vittoria sia sconfitta - celle rosse)
  function endGame() {
    console.log('siamo dentro alla funzione endGame');
    /**
     * 1. far colorare tutte le bombe
     * 2. fermare il gioco
     * 3. generare un messaggio di output diverso se vinto o perso
     */

     // 1. prendo tutte le celle: se sono bombe le coloro di rosso
    const allCell = document.getElementsByClassName('square');
    console.log('tutte le celle', allCell);
    
    //ciclo su tutte le celle: se indice cella è incluso nell'array delle bombe, allora aggiungo la classe bomb
    for (let i = 0; i < allCell.length; i++){
       if(bombs.includes(i + 1)){
            allCell[i].classList.add('bomb');
          }
        //2. faccio stoppare il gioco neutralizzando il click
        allCell[i].style.pointerEvents = 'none';
    }
    
    //3. genero messaggio finale
    let msg = '';
    if (attempts === maxAttempts) { //vittoria
      msg = 'complimenti hai vinto il gioco!';
    } else { //sconfitta
      msg = `hai perso. hai fatto ${attempts} tentativi! riprova!`
    }

    // stampo messaggio 
    const output = document.createElement('div');
    output.innerHTML = `<h5 class="p-3">${msg}</h5>`;
    document.querySelector('main').append(output);
    
  }
}

//funzione per numeri random
function generateRandomInt(min, max){
 return Math.floor(Math.random() * (max - min) + min);
}