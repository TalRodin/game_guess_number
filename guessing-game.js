function generateWinningNumber(){   
    let num = Math.random()*101;
    if (num<1){
      return Math.ceil(num)
    }
    else if(num>100){
      return Math.floor(num)
    }
    else {
      return Math.round(num)
    }
}
function shuffle(array) {
    var m = array.length, t, i;
    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
}
class Game{
    constructor(){
        this.playersGuess=null
        this.pastGuesses=[]
        this.winningNumber=generateWinningNumber() 
    }
    
    difference(){
       return Math.abs(this.playersGuess-this.winningNumber)
    }
    isLower(){
       return (this.playersGuess<this.winningNumber) ? true : false
    }
    playersGuessSubmission(num){   
        this.playersGuess = num
        if (this.playersGuess < 1 || this.playersGuess > 100 || (typeof this.playersGuess !== 'number')) { 
            let throwError = 'That is an invalid guess.'
            document.querySelector('#guess-feedback > h4').innerHTML = throwError
            throw throwError
        }
        return this.checkGuess()
    }
    checkGuess(){
        let feedbackText = '';
        if(this.playersGuess===this.winningNumber){
            feedbackText ='You Win!'
            return feedbackText
        }
        if(this.pastGuesses.includes(this.playersGuess)){
            feedbackText = 'You have already guessed that number.'
        }
        else{
            this.pastGuesses.push(this.playersGuess) 
            if(this.pastGuesses.length===5){
                feedbackText = 'You Lose.' 
            }
            else{
                if(this.difference()<10){
                    feedbackText = "You're burning up!"
                }
                else if(this.difference()<25){
                    feedbackText = "You\'re lukewarm."
                }
                else if(this.difference()<50){
                    feedbackText = "You\'re a bit chilly."
                }
                else {
                    feedbackText = "You\'re ice cold!"
                }
            }
        }
        return feedbackText; 
    }
    provideHint(){
        let arr=[
            this.winningNumber,
            generateWinningNumber(),
            generateWinningNumber(),
        ];
        return shuffle(arr)
    }
}
function newGame(){
   return new Game(); 
}
function playGame() {
    let game = newGame();
    console.log(document)
    const button = document.getElementById('submit');
    button.addEventListener('click',function(){
        let message = ''
        let playersGuess = document.querySelector('input').value
        document.querySelector('input').value = '';
        const numbers= /[0-9]/g;
        const letters= /[a-zA-Z]/g;
        if(playersGuess.match(numbers) && !(playersGuess.match(letters))){
            
            let result = parseInt(playersGuess);
            message=game.playersGuessSubmission(result) 
        }
        else if(playersGuess.match(letters) || (playersGuess.match(numbers) && playersGuess.match(letters)) ){
            message=game.playersGuessSubmission(playersGuess)
        }
        if (message==='You Win!'){
            game = newGame();
            const elements = document.querySelectorAll('#guess-list li')
            elements.forEach(function(e){
                e.innerHTML = '-'
            })
        }
        else if((message==='You Lose.') || game.pastGuesses.length===5){
            message='You Lose.'
            document.querySelector(`#guess-list li:nth-child(${game.pastGuesses.length})`).innerHTML = game.pastGuesses[4]  
        }
        else if(game.pastGuesses.length!==5){
            document.querySelector(`#guess-list li:nth-child(${game.pastGuesses.length})`).innerHTML = playersGuess
        }
        document.querySelector('#guess-feedback > h4').innerHTML = message;
    });

    const buttonReset=document.getElementById('reset-game');
    buttonReset.addEventListener('click', function(){
        game = newGame();
        const elements = document.querySelectorAll('#guess-list li')
        elements.forEach(function(e){
            e.innerHTML = '-'
        })
        document.querySelector('#guess-feedback > h4').innerHTML = '';
    })
    
    const buttonHint=document.getElementById('need-hint');
    buttonHint.addEventListener('click', function(){
        document.querySelector('#guess-feedback > h4').innerHTML = game.provideHint();
    })
}
playGame();
