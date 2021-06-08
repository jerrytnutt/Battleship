import {useState} from 'react';
import Header from './components/header'
import player from './player'
import gameBoard from './gameBoard'
import Main from './components/main.js'
import './App.css';

function App() {
  const [humanPlayer,sethumanPlayer] = useState({})
  const [computerPlayer,setcomputerPlayer] = useState({})
  const [gameActive,setgameActive] = useState(false)
  const [userMessage,setuserMessage] = useState('Start Your Game!')
  const [shipDirection,setshipDirection] = useState('horizontal')

  const startGame = () =>{
    let human = player('human')
    human.gameBoard = gameBoard('AI')
    let computer= player('AI')
    computer.gameBoard = gameBoard('human')
    sethumanPlayer(human)
    setcomputerPlayer(computer)
    setuserMessage('Place Your Ships!')
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
      setgameActive(true)
      } 
    }
  };
 const recieveAttackCoordinates = (coordinates) =>{
   if (gameActive === true){
    const computerCopy = Object.assign({}, computerPlayer);
    const reaction = computerCopy.gameBoard.receiveAttack(coordinates,false)
    setcomputerPlayer(computerCopy)
    if (reaction === 'prev'){
      return 0
    }
    let co = Math.floor(Math.random() * 100);
      const humanCopy = Object.assign({}, humanPlayer);
      let possibleAttack = humanCopy.gameBoard.receiveAttack(co,true)
      sethumanPlayer(humanCopy) 
        return 0
   }
 
 }
  return (
    <div className="App">
      <Header startGame={startGame} gameActive={gameActive} userMessage={userMessage} setuserMessage={setuserMessage}/>
      
      <Main humanPlayer={humanPlayer} 
      computerPlayer={computerPlayer} 
      placeShips={placeShips}
      recieveAttackCoordinates={recieveAttackCoordinates}
      userMessage={userMessage}
      shipDirection={shipDirection}
      setshipDirection={setshipDirection}/>
      
    </div>
  );
}

export default App;
