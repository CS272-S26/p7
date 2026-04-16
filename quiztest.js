/* 
ATTENTION
BEFORE USING THIS FOR MAKING A QUIZ

THIS IS JUST A TEMPLATE

YOU HAVE TO CHANGE EVERYWHERE THAT IT SAYS "test" infront of "leaderboard" TO WHAT YOU WANT TO MAKE A QUIZ ON

FOR EXAMPLE testleaderBoard would turn into lebronleaderBoard or whatever you want

you have to do it everywhere so all of the leaderboards stay separated

THANK YOU FOR YOUR ATTENTION

*/









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

let currentUser = "";
let currentQuestion = 0;
let score = 0;
let answered = false;

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

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", goToNextQuestion);

function startQuiz() {
    const nickname = nicknameInput.value.trim();

    if (nickname === "") {
        nameError.textContent = "Please enter a nickname.";
        return;
    }

    currentUser = nickname;
    currentQuestion = 0;
    score = 0;
    answered = false;

    nameError.textContent = "";
    loginBox.style.display = "none";
    quizBox.style.display = "block";
    welcomeText.textContent = "Good luck, " + currentUser + "!";
    scoreText.textContent = "";

    showQuestion();
}

function showQuestion() {
    answered = false;
    nextBtn.style.display = "none";
    choicesBox.innerHTML = "";

    const q = questions[currentQuestion];
    questionText.textContent = q.question;

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

function selectAnswer(event) {
    if (answered) {
        return;
    }

    answered = true;

    const selectedButton = event.target;
    const selectedIndex = Number(selectedButton.getAttribute("data-index"));
    const correctIndex = questions[currentQuestion].answer;
    const buttons = document.querySelectorAll(".choice-btn");

    let i = 0;
    while (i < buttons.length) {
        buttons[i].disabled = true;

        if (i === correctIndex) {
            buttons[i].classList.add("correct");
        }

        i++;
    }

    if (selectedIndex === correctIndex) {
        score++;
    } else {
        selectedButton.classList.add("wrong");
    }

    nextBtn.style.display = "inline-block";
}

function goToNextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    questionText.textContent = "Quiz Complete!";
    choicesBox.innerHTML = "";
    nextBtn.style.display = "none";
    scoreText.textContent = currentUser + ", your score is " + score + " out of " + questions.length + ".";

    saveScore(currentUser, score);
    renderLeaderboard();

    const restartBtn = document.createElement("button");
    restartBtn.textContent = "Play Again";
    restartBtn.addEventListener("click", resetQuiz);
    choicesBox.appendChild(restartBtn);
}

function saveScore(name, userScore) {
    let testLeaderboard = JSON.parse(localStorage.getItem("quiztestLeaderboard"));

    if (testLeaderboard === null) {
        testLeaderboard = [];
    }

    testLeaderboard.push({
        name: name,
        score: userScore
    });

    testLeaderboard.sort(function(a, b) {
        return b.score - a.score;
    });

    localStorage.setItem("quiztestLeaderboard", JSON.stringify(testLeaderboard));
}

function renderLeaderboard() {
    let testLeaderboard = JSON.parse(localStorage.getItem("quiztestLeaderboard"));

    leaderboardList.innerHTML = "";

    if (testLeaderboard === null || testLeaderboard.length === 0) {
        leaderboardList.innerHTML = "<li>No scores yet.</li>";
        return;
    }

    let i = 0;
    while (i < testLeaderboard.length) {
        const li = document.createElement("li");
        li.textContent = testLeaderboard[i].name + " - " + testLeaderboard[i].score;
        leaderboardList.appendChild(li);
        i++;
    }
}

function resetQuiz() {
    loginBox.style.display = "block";
    quizBox.style.display = "none";
    nicknameInput.value = "";
    choicesBox.innerHTML = "";
    scoreText.textContent = "";
}

renderLeaderboard();