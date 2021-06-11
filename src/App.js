import {useState, useEffect} from 'react';
import Header from './components/header'
import player from './factories/player'
import gameBoard from './factories/gameBoard'
import Main from './components/main.js'
import './App.css';

function App() {
  const [humanPlayer,sethumanPlayer] = useState({})
  const [computerPlayer,setcomputerPlayer] = useState({})
  const [gameActive,setgameActive] = useState(false)
  const [userMessage,setuserMessage] = useState('Start Your Game!')
  const [shipDirection,setshipDirection] = useState('horizontal')
  const [difficulty,setdifficulty] = useState('easy')

  const initializeGame = () =>{
    const human = player('human')
    human.gameBoard = gameBoard()
    const computer= player('computer')
    computer.gameBoard = gameBoard()
    sethumanPlayer(human)
    setcomputerPlayer(computer)
    setuserMessage('Place Your Ships!')
    setgameActive(false)
  };

  const changeDifficulty = (level) => {
    setdifficulty(level)
    setuserMessage('Battle!')
    setgameActive(true)
  };

  const placeShips = (coordinates,direction,random,hover)=>{ 
   if (!gameActive && userMessage === "Place Your Ships!"){
     const humanCopy = Object.assign({}, humanPlayer);
     humanCopy.gameBoard.placeNewShip(coordinates,direction,random,hover)
     sethumanPlayer(humanCopy)

    if(humanPlayer.gameBoard.shipsToPlace.length === 0){
      const computerCopy = Object.assign({}, computerPlayer);
      computerCopy.gameBoard.placeNewShip(0,'horizontal',true)
      setcomputerPlayer(computerCopy)
      setuserMessage('Select Your Difficulty!')
      } 
    }
  };

 const recieveAttackCoordinates = (coordinates) =>{
   let humanShot;
   let computerShot
   if (gameActive){
    const computerCopy = Object.assign({}, computerPlayer);
    computerShot = computerCopy.gameBoard.receiveAttack(coordinates,false)
    setcomputerPlayer(computerCopy)
   
    const gameOver = isGameOver('Human')
    
    if (computerShot === 'This position has already been targeted' || gameOver){
      return 0
    }

    const randomCoord = Math.floor(Math.random() * 100);
    const humanCopy = Object.assign({}, humanPlayer);
    humanShot = humanCopy.gameBoard.receiveAttack(randomCoord,true,difficulty)

    sethumanPlayer(humanCopy) 
    setuserMessage(`Human: ${humanShot} -- Computer: ${computerShot}`)
    isGameOver('Computer')
   }
   return gameActive
 };

 const isGameOver = (winner) => {
   if (computerPlayer.gameBoard.shipsOnBoard.length === 0 || humanPlayer.gameBoard.shipsOnBoard.length === 0){
     setgameActive(false)
     setuserMessage(`Game Over -- ${winner} has Won!`)
     return true
    }
    return false
 };
 useEffect(() => {
  document.title = "Battleship"
}, []);
  return (
    <div className="App">
      
      <Header initializeGame={initializeGame} 
      gameActive={gameActive} 
      userMessage={userMessage} 
      setuserMessage={setuserMessage}/>
      
      <Main humanPlayer={humanPlayer} 
      computerPlayer={computerPlayer} 
      placeShips={placeShips}
      recieveAttackCoordinates={recieveAttackCoordinates}
      userMessage={userMessage}
      shipDirection={shipDirection}
      setshipDirection={setshipDirection}
      changeDifficulty={changeDifficulty}/>
      
    </div>
  );
}

export default App;