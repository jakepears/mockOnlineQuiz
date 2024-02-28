/** @format */

const showScores = () => {
	const scores = JSON.parse(localStorage.getItem('scores'));
	scores.sort(function (a, b) {
		return b.score - a.score;
	});

	for (let i = 0; i < scores.length; i += 1) {
		const scoresList = document.createElement('li');
		scoresList.textContent = scores[i].initials + ' - ' + scores[i].score;

		const scoresId = document.getElementById('scores');
		scoresId.appendChild(scoresList);
	}
};

document.getElementById('clear').onclick = clearHighscores;

printHighscores();
