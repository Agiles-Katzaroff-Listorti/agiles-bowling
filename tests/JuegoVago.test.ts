import JuegoVago from '../src/JuegoVago';

test('Ningún pino', () => {
  const jueguito = new JuegoVago();
  for (let i = 0; i < 20; i++) {
    jueguito.tirar(0);
  }
  expect(jueguito.score()).toBe(0);
});

test('Todos strikes', () => {
  const jueguito = new JuegoVago();
  for (let i = 0; i < 12; i++) {
    jueguito.tirar(10);
  }
  expect(jueguito.score()).toBe(300);
});

test('Todos unos', () => {
  const jueguito = new JuegoVago();
  for (let i = 0; i < 20; i++) {
    jueguito.tirar(1);
  }
  expect(jueguito.score()).toBe(20);
});

test('Un spare en el primer turno, 1 en el resto', () => {
  const jueguito = new JuegoVago();
  jueguito.tirar(1);
  jueguito.tirar(9);
  for (let i = 0; i < 18; i++) {
    jueguito.tirar(1);
  }
  expect(jueguito.score()).toBe(29);
});

test('Un spare en el último turno, 1 en el resto', () => {
  const jueguito = new JuegoVago();
  for (let i = 0; i < 18; i++) {
    jueguito.tirar(1);
  }
  jueguito.tirar(1);
  jueguito.tirar(9);
  jueguito.tirar(1);
  expect(jueguito.score()).toBe(30);
});

test('Un strike en el primer turno, 1 en el resto', () => {
  const jueguito = new JuegoVago();
  jueguito.tirar(10);
  for (let i = 0; i < 17; i++) {
    jueguito.tirar(1);
  }
  expect(jueguito.score()).toBe(30);
});

test('Un strike en el último turno, 1 en el resto', () => {
  const jueguito = new JuegoVago();
  for (let i = 0; i < 17; i++) {
    jueguito.tirar(1);
  }
  jueguito.tirar(10);
  jueguito.tirar(1);
  jueguito.tirar(1);
  expect(jueguito.score()).toBe(30);
});
