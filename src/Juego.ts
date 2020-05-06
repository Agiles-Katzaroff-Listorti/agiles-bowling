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
  public getPuntos(
    turno2: Tirada | undefined,
    turno3: Tirada | undefined,
  ): number {
    //Si es turno final
    if (this.esTurnoFinal) return this.pinos.reduce((val, acum) => val + acum);
    //TODO el resto
  }
}

class Juego {
  private tiradas: Tirada[];
  private turno = 0;
  constructor() {
    this.tiradas = new Array(cantidadTurnos).map((el, i) => {
      if (i === cantidadTurnos - 1) {
        return new Tirada(true);
      } else return new Tirada(false);
    });
  }
  public tirar(pinos: number): void {
    if (this.tiradas[this.turno].puedeTirar()) {
      this.tiradas[this.turno].tirar(pinos);
    } else if (this.turno < cantidadTurnos - 1) {
      this.turno++;
      this.tiradas[this.turno].tirar(pinos);
    }
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
