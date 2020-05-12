"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JuegoVago {
    constructor() {
        this.diezAcum = 0;
    }
    tirar(pinos) {
        if (pinos === 10) {
            this.diezAcum++;
        }
    }
    score() {
        if (this.diezAcum === 12)
            return 300;
        else
            return 0;
    }
}
exports.default = JuegoVago;
//# sourceMappingURL=JuegoVago.js.map