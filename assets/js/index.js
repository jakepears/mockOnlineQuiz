/** @format */

const firstQuestion = 0;
let time = questions.length * 20;
let timerId;

const questionsEl = document.getElementById('questions');
const timerEl = document.getElementById('time');
const choicesEl = document.getElementById('choices');
const submitBtn = document.getElementById('submit');
const startBtn = document.getElementById('start');
const initialsEl = document.getElementById('initials');
const feedbackEl = document.getElementById('feedback');

const quizStart = () => {
	const startScreenEl = document.getElementById('start-screen');
	startScreenEl.setAttribute('class', 'hide');

	questionsEl.removeAttribute('class');

	timerId = setInterval(clockTick, 1000);

	timerEl.textContent = time;

	questionFinder();
};

const questionFinder = () => {
	let currentQuestion = questions[firstQuestion];

	const titleEl = document.getElementById('question-title');

	titleEl.textContent = currentQuestion.title;

	choicesEl.innerHTML = '';

	for (let i = 0; i < currentQuestion.length; i++) {
		// create new button for each choice
		let choice = currentQuestion.choices[i];
		let choiceNode = document.createElement('button');
		choiceNode.setAttribute('class', 'choice');
		choiceNode.setAttribute('value', choice);

		choiceNode.textContent = i + 1 + '. ' + choice;

		choicesEl.appendChild(choiceNode);
	}
};

const questionClick = (e) => {
	let buttonEl = e.target;

	if (!buttonEl.matches('.choices')) {
		return;
	}

	if (buttonEl.value !== questions[firstQuestion].answer) {
		time -= 10;

		if (time < 0) {
			time = 0;
		}
		timerEl.textContent = time;

		feedbackEl.textContent = 'Incorrect';
	} else {
		feedbackEl.textContent = 'Correct';
	}

	feedbackEl.setAttribute('class, feedback');
	setTimeout(function () {
		feedbackEl.setAttribute('class, feedback hide');
	}, 2000);

	firstQuestion++;

	if (time <= 0 || firstQuestion === questions.length) {
		stopQuiz();
	} else {
		questionFinder();
	}
};

const stopQuiz = () => {
	clearInterval(timerId);

	const endScreenEl = document.getElementById('end-screen');
	endScreenEl.removeAttribute('class');

	const finalScoreEl = document.getElementById('final-score');
	finalScoreEl.textContent = time;

	questionsEl.setAttribute('class', 'hide');
};

const clockTick = () => {
	// update time
	time--;
	timerEl.textContent = time;

	// check if user ran out of time
	if (time <= 0) {
		stopQuiz();
	}
};

const saveScore = () => {
	let initials = initialsEl.value.trim();

	if (initials !== '') {
		const highscores = JSON.parse(localStorage.getItem('highscores'));

		const newScore = {
			score: time,
			initials: initials,
		};

		highscores.push(newScore);
		localStorage.setItem('highscores', JSON.stringify(highscores));

		location.href = 'highscores.html';
	}
};

const checkForEnter = (e) => {
	if (e.key === 'Enter') {
		saveScore();
	}
};

submitBtn.onclick = saveScore;

startBtn.onclick = quizStart;

choicesEl.onclick = questionFinder;

initialsEl.onkeyup = checkForEnter;
