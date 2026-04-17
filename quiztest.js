/*
ATTENTION

Now that I have your attention

THESE ARE THE TEMPLATE DIRECTIONS

To make a new quiz from this file:

1. Change the questions array to your new quiz questions.
2. Change the QUIZ_NAME value below.
3. Save the file with a new JavaScript filename if needed.

Example:
const QUIZ_NAME = "math";

This will automatically make the leaderboard use:
"quizmathLeaderboard"

You do NOT need to rename variables throughout the file.
Only change QUIZ_NAME.
*/

// This is the short name for the quiz
const QUIZ_NAME = "test";

// This creates the localStorage name for this quiz's leaderboard
const LEADERBOARD_KEY = "quiz" + QUIZ_NAME + "Leaderboard";

// These are the quiz questions and answers
const questions = [
    {
        question: "whats 1+1?",
        choices: [
            "2",
            "1",
            "2235234",
            "-1"
        ],
        answer: 0
    },
    {
        question: "Do you remember that this is just the template?",
        choices: ["no", "no", "yes", "no"],
        answer: 2
    },
    {
        question: "how do you spell question",
        choices: ["quetin", "kwestin", "question", "bruh"],
        answer: 2
    }
];

// These variables keep track of the quiz progress
let currentUser = "";
let currentQuestion = 0;
let score = 0;
let answered = false;

// These connect JavaScript to the HTML elements on the page
const nicknameInput = document.getElementById("nicknameInput");
const nameError = document.getElementById("nameError");
const loginBox = document.getElementById("loginBox");
const quizBox = document.getElementById("quizBox");
const welcomeText = document.getElementById("welcomeText");
const questionText = document.getElementById("questionText");
const choicesBox = document.getElementById("choicesBox");
const nextBtn = document.getElementById("nextBtn");
const scoreText = document.getElementById("scoreText");
const leaderboardList = document.getElementById("leaderboardList");
const startBtn = document.getElementById("startBtn");

// These make the buttons do something when clicked
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", goToNextQuestion);

// This starts the quiz after the user enters a nickname
function startQuiz() {
    const nickname = nicknameInput.value.trim();

    // This checks if the user left the nickname blank
    if (nickname === "") {
        nameError.textContent = "Please enter a nickname.";
        return;
    }

    // This resets quiz values for a new attempt
    currentUser = nickname;
    currentQuestion = 0;
    score = 0;
    answered = false;

    // This clears old messages and shows the quiz
    nameError.textContent = "";
    loginBox.style.display = "none";
    quizBox.style.display = "block";
    welcomeText.textContent = "Good luck, " + currentUser + "!";
    scoreText.textContent = "";

    // This shows the first question
    showQuestion();
}

// This displays the current question and answer choices
function showQuestion() {
    answered = false;
    nextBtn.style.display = "none";
    choicesBox.innerHTML = "";

    const q = questions[currentQuestion];
    questionText.textContent = q.question;

    // This makes a button for each answer choice
    let i = 0;
    while (i < q.choices.length) {
        const btn = document.createElement("button");
        btn.textContent = q.choices[i];
        btn.className = "choice-btn";
        btn.setAttribute("data-index", i);
        btn.addEventListener("click", selectAnswer);
        choicesBox.appendChild(btn);
        i++;
    }
}

// This runs when the user clicks an answer
function selectAnswer(event) {
    // This stops the user from answering more than once
    if (answered) {
        return;
    }

    answered = true;

    const selectedButton = event.target;
    const selectedIndex = Number(selectedButton.getAttribute("data-index"));
    const correctIndex = questions[currentQuestion].answer;
    const buttons = document.querySelectorAll(".choice-btn");

    // This disables all answer buttons after one is clicked
    let i = 0;
    while (i < buttons.length) {
        buttons[i].disabled = true;

        // This highlights the correct answer
        if (i === correctIndex) {
            buttons[i].classList.add("correct");
        }

        i++;
    }

    // This adds 1 point if the user got the answer right
    if (selectedIndex === correctIndex) {
        score++;
    } else {
        // This highlights the wrong answer the user picked
        selectedButton.classList.add("wrong");
    }

    // This shows the Next button
    nextBtn.style.display = "inline-block";
}

// This moves to the next question
function goToNextQuestion() {
    currentQuestion++;

    // If there are still questions left, show the next one
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        // If not, finish the quiz
        finishQuiz();
    }
}

// This runs when the quiz is over
function finishQuiz() {
    questionText.textContent = "Quiz Complete!";
    choicesBox.innerHTML = "";
    nextBtn.style.display = "none";
    scoreText.textContent = currentUser + ", your score is " + score + " out of " + questions.length + ".";

    // This saves the user's score
    saveScore(currentUser, score);

    // This refreshes the leaderboard on the page
    renderLeaderboard();

    // This creates a Play Again button
    const restartBtn = document.createElement("button");
    restartBtn.textContent = "Play Again";
    restartBtn.addEventListener("click", resetQuiz);
    choicesBox.appendChild(restartBtn);
}

// This saves the score to localStorage
function saveScore(name, userScore) {
    let leaderboard = JSON.parse(localStorage.getItem(LEADERBOARD_KEY));

    // If there is no leaderboard yet, start with an empty array
    if (leaderboard === null) {
        leaderboard = [];
    }

    // This adds the new score to the leaderboard
    leaderboard.push({
        name: name,
        score: userScore
    });

    // This sorts scores from highest to lowest
    leaderboard.sort(function(a, b) {
        return b.score - a.score;
    });

    // This saves the updated leaderboard back into localStorage
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(leaderboard));
}

// This shows the leaderboard on the page
function renderLeaderboard() {
    let leaderboard = JSON.parse(localStorage.getItem(LEADERBOARD_KEY));

    leaderboardList.innerHTML = "";

    // If there are no saved scores yet, show a message
    if (leaderboard === null || leaderboard.length === 0) {
        leaderboardList.innerHTML = "<li>No scores yet.</li>";
        return;
    }

    // This creates one list item for each saved score
    let i = 0;
    while (i < leaderboard.length) {
        const li = document.createElement("li");
        li.textContent = leaderboard[i].name + " - " + leaderboard[i].score;
        leaderboardList.appendChild(li);
        i++;
    }
}

// This resets the page so the user can take the quiz again
function resetQuiz() {
    loginBox.style.display = "block";
    quizBox.style.display = "none";
    nicknameInput.value = "";
    choicesBox.innerHTML = "";
    scoreText.textContent = "";
}

// This loads the leaderboard when the page first opens
renderLeaderboard();
