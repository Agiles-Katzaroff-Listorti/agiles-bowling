"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cantidadTurnos = 10;
class Tirada {
    constructor(esTurnoFinal) {
        this.pinos = [];
        this.esTurnoFinal = esTurnoFinal;
    }
    tirar(nPinos) {
        if (this.puedeTirar()) {
            this.pinos.push(nPinos);
        }
    }
    puedeTirar() {
        //Primera tirada
        if (this.pinos[0] === undefined)
            return true;
        //Segunda tirada
        if (!this.esStrike() && this.pinos[1] === undefined)
            return true;
        if (this.esTurnoFinal && this.esStrike() && this.pinos[1] === undefined)
            return true;
        //Tercera tirada
        if (this.esTurnoFinal &&
            (this.esSpare() || this.esStrike()) &&
            this.pinos[2] === undefined)
            return true;
        return false;
    }
    esStrike() {
        return this.pinos[0] === 10;
    }
    esSpare() {
        return this.pinos[0] + this.pinos[1] === 10;
    }
    getPinos() {
        return [...this.pinos];
    }
    getPuntos(turno2, turno3) {
        const suma = ar => ar.reduce((val, acum) => val + acum, 0);
        let base = suma(this.pinos);
        if (this.esTurnoFinal)
            return base;
        if (this.esSpare()) {
            return suma(this.pinos) + turno2.pinos[0];
        }
        if (this.esStrike()) {
            if (turno2.esStrike()) {
                if (turno2.esTurnoFinal) {
                    return base + turno2.getPinos()[0] + turno2.getPinos()[1];
                }
                return base + turno2.getPinos()[0] + turno3.getPinos()[0];
            }
            return base + suma(turno2.getPinos().slice(0, 2));
        }
        return this.pinos[0] + this.pinos[1];
    }
}
class Juego {
    constructor() {
        this.turno = 0;
        this.gameEnded = false;
        this.tiradas = [];
        for (let i = 0; i < cantidadTurnos; i++) {
            this.tiradas.push(new Tirada(i === cantidadTurnos - 1));
        }
    }
    tirar(pinos) {
        this.tiradas[this.turno].tirar(pinos);
        if (!this.tiradas[this.turno].puedeTirar()) {
            if (this.tiradas[this.turno + 1]) {
                this.turno++;
            }
            else
                this.gameEnded = true;
        }
    }
    getTurno() {
        return this.turno + 1;
    }
    getGameEnded() {
        return this.gameEnded;
    }
    score() {
        let acum = 0;
        this.tiradas.forEach((tirada, index) => {
            acum += tirada.getPuntos(this.tiradas[index + 1], this.tiradas[index + 2]);
        });
        return acum;
    }
}
exports.default = Juego;
//# sourceMappingURL=Juego.js.map