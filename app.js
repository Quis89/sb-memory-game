//Variables
const gameContainer = document.getElementById('game'); //Container Div
const COLORS = [ 'red', 'blue', 'green', 'orange', 'purple', 'red', 'blue', 'green', 'orange', 'purple' ];

let cardsFlipped, card1, card2, noClick;
cardsFlipped = 0;

function init() {
	card1 = null;
	card2 = null;
	noClick = false;
}

init();

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
	let counter = array.length;

	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
	for (let color of colorArray) {
		const newDiv = document.createElement('div');
		newDiv.classList.add(color);
		newDiv.addEventListener('click', handleCardClick);
		gameContainer.append(newDiv);
	}
}

function handleCardClick(event) {
	//If no click is false end function
	if (noClick) return;
	//If the class flipped is active end function
	if (event.target.classList.contains('flipped')) return;

	let target = event.target;
	let targetColor = target.classList[0];
	target.style.backgroundColor = targetColor;

	if (!card1 || !card2) {
		target.classList.add('flipped');
		card1 = card1 || target;
		//Ensures Card2 and Card 1 has different values.
		card2 = target === card1 ? null : target;
	}
	if (card1 && card2) {
		noClick = true;
		let card1Class = card1.className;
		let card2Class = card2.className;
		//If c1 and c2 have = values execute
		if (card1Class === card2Class) {
			cardsFlipped += 2;
			card1.removeEventListener('click', handleCardClick);
			card2.removeEventListener('click', handleCardClick);
			init();
		} else {
			//if not equal, wait and reset values
			setTimeout(timeOutReset, 1000);
		}
	}
	if (cardsFlipped === COLORS.length) alert('game over!');
}
// when the DOM loads
createDivsForColors(shuffledColors);

function timeOutReset() {
	card1.style.backgroundColor = '';
	card2.style.backgroundColor = '';
	card1.classList.remove('flipped');
	card2.classList.remove('flipped');
	init();
}
