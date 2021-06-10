const Header = (props) => {
    let startText = 'Start'
    if (props.userMessage !== 'Start Your Game!'){
      startText = 'Restart'
    }
    return (
        <div className='header'>
            <div className='title'>BattleShip</div>
            <div className='messageBox'>{props.userMessage}</div>
            <button className='startButton' onClick={props.initializeGame}>{startText}</button>
        
        </div>
    )
}

export default Header