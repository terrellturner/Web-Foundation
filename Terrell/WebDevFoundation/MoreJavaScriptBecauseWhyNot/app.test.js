const app = require('./app');

test('5+2 equals 7', () =>{
    expect(app.add(5,2)).toBe(7);
});

test('8 - 5 equals 3', () => {
  expect(app.subtract(8, 5)).toBe(3);
});