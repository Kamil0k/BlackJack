//START MODAL CONTROLS
const startModal = document.querySelector('.start-modal-shadow')

const playerName1 = document.querySelector('.modal__content-oponents-player1')
const playerName2 = document.querySelector('.modal__content-oponents-player2')
const btnStart = document.querySelector('.modal__content-btn-start')

//MAIN WINDOW

const currentPlayer = document.querySelector('.table__current-player')
const player1 = document.querySelector('.menu__left-player')
const player2 = document.querySelector('.menu__right-player')
const scorePlayer1 = document.querySelector('.menu__left-score')
const scorePlayer2 = document.querySelector('.menu__right-score')
const mainCard = document.querySelector('.table__stack')
const cards = document.querySelectorAll('.table__card')
const btnPass = document.querySelector('.table__btn-pass')

//END MODAL SHADOW

const endModal = document.querySelector('.end-modal-shadow')
const endTitle = document.querySelector('.modal__content-title-winner')
const endPlayer1 = document.querySelector('.modal__content-box-player1')
const endPlayer2 = document.querySelector('.modal__content-box-player2')
const endScore1 = document.querySelector('.modal__content-box-score1')
const endScore2 = document.querySelector('.modal__content-box-score2')
const btnNewGame = document.querySelector('.modal__content-btn-new-game')

let interval
let time = 0
let actualCard = 0

let pointsPlayer1 = 0
let pointsPlayer2 = 0
let round = 1
let rdm

const cardPoints = [
	2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 2, 2,
	2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 11, 11, 11, 11,
]

const checkNameInputs = () => {
	if (playerName1.value === '' && playerName2.value === '') {
		playerName1.style.borderColor = '#c12026'
		playerName2.style.borderColor = '#c12026'
		return false
	} else if (playerName1.value === '') {
		playerName1.style.borderColor = '#c12026'
		return false
	} else if (playerName2.value === '') {
		playerName2.style.borderColor = '#c12026'
		return false
	} else {
		playerName1.style.borderColor = 'black'
		playerName2.style.borderColor = 'black'
		return true
	}
}

const setStartSettings = () => {
	let random = Math.floor(Math.random() * 100)
	if (random % 2 == 0) {
		currentPlayer.innerText = playerName1.value
		player1.innerText = playerName1.value
		player2.innerText = playerName2.value
	} else {
		currentPlayer.innerText = playerName2.value
		player1.innerText = playerName2.value
		player2.innerText = playerName1.value
	}
}

const hideStartModal = () => {
	if (checkNameInputs()) {
		startModal.classList.add('hide-modal')
		setStartSettings()
	}
}

const randomCard = () => {
	interval = setInterval(() => {
		if (time === 0) {
			mainCard.style.transform = 'rotateY(' + 90 + 'deg)'
		} else if (time === 1) {
			rdm = Math.floor(Math.random() * 52 + 1)
			mainCard.src = `./card (${rdm}).PNG`
			cards[actualCard].src = `./card (${rdm}).PNG`
			actualCard++
			mainCard.style.transform = 'rotateY(' + 0 + 'deg)'
		} else if (time === 2) {
			mainCard.style.transform = 'rotateY(' + 90 + 'deg)'
		} else if (time === 3) {
			mainCard.style.transform = 'rotateY(' + 0 + 'deg)'
			mainCard.src = `./back.PNG`
		} else if (time === 4) {
			calculatePoints(rdm)
			time = -1
			if (actualCard == 5) {
				handlePassButton()
			}
			clearInterval(interval)
		}
		time++
	}, 300)
}

const calculatePoints = rdm => {
	if (round == 1) {
		pointsPlayer1 = pointsPlayer1 + cardPoints[rdm - 1]
		scorePlayer1.innerText = Number.parseInt(pointsPlayer1)
		if (pointsPlayer1 == 21) {
			showEndModal(1)
		} else if (pointsPlayer1 > 21) {
			showEndModal(2)
		}
	} else {
		pointsPlayer2 = pointsPlayer2 + cardPoints[rdm - 1]
		scorePlayer2.innerText = Number.parseInt(pointsPlayer2)
		if (pointsPlayer2 == 21) {
			showEndModal(2)
		} else if (pointsPlayer2 > 21) {
			showEndModal(1)
		}
	}
}

const handlePassButton = () => {
	if (round == 1) {
		for (let i = 0; i < cards.length; i++) {
			cards[i].src = ``
		}
		actualCard = 0
		currentPlayer.innerText = player2.textContent
	} else {
		if (pointsPlayer1 > pointsPlayer2) {
			showEndModal(1)
		} else if (pointsPlayer1 == pointsPlayer2) {
			showEndModal(0)
		} else {
			showEndModal(2)
		}
		if (pointsPlayer1 == 21) {
			showEndModal(1)
		} else if (pointsPlayer1 > 21) {
			showEndModal(2)
		}
		if (pointsPlayer2 == 21) {
			showEndModal(2)
		} else if (pointsPlayer2 > 21) {
			showEndModal(1)
		}
	}
	round++
}

const showEndModal = winner => {
	endPlayer1.innerText = player1.textContent
	endPlayer2.innerText = player2.textContent
	endScore1.innerText = scorePlayer1.textContent
	endScore2.innerText = scorePlayer2.textContent
	if (winner === 0) {
		endTitle.innerHTML = 'Remis!'
		endScore2.style.color = '#fff09c'
	} else if (winner === 1) {
		endTitle.innerHTML = `Wygrywa ${player1.textContent}!`
	} else {
		endTitle.innerHTML = `Wygrywa ${player2.textContent}!`
		endPlayer1.innerText = player2.textContent
		endPlayer2.innerText = player1.textContent
		endScore1.innerText = scorePlayer2.textContent
		endScore2.innerText = scorePlayer1.textContent
	}
	endModal.classList.add('show-modal')
}

btnStart.addEventListener('click', hideStartModal)
mainCard.addEventListener('click', randomCard)
btnPass.addEventListener('click', handlePassButton)
btnNewGame.addEventListener('click', () => {
	location.reload()
})
