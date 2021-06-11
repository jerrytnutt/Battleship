import battleship from './battleship'

test('Length argument Test', () => {
    const newShip = battleship(5)
    expect(newShip.length).toBe(5);
  });

  test('Hit method will call isSunk method', () => {
    const newShip = battleship(2)
    newShip.positions = [20,21]
    expect(newShip.hit(20)).toBeFalsy();
  });

  test('Hit method will call isSunk method Test 2', () => {
    const newShip = battleship(5)
    newShip.positions = [20,21]
    newShip.hit(20)
    newShip.hit(21)
    expect(newShip.isSunk).toBeTruthy();
  }); 