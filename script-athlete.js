document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const input = card.querySelector('.athlete-guess');
        const button = card.querySelector('.submit-btn');
        const image = card.querySelector('.athlete-img');
        const correctAnswer = input.getAttribute('data-answer');
        button.addEventListener('click', () => {
            const userGuess = input.value.trim().toLowerCase();
            if (userGuess === correctAnswer) {
                image.classList.add('revealed');
                button.classList.remove('btn-primary');
                button.classList.add('btn-success');
                button.textContent = 'Correct!';
                input.disabled = true;
            } else {
                button.classList.add('shake');
                setTimeout(() => {
                    button.classList.remove('shake');
                }, 500);
                input.classList.add('is-invalid');
                setTimeout(() => {
                    input.classList.remove('is-invalid');
                }, 1000);
            }
        });
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                button.click();
            }
        });
    });
});
