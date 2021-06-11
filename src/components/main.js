const Main = (props) =>{
    
    let humanArray = Array.from(Array(100).keys())
    let computerArray = Array.from(Array(100).keys())
    let computerBoard = []
    let humanBoard = []
    let humanPositions = []
    let computerPositions = []
    let hover = []

    try {
      humanPositions = props.humanPlayer.gameBoard.coverdPositions
      computerPositions = props.computerPlayer.gameBoard.coverdPositions
      computerBoard = props.computerPlayer.gameBoard.board
      humanBoard = props.humanPlayer.gameBoard.board
      hover = props.humanPlayer.gameBoard.hoverPositions 
      } catch (error) {
        //pass
      }
    humanArray  = humanArray.map((x)=>{
      if(humanPositions.includes(x)){
        x = x.toString()
      }
      return x
      })
    
    computerArray = computerArray.map((x)=>{
      if(computerPositions.includes(x)){
        x = x.toString()
      }
      return x
      })

      let visability = true;
      if(props.userMessage === "Place Your Ships!" || props.userMessage === "Select Your Difficulty!"){
        visability = false
      }
      
    return(
      <div className="boardContainers">
        <div className='board'>
          <h2>Human Board</h2>
          <div className='boardGrid'>
          {humanArray.map((e) => {

          let color = "rgb(15, 12, 206)"
          if (typeof e === 'string'){
            color = 'green'
          }
          if (humanPositions.includes(e.toString())){
           color = 'red'
          }
          if (hover.includes(e)){
           color = 'purple'
          }
          if(typeof humanBoard[e] === 'string' && humanPositions.includes(e.toString()) === false){
            color = 'black'
          }
        return <div key={e} style={{backgroundColor: color}} 
        className='box' 
        onClick={()=>{props.placeShips(e,props.shipDirection,false)}}
        onMouseOver={()=>{props.placeShips(e,props.shipDirection,false,true)}}></div>
      })}
     </div>
     </div>

      <div style={{display: visability ? 'none' : 'block'}}  className='outerContainer'>
        <div className='middleContainer'>
        <div>{props.userMessage === "Place Your Ships!"?  
        <div>
       <button onClick={()=>{props.placeShips(0,props.shipDirection,true)}}>Assign Randomly</button>
        <div>Or</div>
        <div>Place them to the board</div>
        <div className='radio'>
        <h4>Direction</h4>
  
        <div>
          <input onClick={()=>{props.setshipDirection('horizontal')}} type="radio"  name="direction"></input>
          <label>Horizontal</label>
        </div>
  
        <div>
          <input onClick={()=>{props.setshipDirection('vertical')}} type="radio" name="direction" ></input>
          <label>Vertical</label>
        </div>

       </div>
       </div> : 

  
      <div>
       <h4>Difficulty</h4>

       <div>
         <button onClick={()=>{props.changeDifficulty('easy')}} type="radio"  name="difficulty" >Easy</button>
       </div>

       <div>
         <button onClick={()=>{props.changeDifficulty('hard')}} type="radio" name="difficulty" >Hard</button>
       </div>


     </div>}</div> 
     </div>
     </div>

   <div className='board'>
    <h2>Computer Board</h2>
   <div className='boardGrid'>

     {computerArray.map((e) => {
    
    let color = "rgb(15, 12, 206)"
    
    if (computerPositions.includes(e.toString())){
      color = 'red'
    }
    if(typeof computerBoard[e] === 'string' && computerPositions.includes(e.toString()) === false){
      color = 'black'
    }
    
    return <div key={e} style={{backgroundColor: color}} 
    onClick={()=>{props.recieveAttackCoordinates(e)}}className='box'></div>
                 })}
</div>
</div>
  </div>

    )

}
export default Main