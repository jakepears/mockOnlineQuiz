/** @format */

var questionIndex = 0;
var time = questions.length * 20;
var timerId;

const questionsEl = document.getElementById('questions');
const timerEl = document.getElementById('time');
const choicesEl = document.getElementById('choices');
const submitBtn = document.getElementById('submit');
const startBtn = document.getElementById('start');
const initialsEl = document.getElementById('initials');
const feedbackEl = document.getElementById('feedback');

const quizStart = () => {
	let startScreenEl = document.getElementById('start-screen');
	startScreenEl.setAttribute('class', 'hide');

	questionsEl.removeAttribute('class');

	timerId = setInterval(clockTick, 1000);

	timerEl.textContent = time;

	questionFinder();
};

const questionFinder = () => {
	let currentQuestion = questions[questionIndex];

	const titleEl = document.getElementById('question-title');

	titleEl.textContent = currentQuestion.title;

	choicesEl.innerHTML = '';

	for (let i = 0; i < currentQuestion.choices.length; i++) {
		// create new button for each choice
		let choice = currentQuestion.choices[i];
		let choiceBtn = document.createElement('button');
		choiceBtn.setAttribute('class', 'choice');
		choiceBtn.setAttribute('value', choice);

		choiceBtn.textContent = i + 1 + '. ' + choice;

		choicesEl.appendChild(choiceBtn);
	}
};

const choiceClick = (e) => {
	const buttonEl = e.target;

	if (!buttonEl.matches('.choice')) {
		return;
	}

	if (buttonEl.value !== questions[questionIndex].answer) {
		time -= 20;

		if (time < 0) {
			time = 0;
		}

		timerEl.textContent = time;

		feedbackEl.textContent = 'Incorrect';
	} else {
		feedbackEl.textContent = 'Correct';
	}

	feedbackEl.setAttribute('class', 'feedback');
	setTimeout(function () {
		feedbackEl.setAttribute('class, feedback hide');
	}, 2000);

	questionIndex++;

	if (time <= 0 || questionIndex === questions.length) {
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
		let highscores = JSON.parse(localStorage.getItem('highscores'));

		const newScore = {
			score: time,
			initials: initials,
		};

		if (highscores) {
			highscores.push(newScore);
		} else {
			highscores = [newScore];
		}

		localStorage.setItem('highscores', JSON.stringify(highscores));

		location.href = 'highscores.html';
	}
};

const submission = (e) => {
	if (e.key === 'Enter') {
		saveScore();
	}
};

startBtn.onclick = quizStart;
choicesEl.onclick = choiceClick;
initialsEl.onkeyup = submission;
submitBtn.onclick = saveScore;
