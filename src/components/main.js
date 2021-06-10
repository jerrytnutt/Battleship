const Main = (props) =>{
    
    let humanBoard = Array.from(Array(100).keys())
    let computerBoard = Array.from(Array(100).keys())
    let cBoard = []
    let hBoard = []
    let humanPositions = []
    let computerPositions = []
    let hover = []
    try {
      humanPositions = props.humanPlayer.gameBoard.coverdPositions
      computerPositions = props.computerPlayer.gameBoard.coverdPositions
      cBoard = props.computerPlayer.gameBoard.board
      hBoard = props.humanPlayer.gameBoard.board
      hover = props.humanPlayer.gameBoard.hoverPositions 
      } catch (error) {
        console.log('error')
      }
      humanBoard  = humanBoard.map((x)=>{
        if(humanPositions.includes(x)){
          x = x.toString()
        }
        return x
      })
      
      

      computerBoard = computerBoard.map((x)=>{
        if(computerPositions.includes(x)){
          x = x.toString()
        }
        return x
      })

      let dis = true;
      if(props.userMessage === "Place Your Ships!" || props.userMessage === "Select Your Difficulty!"){
        dis = false
      }
      
    return(
      <div className="boardContainers">
        <div className='board'>
          <h2>Human Board</h2>
          <div className='boardGrid'>
          {humanBoard.map((e) => {

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
        if(typeof hBoard[e] === 'string' && humanPositions.includes(e.toString()) === false){
          color = 'black'
        }
      return <div key={e} style={{backgroundColor: color}} 
      className='box' 
      onClick={()=>{props.placeShips(e,props.shipDirection,false)}}
      onMouseOver={()=>{props.placeShips(e,props.shipDirection,false,true)}}></div>
      })}
     </div>
     </div>

  <div style={{display: dis ? 'none' : 'block'}}  className='x'>
    <div className='middleContainer'>
   <div>{props.userMessage === "Place Your Ships!"?  
   <div>
     <button onClick={()=>{props.placeShips(0,props.shipDirection,true)}}>Assign Randomly</button>
    <div>Or</div>
    <div>Place them to the board</div>
    <div className='radio'>
    <h4>Direction</h4>
  
    <div>
      <input onClick={()=>{props.setshipDirection('horizontal')}} type="radio"  name="direction" ></input>
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
     {computerBoard.map((e) => {
    
    let color = "rgb(15, 12, 206)"
    if (typeof e === 'string'){
      color = 'green'
    }
    
    if (computerPositions.includes(e.toString())){
      color = 'red'
    }
    if(typeof cBoard[e] === 'string' && computerPositions.includes(e.toString()) === false){
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