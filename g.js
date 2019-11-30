function newGame(){
    return new Game();
}
function playGame(){
    let game = newGame();
    const button = document.getElementById('submit')
    button.addEventListener('click', function(){
        let message = ''
        let numbers = /[0-9]/g
        let letters = /[a-zA-Z]/g
        let playersGuess = document.querySelector('input').value
        document.querySelector('input').value = ''
        if(playersGuess.match(numbers) && !(playersGuess.match(letters))){
            let result = parseInt(playersGuess)
            message = game.playersGuessSubmission(result)
        }
        else if (playersGuess.match(letters) || (playersGuess.match(letters) && playersGuess.match(numbers))){
            message = game.playersGuessSubmission(playersGuess)
        }
        if (message==='You Win!'){
            game = newGame();
            const elements = document.querySelectorAll('#guess-list li')
            elements.forEach(function(e){
                e.innerHTML='-'
            })
        }
        else if((message === 'You Lose.') || game.pastGuesses.length === 5){
            
        }
    })
}