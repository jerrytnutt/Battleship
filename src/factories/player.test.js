import player from './player'

test('Player type test', () => {
    const newPlayer = player("human")
    expect(newPlayer.type).toBe('human');
  });