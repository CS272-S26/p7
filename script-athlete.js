document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    
    // Hint Data for each athlete
    const hintData = {
        "michael jordan": ["I wore the number 23 for most of my career.", "I starred in the original Space Jam movie."],
        "muhammad ali": ["My birth name was Cassius Clay.", "I famously refused to be drafted into the Vietnam War."],
        "serena williams": ["My sister Venus is also a legendary tennis champion.", "I won the 2017 Australian Open while eight weeks pregnant."],
        "lionel messi": ["I spent the majority of my career playing for FC Barcelona.", "My nickname is 'La Pulga' (The Flea)."],
        "michael phelps": ["I have a massive 6-foot-7-inch wingspan.", "I am the only athlete to win eight gold medals in one Olympic Games."],
        "wayne gretzky": ["I played most of my career for the Edmonton Oilers and LA Kings.", "My jersey number 99 is retired league-wide by the NHL."],
        "usain bolt": ["I am from Jamaica and known for my lightning bolt pose.", "I holds the world record for the 100m sprint at 9.58 seconds."],
        "simone biles": ["I am the first female gymnast to land a Yurchenko double pike vault.", "I took a break during the Tokyo 2021 Olympics to prioritize my mental health."],
        "tiger woods": ["I am the youngest player to ever win the Career Grand Slam in golf.", "I won the 1997 Masters by a record-breaking 12 strokes."]
    };

    cards.forEach(card => {
        const input = card.querySelector('.athlete-guess');
        const button = card.querySelector('.submit-btn');
        const image = card.querySelector('.athlete-img');
        const hintBtn = card.querySelector('.hint-btn');
        const hintText = card.querySelector('.hint-text');
        const correctAnswer = input.getAttribute('data-answer').toLowerCase();
        
        let hintCount = 0;

        // Guess Logic
        button.addEventListener('click', () => {
            const userGuess = input.value.trim().toLowerCase();
            if (userGuess === correctAnswer) {
                revealAthlete(card, image, button, input);
            } else {
                button.classList.add('shake');
                setTimeout(() => button.classList.remove('shake'), 500);
                input.classList.add('is-invalid');
                setTimeout(() => input.classList.remove('is-invalid'), 1000);
            }
        });

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') button.click();
        });

        // Hint Logic
        hintBtn.addEventListener('click', () => {
            if (hintCount === 0) {
                if (confirm("Would you like to see the first hint?")) {
                    hintText.textContent = "Hint 1: " + hintData[correctAnswer][0];
                    hintBtn.textContent = "Get Second Hint";
                    hintCount++;
                }
            } else if (hintCount === 1) {
                if (confirm("Would you like to see the second hint?")) {
                    hintText.textContent = "Hint 2: " + hintData[correctAnswer][1];
                    hintBtn.textContent = "Reveal Answer";
                    hintBtn.classList.remove('btn-outline-secondary');
                    hintBtn.classList.add('btn-outline-warning');
                    hintCount++;
                }
            } else if (hintCount === 2) {
                if (confirm("Are you sure you want to reveal the answer?")) {
                    input.value = correctAnswer.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                    revealAthlete(card, image, button, input);
                    hintBtn.disabled = true;
                    hintBtn.textContent = "Answer Revealed";
                }
            }
        });
    });

    function revealAthlete(card, image, button, input) {
        image.classList.add('revealed');
        button.classList.remove('btn-primary');
        button.classList.add('btn-success');
        button.textContent = 'Correct!';
        input.disabled = true;
        const hintBtn = card.querySelector('.hint-btn');
        if (hintBtn) hintBtn.disabled = true;
    }
});
