const Header = (props) => {
    return (
        <div className='header'>
            <div className='title'>BattleShip</div>
            <div className='messageBox'>{props.userMessage}</div>
            <button className='startButton' onClick={props.startGame}>Start</button>
        
        </div>
    )
}

export default Header