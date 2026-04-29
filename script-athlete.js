document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    
    // Hint Data for each athlete
    const hintData = {
        "michael jordan": [
            "He starred alongside Bugs Bunny in a movie about a high-stakes space basketball game.",
            "He has his own silhouette on billions of sneakers worldwide."
        ],
        "muhammad ali": [
            "He famously claimed he could \"float like a butterfly and sting like a bee.\"",
            "He was known as \"The Louisville Lip\" for his poetic and rhythmic trash-talking."
        ],
        "serena williams": [
            "She won the Australian Open in 2017 while she was eight weeks pregnant.",
            "Her sister is also a world-class tennis champion who has won seven Grand Slams herself."
        ],
        "lionel messi": [
            "He is often nicknamed \"La Pulga\" (The Flea) because of his short height and insane agility.",
            "He spent nearly his entire professional career wearing the number 10 for Barcelona."
        ],
        "michael phelps": [
            "He has a wingspan of 6'7\", which is actually several inches longer than his actual height.",
            "He once \"raced\" a Great White Shark for a Discovery Channel special (though it was CGI)."
        ],
        "wayne gretzky": [
            "His jersey number, 99, is the only number retired by every single team in his entire league.",
            "He has more career assists than any other player has total points."
        ],
        "usain bolt": [
            "He famously ate Chicken McNuggets for almost every meal during the 2008 Beijing Olympics.",
            "He holds the record for the highest recorded human top speed, clocked at about 27.8 mph."
        ],
        "simone biles": [
            "She is widely referred to by the acronym G.O.A.T., and she often wears a leotard with a literal goat head on it.",
            "She was the first woman to land a \"Yurchenko double pike\"—a move so hard most men won't try it—in international competition."
        ],
        "tiger woods": [
            "He is named after a Vietnamese colonel who was a close friend of his father during the war.",
            "He won the 1997 Masters by a record-shattering 12 strokes at just 21 years old."
        ]
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
                    hintText.innerHTML = "Hint 1: " + hintData[correctAnswer][0];
                    hintBtn.textContent = "Get Second Hint";
                    hintCount++;
                }
            } else if (hintCount === 1) {
                if (confirm("Would you like to see the second hint?")) {
                    hintText.innerHTML += "<br>Hint 2: " + hintData[correctAnswer][1];
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
