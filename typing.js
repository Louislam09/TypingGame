const output = document.getElementById('output');
const typingBox = document.getElementById('typingBox');
const button = document.getElementById('button');
const timer = document.getElementById('timer');
var chars;
let startTime;
let gameover = false;

const TEXT =
	'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et laborum cumque, repellendus voluptas voluptatibus officia, soluta autem at culpa ex sint iusto beatae dignissimos perspiciatis dicta alias libero vel consequatur.';
startGame();
function startGame() {
	output.innerHTML = null;
	typingBox.value = null;
	typingBox.removeAttribute('readonly');

	setText();
	startTimer();

	button.style.visibility = 'hidden';
	timer.classList.remove('blink');

	button.addEventListener('click', startGame);
}

async function setText() {
	let url = 'https://api.quotable.io/random';

	try {
		const res = await fetch(url);
		const data = await res.json();
		chars = data.content;
	} catch (e) {
		console.log('this is an error: ' + e);
		chars = TEXT;
	}

	return chars.split('').forEach((e) => {
		let char = document.createElement('span');
		char.innerText = e;
		output.appendChild(char);
	});
}

typingBox.addEventListener('input', () => {
	const arrayQuote = output.querySelectorAll('span');
	const arrayValue = typingBox.value.split('');

	let correct = true;
	arrayQuote.forEach((outputChar, index) => {
		const typingBoxChar = arrayValue[index];
		if (typingBoxChar == null) {
			outputChar.classList.remove('incorrect');
			outputChar.classList.remove('correct');
			correct = false;
		} else if (typingBoxChar === outputChar.innerText) {
			outputChar.classList.remove('incorrect');
			outputChar.classList.add('correct');
		} else {
			outputChar.classList.add('incorrect');
			outputChar.classList.remove('correct');
			correct = false;
		}
	});
	if (correct) startGame();
});

function startTimer() {
	timer.innerText = 0;

	let startCountFrom;
	if (output.innerText.length > 200) {
		startCountFrom = 90;
	} else {
		startCountFrom = 60;
	}

	startTime = new Date();
	let loop = setInterval(() => {
		let realSeconds = getTime();
		// startCountFrom = 60;
		let seconds = startCountFrom - realSeconds;
		setTimerColor(seconds);
		if (seconds === 0) {
			clearInterval(loop);
			typingBox.value = null;
			typingBox.value = 'Se termino el tiempo!!';
			typingBox.setAttribute('readonly', 'readonly');
			output.innerHTML = `<h1 style="text-align:center;">GAME OVER!</h1>`;
			button.style.visibility = 'visible';
		}
		// if (Array.from(output.children).every((el) => el.classList.contains('correct'))) {
		// 	clearInterval(loop);
		// }

		timer.innerText = `${seconds}`;
	}, 1000);
}

function getTime() {
	return Math.floor((new Date() - startTime) / 1000);
}
function setTimerColor(second) {
	second > 20 && second <= 30
		? (timer.style.color = 'yellow')
		: second > 10 && second <= 20
			? (timer.style.color = 'orange')
			: second <= 10 ? (timer.style.color = 'red') : (timer.style.color = 'white');

	if (second < 10) {
		timer.classList.add('blink');
	}
}
