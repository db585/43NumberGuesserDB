/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Set game bindings
let min = 15
let max = 30
let guessesLeft = 3
let winningNum = getRandomNum(min, (max + 1))
// console.log(winningNum)

// Set UI elements
const gameUI = document.querySelector('#db-game')
const minNum = document.querySelector('.db-min-num')
const maxNum = document.querySelector('.db-max-num')
const guessBtn = document.querySelector('#db-guess-btn')
const guessInput = document.querySelector('#db-guess-input')
const message = document.querySelector('.db-message')

// Assign min amd max
minNum.textContent = min
maxNum.textContent = max

// Listen to playAgain case for guessBtn
gameUI.addEventListener('mousedown', (e) => {
  // console.info('listening...')
  // console.info(e.target)
  if (e.target.className === 'db-play-again') {
    // console.info(e.target.className)
    window.location.reload()
  }
})

// Listen for guessBtn
guessBtn.addEventListener('click', () => {
  let guess = parseInt(guessInput.value)
  // console.info(guess)

  // Validate guess input
  if (isNaN(guess) || guess < min || guess > max) {
    // console.info('true...')

    setMessage(`Please enter a number between ${min} and ${max}`, 'red ')
  } else {
    // console.info('false...')
    // Check if it winningNum
    if (guess === winningNum) {
      // Game over - Won case

      gameOver(`${guess} is correct. You Win!!!`, 'green')
    } else {
      // Wrong number
      guessesLeft -= 1

      // Check if they lost
      if (guessesLeft === 0) {
        //  Game over - Lose case
        gameOver(`Game over. You lost. Correct number is ${winningNum}`, 'red')
      } else {
        // Game continues - answer wrong

        // Set border color to red
        guessInput.style.borderColor = 'red'

        // Clear guessInput and set focus to it
        guessInput.value = ''
        guessInput.focus()

        // Set message to continuing case
        setMessage(`${guess} is not correct. ${guessesLeft} guesses left`, 'blue')
      }
    }
  }
})

// Declare gameOver func
function gameOver (msg, color) {
  //  Disable input
  guessInput.disabled = true

  // Set border color to green
  guessInput.style.borderColor = color

  // Set message
  setMessage(msg, color)

  // Set to play again
  guessBtn.value = 'Play Again'
  guessBtn.className += 'db-play-again'
  // console.info(guessBtn)
  // guessBtn.addEventListener('click', () => {
  //   window.location.reload()
  // })
}

// Declare setMessage func
function setMessage (msg, color) {
  message.textContent = msg
  message.style.color = color
}

// Declare getWinningNum to get random number
function getRandomNum (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}
