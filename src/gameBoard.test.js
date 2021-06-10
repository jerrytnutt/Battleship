import gameBoard from "./gameBoard";

test('Placeing five ships will empty the shipsToPlace array', () => {
  const newBoard = gameBoard('human')
  newBoard.placeNewShip(20,"horizontal",false)
  newBoard.placeNewShip(30,"horizontal",false)
  newBoard.placeNewShip(40,"horizontal",false)
  newBoard.placeNewShip(50,"horizontal",false)
  newBoard.placeNewShip(60,"horizontal",false)

  expect(newBoard.shipsToPlace).toStrictEqual([]);
});

test('No ships will be placed if they run out of bounds', () => {
  const newBoard = gameBoard('human')
  newBoard.placeNewShip(25,"horizontal",false)
  newBoard.placeNewShip(38,"horizontal",false)
  newBoard.placeNewShip(81,"vertical",false)
  expect(newBoard.shipsToPlace).toStrictEqual([2,2,5,5,7]);
});

test('If the hover argument is true no ship will be removed from shipsToPlace array', () => {
  const newBoard = gameBoard('human')
  newBoard.placeNewShip(20,"horizontal",false)
  newBoard.placeNewShip(30,"horizontal",false)
  newBoard.placeNewShip(40,"horizontal",false,true)
  expect(newBoard.shipsToPlace).toStrictEqual([2,2,5]);
});

test('Function will return "No ships available" when ship array is empty', () => {
  const newBoard = gameBoard('human')
  newBoard.placeNewShip(20,"horizontal",false)
  newBoard.shipsToPlace = []
  expect(newBoard.placeNewShip(20,"horizontal",false)).toBe("No ships available");
});

test('With random set to true all available ships will be placed', () => {
  const newBoard = gameBoard('human')
  newBoard.placeNewShip(20,"vertical",true)
  expect(newBoard.shipsToPlace).toStrictEqual([]);
});

test('Ship Hit Test', () => {
  const newBoard = gameBoard('human')
  let coord = 11
  newBoard.placeNewShip(coord,"horizontal",false)
  expect(newBoard.receiveAttack(11,false)).toBe(`Ship was Hit at ${coord}`);
});

test('Ship Sunk Test', () => {
  const newBoard = gameBoard('human')
  
  newBoard.placeNewShip(40,"horizontal",false)
 

  newBoard.placeNewShip(11,"horizontal",false)
  newBoard.receiveAttack(11,false)
  newBoard.receiveAttack(12,false)
  newBoard.receiveAttack(13,false)
  newBoard.receiveAttack(14,false)
  expect(newBoard.receiveAttack(15,false)).toBe("Battleship was Sunk");
});

test('Attack an already hot position will return', () => {
  const newBoard = gameBoard('human')
  newBoard.placeNewShip(11,"horizontal",false)
  newBoard.receiveAttack(11,false)
 
  
  expect(newBoard.receiveAttack(11,false)).toBe("This position has already been targeted");
});

test('Attack an already hot position will return', () => {
  const newBoard = gameBoard('human')
  newBoard.placeNewShip(20,"horizontal",false)
  expect(newBoard.receiveAttack(0,false)).toBe("Missed Shot");
});