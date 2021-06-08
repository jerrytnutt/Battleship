
import battleship from "./battleship";


const gameBoard = (iden) => {
    const board = Array.from(Array(100).keys());
    const shipsToPlace = [2,2,5,5,7];
    const shipsOnBoard = [];
    const coverdPositions = [];
    const hoverPositions = [];
    const lastHitShip = [];
  
      
      const placeNewShip = (coordinates,direction,random,hover=null) => {
        hoverPositions.splice(0)
        
        const placeOneShip = (coordinates) => {
          //if (typeof coordinates === 'string'){
           // console.log(coordinates)
          //  coordinates = parseInt(coordinates)
         // }
          
          let coord_array = ('' + coordinates).split('').map(function(digit)  {return +digit;});
          if (coord_array.length === 1){
            coord_array.unshift(0)
          }

          let length = shipsToPlace.slice(-1)[0]
          let positions = []
          let startPoint = coord_array[1]

          if (direction === 'vertical'){
            startPoint = coord_array[0]
          }

          for(var i = 0;i<length;i++){
            if (startPoint > 9 || coverdPositions.includes(coordinates)){
              return "No room for ship"
            }
            
            if (direction === 'horizontal'){
              positions.push(coordinates)
              coordinates+=1
            }else{
              coordinates = parseInt(coord_array[0].toString() + coord_array[1].toString())
              positions.push(coordinates)
              coord_array[0] = coord_array[0] + 1
          } 
          startPoint+=1
            } 

          
          if (hover) {
            hoverPositions.push(...positions)
            return hoverPositions
         } 

          let newShip = battleship(length)
          newShip.positions = positions
          coverdPositions.push(...positions)
          shipsToPlace.splice(-1,1)
          shipsOnBoard.push(newShip)
          return 'New Ship Placed'
        }

        if  (shipsToPlace.length > 0){
          if (random === true){
            while (shipsToPlace.length !== 0){
              coordinates = Math.floor(Math.random() * 100);
              placeOneShip(coordinates)
            }
            return random
          }
          placeOneShip(coordinates)
      }
      return 'No ships available'
    };

     const receiveAttack = (coordinates,random) => {
        if(iden === 'human'){
          console.log(coverdPositions)
          console.log(board)

        }
        const checkIfCoverd = (coordinates) => {
          
          if (coverdPositions.indexOf(coordinates.toString()) !== -1 || board.indexOf(coordinates.toString()) !== -1){
            return 'prev'
          }
        }

        if (random === true){
          while (checkIfCoverd(coordinates) === 'prev'){
            coordinates = Math.floor(Math.random() * 100)
          }
        }
        if (checkIfCoverd(coordinates) === 'prev'){
          console.log('You cannot place here')
          return 'prev'
        }
        
       
      if(typeof coordinates === 'string'){
          coordinates = parseInt(coordinates)
        }

        let index = coverdPositions.indexOf(coordinates)
        
        const checkShip = (shipHit)=>{
          let shipSunk = shipHit.hit(shipHit.positions.indexOf(coordinates))
          if (shipSunk === true){
            let index = shipsOnBoard.indexOf(shipHit)
            shipsOnBoard.splice(index,1)
            console.log(shipsOnBoard)
            if (shipsOnBoard.length === 0){
              console.log('Game Over')
            }
            return shipHit
          }
           return shipSunk
         }
        /////
        console.log(iden === 'AI')
        if(iden === 'AI'){
          if (lastHitShip.length > 0){
            let length = lastHitShip[0].positions.length
            for (var i = 0; i<length; i++){
              if (lastHitShip[0].positions[i] !== 'X'){
                console.log(lastHitShip[0].positions[i])
                coordinates = lastHitShip[0].positions[i]
                index = coverdPositions.indexOf(coordinates)
                coverdPositions[index] = coverdPositions[index].toString()
                let shipHit = lastHitShip[0]
                return checkShip(shipHit)
              }
            }
            lastHitShip.pop()
          }
        }
        /////
        
        if (coverdPositions.includes(coordinates)){ 
          let length = shipsOnBoard.length
           for (var i = 0; i < length; i++){
             if (shipsOnBoard[i].positions.includes(coordinates)){
               lastHitShip.push(shipsOnBoard[i])
               coverdPositions[index] = coverdPositions[index].toString()
               let shipHit = shipsOnBoard[i]
               return checkShip(shipHit)
             }
               }  
              }
           
         board[coordinates] = board[coordinates].toString()
         return 'Missed shot'
      };
      return{
        iden: iden,
        board: board,
        shipsToPlace: shipsToPlace,
        shipsOnBoard: shipsOnBoard,
        coverdPositions: coverdPositions,
        hoverPositions: hoverPositions,
        lastHitShip: lastHitShip,
        placeNewShip: placeNewShip,
        receiveAttack: receiveAttack
      
    
    };
  };
 
export default gameBoard