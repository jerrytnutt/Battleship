import battleship from './battleship'

test('Placeing five ships will empty the shipsToPlace array', () => {
    const newShip = battleship(5)
    expect(newShip.length).toBe(5);
  });

  test('Placeing five ships will empty the shipsToPlace array', () => {
    const newShip = battleship(5)
    newShip.positions = [20,21]
    
    
  
    expect(newShip.hit(20)).toBeFalsy();
  });

  test('Placeing five ships will empty the shipsToPlace array', () => {
    const newShip = battleship(5)
    newShip.positions = [20,21]
    newShip.hit(20)
    newShip.hit(21)
    expect(newShip.isSunk).toBeTruthy();
  });