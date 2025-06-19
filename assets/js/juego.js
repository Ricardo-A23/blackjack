/**
 * 2C = Two of clubs
 * 2D = Two of diaminds
 * 2H = Two of Hearts
 * 2S = Two of spades
 */

let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

//referencias HTML
const btnPedirCartas = document.querySelector("#pedir-carta");
const jugador = document.querySelector("#jugador-cartas");
const computadora = document.querySelector("#computadora-cartas");
const btnNuevoJuego = document.querySelector("#nuevo-juego");
const btnDetener = document.querySelector("#detener");
const small2 = document.querySelectorAll("small");
let puntosJugador = 0,
  puntosComputadora = 0;

//esta funcion crea una baraja
const crearDeck = () => {
  for (let i = 2; i < 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (let tipo of tipos) {
    for (let especial of especiales) {
      deck.push(especial + tipo);
    }
  }

  deck = _.shuffle(deck); //devuelve un nuevo array de forma aleatoria

  return deck;
};

crearDeck();

//esta funcion permite tomar una carta
const pedirCarta = () => {
  if (deck.length === 0) {
    throw "No hay mas cartas en el deck";
  }

  let carta = deck.pop();

  return carta;
};

//funcion del valor de la carta

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1); //obtenemos los numeros de las cartas

  return isNaN(valor)
    ? valor === "A"
      ? 11
      : 10 // retorna esto si no es numero
    : valor * 1; //si es un string lo convertimos en numero con la multi - retorna si es un numero
};

//turno computadora
const turnoComputadora = (puntosMinimos) => {
  do {
    const pedir = pedirCarta();
    puntosComputadora += valorCarta(pedir);
    small2[1].innerText = puntosComputadora;

    const imgCarta = document.createElement("img");
    imgCarta.src = `/assets/cartas/${pedir}.png`;
    imgCarta.classList.add("carta");
    computadora.appendChild(imgCarta);
    if (puntosMinimos > 21) {
      break;
    }
  } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

  //determinar ganadores

  setTimeout(() => {
    if (puntosComputadora === puntosJugador) {
      alert("Nadie gana");
    } else if (puntosJugador > 21) {
      alert("La computadora gana");
    } else if (puntosComputadora > 21) {
      alert("Jugador gana");
    } else {
      alert("Computadora gana");
    }
  }, 30);
};

//boton pedir cartas
btnPedirCartas.addEventListener("click", () => {
  const pedir = pedirCarta();
  puntosJugador += valorCarta(pedir);
  small2[0].innerText = puntosJugador;

  let imgCarta = document.createElement("img");
  imgCarta.src = `/assets/cartas/${pedir}.png`;
  imgCarta.classList.add("carta");
  jugador.appendChild(imgCarta);

  if (puntosJugador > 21) {
    btnPedirCartas.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  } else if (puntosJugador === 21) {
    console.log("21, genial");
    btnPedirCartas.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  }
});

// funcion para reiniciar el juego
btnNuevoJuego.addEventListener("click", () => {
  deck = [];
  deck = crearDeck();

  puntosComputadora = 0;
  puntosJugador = 0;
  
  small2[0].innerText = 0;
  small2[1].innerText = 0;

  jugador.innerHTML = "";
  computadora.innerHTML = "";

  btnPedirCartas.disabled = false;
  btnDetener.disabled = false;
});

//evento para detener el juego

btnDetener.addEventListener("click", () => {
  btnPedirCartas.disabled = true;
  btnDetener.disabled = true;
  turnoComputadora(puntosJugador);
});
