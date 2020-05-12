"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = require("readline");
const Juego_1 = require("./Juego");
const rl = readline_1.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const jueguito = new Juego_1.default();
function play() {
    rl.question(`Turno ${jueguito.getTurno()}:`, function (pinos) {
        jueguito.tirar(parseInt(pinos));
        if (!jueguito.getGameEnded()) {
            play();
        }
        else {
            console.log(`Juego terminado. Puntuación final: ${jueguito.score()}`);
            rl.close();
        }
    });
}
play();
//# sourceMappingURL=index.js.map