const battleship = (length) => {
    return{
        length: length,
        hit(num){
        this.positions[num] = 'X'
        return this.isSunk()
        },
        isSunk(){
          if (this.positions.filter(x => x === 'X').length === this.positions.length){
            console.log(true)
            return true
          }
          return false
        }
    }
}
export default battleship