import Juego from '../src/Juego';

test('Ningún pino', () => {
  const jueguito = new Juego();
  for (let i = 0; i < 20; i++) {
    jueguito.tirar(0);
  }
  expect(jueguito.score()).toBe(0);
  expect(jueguito.getTurno()).toBe(10);
  expect(jueguito.getGameEnded()).toBe(true);
});

test('Todos strikes', () => {
  const jueguito = new Juego();
  for (let i = 0; i < 12; i++) {
    jueguito.tirar(10);
  }
  expect(jueguito.score()).toBe(300);
  expect(jueguito.getTurno()).toBe(10);
  expect(jueguito.getGameEnded()).toBe(true);
});

test('Todos spares', () => {
  const jueguito = new Juego();
  for (let i = 0; i < 21; i++) {
    jueguito.tirar(i % 2 == 0 ? 0 : 10);
  }
  expect(jueguito.score()).toBe(100);
  expect(jueguito.getTurno()).toBe(10);
  expect(jueguito.getGameEnded()).toBe(true);
});

test('Patrón 10 0 0', () => {
  const jueguito = new Juego();
  for (let i = 0; i < 21; i++) {
    jueguito.tirar(i % 3 === 0 ? 10 : 0);
  }
  expect(jueguito.score()).toBe(50);
  expect(jueguito.getTurno()).toBe(10);
  expect(jueguito.getGameEnded()).toBe(true);
});
