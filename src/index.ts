import { createInterface } from 'readline';
import Juego from './Juego';
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});
const jueguito = new Juego();
function play() {
  rl.question(`Turno ${jueguito.getTurno()}:`, function(pinos) {
    jueguito.tirar(parseInt(pinos));
    if (!jueguito.getGameEnded()) {
      play();
    } else {
      console.log(`Juego terminado. Puntuación final: ${jueguito.score()}`);
      rl.close();
    }
  });
}
play();
