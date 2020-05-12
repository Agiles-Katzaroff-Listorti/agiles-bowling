class JuegoVago {
  private totalPinos = 0;
  private pinosTiroAnterior = 0;
  private tiro = 1;
  private sumaSiguiente = false;
  private wasSpare = false;
  public tirar(pinos: number): void {
    this.totalPinos += this.sumaSiguiente ? pinos * 2 : pinos;
    this.sumaSiguiente = this.sumaSiguiente && !this.wasSpare ? true : false;
    this.wasSpare = false;
    if (this.tiro === 1 && pinos === 10) {
      this.sumaSiguiente = true;
    }
    if (this.tiro === 2) {
      if (this.pinosTiroAnterior + pinos === 10) {
        this.sumaSiguiente = true;
        this.wasSpare = true;
      }
    }
    this.pinosTiroAnterior = pinos;
    this.tiro = pinos !== 10 ? (this.tiro === 1 ? 2 : 1) : 1;
  }
  public score() {
    return this.totalPinos;
  }
}

export default JuegoVago;
