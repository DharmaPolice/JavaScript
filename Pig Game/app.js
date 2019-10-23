/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, lastDice, lastDice2, gamePlaying;

init();
    
//En la zona de llamar la funcion también se puede declarar la función directamente pero será anónima(no se podrá volver a llamar)
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        //1. Random number
        var dice = Math.floor(Math.random() * 6) + 1; // Valores del dado entre 1 y 6
        var dice2 = Math.floor(Math.random() * 6) + 1;
        
        if ((dice === lastDice && dice === 6)||(dice2 === lastDice2 && dice2 === 6)){
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        } else{
            //2. Mostrar el resultado
            var diceDOM = document.querySelector('.dice');
            var dice2DOM = document.querySelector('.dice2');
            
            diceDOM.style.display = 'block'; //block = para mostrarlo
            dice2DOM.style.display = 'block';
            
            diceDOM.src = 'dice-' + dice + '.png'; //src para la imagen
            dice2DOM.src = 'dice-' + dice2 + '.png'; 

            //3. Actualizar el round scor ero solo si el resultado no es 1 ya que cambiamos de turno borrando el roundscore
            if (dice !== 1 && dice2 !== 1){
                // Añadir puntos
                lastDice = dice;
                lastDice2 = dice2;
                roundScore += (dice+dice2);
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            } else{
                //Cambio turno
               nextPlayer();
            }
        }

    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying){
        // Añadir la puntuación de la ronda al global
        scores[activePlayer] += roundScore;
        var input = document.querySelector('.final-score').value;
        
        if(input){
            var finalScore = input;
        } else{
            finalScore = 100;
        }
        
        //Actualizar la UI
        document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

        //Comprobar si ha ganado el juego
        if (scores[activePlayer] >= finalScore){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else{
            nextPlayer();
        }
    }
});


function nextPlayer(){
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //Ternary operation (if de condición simple)
        roundScore = 0;
        lastDice = 0;
        lastDice2 = 0;
        document.getElementById('current-0').textContent = '0'
        document.getElementById('current-1').textContent = '0'
        
        //Añadimos y quitamos la clase activa que marca que jugador tiene el turno.
        
        //document.querySelector('.player-0-panel').classList.remove('active');
        //document.querySelector('.player-1-panel').classList.add('active');
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        //ocultamos el dado
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice2').style.display = 'none';

}

document.querySelector('.btn-new').addEventListener('click', init); //llamamos a init a través del evento

function init(){
    scores = [0,0]; // puntuciones totales
    roundScore = 0; // puntuación de la ronda
    activePlayer = 0; // 0 = first player y 1 = second player
    lastDice = 0;
    gamePlaying = true; // Inicializamos el juego
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    //Ponemos a 0 todos los valores de las puntuaciones // usamos el getElementById (solo para ids) // también se puede usar el queryselector
    document.getElementById('score-0').textContent = '0'
    document.getElementById('score-1').textContent = '0'
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
    //Nombre de los players
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    //Active class
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

/******************************************* 
Comentarios con teoría
*******************************************/

//document.querySelector('#current-' + activePlayer).textContent = dice; //Selecciona elementos del html // Se utiliza # para el id del elemento html // El textcontent modifica el texto del elemento HTML // Setter

//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'; // el inner lo que hace es modificar el propio elemento HTML // Setter

//var x = document.querySelector('#score-0').textContent; // leemos el texto contenido en un campo HTML // Getter

//Event handler --> https://developer.mozilla.org/es/docs/Web/events

//document.querySelector('.btn-roll').addEventListener('click', btn); //la función que llamamos no se le pone parentesis ya que la llama el eventlistener y no llamamos nosotros directamnente. 
















