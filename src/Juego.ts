const cantidadTurnos = 10;

class Tirada {
  constructor(esTurnoFinal) {
    this.esTurnoFinal = esTurnoFinal;
  }
  private esTurnoFinal: boolean;
  private pinos = [];
  public tirar(nPinos: number): void {
    if (this.puedeTirar()) {
      this.pinos.push(nPinos);
    }
  }
  public puedeTirar(): boolean {
    //Primera tirada
    if (this.pinos[0] === undefined) return true;

    //Segunda tirada
    if (!this.esStrike() && this.pinos[1] === undefined) return true;
    if (this.esTurnoFinal && this.esStrike() && this.pinos[1] === undefined)
      return true;

    //Tercera tirada
    if (
      this.esTurnoFinal &&
      (this.esSpare() || this.esStrike()) &&
      this.pinos[2] === undefined
    )
      return true;

    return false;
  }
  public esStrike(): boolean {
    return this.pinos[0] === 10;
  }
  public esSpare(): boolean {
    return this.pinos[0] + this.pinos[1] === 10;
  }
  public getPinos() {
    return [...this.pinos];
  }
  public getPuntos(
    turno2: Tirada | undefined,
    turno3: Tirada | undefined,
  ): number {
    const suma = ar => ar.reduce((val, acum) => val + acum, 0);
    let base = suma(this.pinos);

    if (this.esTurnoFinal) return base;

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
  private tiradas: Tirada[];
  private turno = 0;
  private gameEnded = false;
  constructor() {
    this.tiradas = [];
    for (let i = 0; i < cantidadTurnos; i++) {
      this.tiradas.push(new Tirada(i === cantidadTurnos - 1));
    }
  }
  public tirar(pinos: number): void {
    this.tiradas[this.turno].tirar(pinos);
    if (!this.tiradas[this.turno].puedeTirar()) {
      if (this.tiradas[this.turno + 1]) {
        this.turno++;
      } else this.gameEnded = true;
    }
  }
  public getTurno() {
    return this.turno + 1;
  }
  public getGameEnded() {
    return this.gameEnded;
  }
  public score() {
    let acum = 0;
    this.tiradas.forEach((tirada, index) => {
      acum += tirada.getPuntos(
        this.tiradas[index + 1],
        this.tiradas[index + 2],
      );
    });
    return acum;
  }
}

export default Juego;
