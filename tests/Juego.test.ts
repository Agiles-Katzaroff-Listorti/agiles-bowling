import Juego from "../src/Juego"
const jueguito = new Juego();

test("The loser loses", () => {
  for (let i = 0; i < 20; i++) {
    jueguito.tirar(0);
  }
  expect(jueguito.score()).toBe(0);
});

test("The winner winss", () => {
  for (let i = 0; i < 12; i++) {
    jueguito.tirar(10);
  }
  expect(jueguito.score()).toBe(300);
});
