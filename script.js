const messages = [
    "The egg is judging you.",
    "Chicken said so.",
    "But the egg came first. (Or did it?)",
    "The chicken wants to know.",
    "Egg-cuse me?",
    "This is un-egg-acceptable.",
    "The chicken is disappointed.",
    "The egg is cracking up.",
    "Fine. The chicken will wait.",
    "Last chance. Cluck.",
    "Don't be shell-fish.",
    "You're really gonna wing it?",
    "That's not eggs-actly the spirit.",
    "The chickens demand an answer.",
    "Yolk's on you if you leave.",
    "One more tap. For the eggs.",
    "The egg came first. (We'll prove it.)",
    "Cluck yes. You know you want to.",
];

let messageIndex = 0;

function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${Math.min(currentSize * 1.4, 2.2)}em`;
    yesButton.classList.add('bounce-once');
    setTimeout(function () {
        yesButton.classList.remove('bounce-once');
    }, 400);
}

function handleYesClick() {
    window.location.href = "yes_page.html";
}
