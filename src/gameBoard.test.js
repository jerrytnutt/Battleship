import gameBoard from "./gameBoard";

test('adds 1 + 2 to equal 3', () => {
  let g = gameBoard('human')
  expect(g.shipsToPlace).toStrictEqual([2,2,5,5,7]);
});