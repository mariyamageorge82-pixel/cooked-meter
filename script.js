const marks = document.getElementById("marks");
const sleep = document.getElementById("sleep");
const screen = document.getElementById("screen");

const marksValue = document.getElementById("marksValue");
const sleepValue = document.getElementById("sleepValue");
const screenValue = document.getElementById("screenValue");

const cookButton = document.getElementById("cookButton");
const result = document.getElementById("result");
const againButton = document.getElementById("againButton");

const scoreElement = document.getElementById("score");
const statusElement = document.getElementById("status");
const roastElement = document.getElementById("roast");

const meterFill = document.getElementById("meterFill");

const resultMarks = document.getElementById("resultMarks");
const resultSleep = document.getElementById("resultSleep");
const resultScreen = document.getElementById("resultScreen");

const confetti = document.getElementById("confetti");

// ========================================
// LIVE INPUT VALUES
// ========================================

function updateValues() {
marksValue.textContent = `${marks.value}%`;

sleepValue.textContent = `${sleep.value}h`;

screenValue.textContent = `${screen.value}h`;

}

marks.addEventListener("input", updateValues);
sleep.addEventListener("input", updateValues);
screen.addEventListener("input", updateValues);

// ========================================
// COOKED SCORE CALCULATOR
// ========================================

function calculateCooked() {
const mark = Number(marks.value);
const sleepHours = Number(sleep.value);
const screenHours = Number(screen.value);


/*
    EXAM MARKS

    Lower marks = more cooked.
*/

let markCook = 100 - mark;


/*
    SLEEP

    8 hours = basically fine.
    Less sleep = increasingly cooked.
*/

let sleepCook;

if (sleepHours >= 8) {

    sleepCook = 0;

} else {

    sleepCook = ((8 - sleepHours) / 8) * 100;

}


/*
    SCREEN TIME

    More screen time = more cooked.
*/

let screenCook = (screenHours / 16) * 100;


/*
    Weighted calculation

    Marks = 40%
    Sleep = 35%
    Screen = 25%
*/

let score =
    (markCook * 0.40) +
    (sleepCook * 0.35) +
    (screenCook * 0.25);


/*
    Small chaos bonus.

    Because this isn't supposed
    to be actual science.
*/

if (mark < 20 && sleepHours < 4) {
    score += 8;
}

if (screenHours >= 12) {
    score += 5;
}


score = Math.round(Math.min(100, Math.max(0, score)));

return score;

}

// ========================================
// STATUS + ROASTS
// ========================================

function getResult(score) {
if (score <= 15) {

    return {
        status: "ABSOLUTELY RAW 🥩",
        roast: "Bro isn't cooked. Bro is still in the refrigerator."
    };

}

if (score <= 30) {

    return {
        status: "BARELY WARM 😌",
        roast: "You're chilling. The kitchen hasn't even noticed you yet."
    };

}

if (score <= 45) {

    return {
        status: "SLIGHTLY TOASTED 🍞",
        roast: "A little crispy around the edges. Nothing catastrophic."
    };

}

if (score <= 60) {

    return {
        status: "MEDIUM RARE 🥩",
        roast: "The heat is on. You still have a chance."
    };

}

if (score <= 75) {

    return {
        status: "COOKED 🔥",
        roast: "Yeahhh... things are getting a little concerning."
    };

}

if (score <= 90) {

    return {
        status: "WELL DONE 💀",
        roast: "The kitchen called. They said it's over."
    };

}

return {
    status: "ABSOLUTELY CHARRED ☠️",
    roast: "There is no longer a person here. Only barbecue."
};

}

// ========================================
// NUMBER ANIMATION
// ========================================

function animateNumber(target) {
let current = 0;

const duration = 1500;

const start = performance.now();

function update(time) {

    const progress = Math.min(
        (time - start) / duration,
        1
    );

    const eased =
        1 - Math.pow(1 - progress, 4);

    current = Math.round(target * eased);

    scoreElement.textContent = current;

    if (progress < 1) {
        requestAnimationFrame(update);
    }

}

requestAnimationFrame(update);

}

// ========================================
// CONFETTI
// ========================================

function createConfetti() {
confetti.innerHTML = "";

const pieces = 90;

for (let i = 0; i < pieces; i++) {

    const piece = document.createElement("div");

    piece.className = "confetti-piece";

    piece.style.left =
        Math.random() * 100 + "%";

    piece.style.animationDelay =
        Math.random() * 0.8 + "s";

    piece.style.transform =
        `rotate(${Math.random() * 360}deg)`;

    piece.style.background =
        [
            "#ff6a00",
            "#ff1744",
            "#ffc400",
            "#ffffff"
        ][Math.floor(Math.random() * 4)];

    confetti.appendChild(piece);

}

setTimeout(() => {
    confetti.innerHTML = "";
}, 3500);

}

// ========================================
// BACKGROUND PARTICLES
// ========================================

function createParticles() {
const particleContainer =
    document.getElementById("particles");

for (let i = 0; i < 35; i++) {

    const particle =
        document.createElement("div");

    particle.className = "particle";

    particle.style.left =
        Math.random() * 100 + "%";

    particle.style.animationDuration =
        (5 + Math.random() * 8) + "s";

    particle.style.animationDelay =
        Math.random() * 8 + "s";

    particle.style.opacity =
        Math.random();

    particleContainer.appendChild(particle);

}

}

createParticles();

// ========================================
// CALCULATE BUTTON
// ========================================

cookButton.addEventListener("click", () => {
const cookedScore = calculateCooked();

const resultData = getResult(cookedScore);


// Update stats

resultMarks.textContent =
    `${marks.value}%`;

resultSleep.textContent =
    `${sleep.value}h`;

resultScreen.textContent =
    `${screen.value}h`;


// Update text

statusElement.textContent =
    resultData.status;

roastElement.textContent =
    resultData.roast;


// Reset score

scoreElement.textContent = "0";

meterFill.style.width = "0%";


// Show result

result.classList.remove("hidden");


// Let browser render first

requestAnimationFrame(() => {

    meterFill.style.width =
        `${cookedScore}%`;

    animateNumber(cookedScore);

});


// Scroll to result

setTimeout(() => {

    result.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}, 100);


// Effects based on score

if (cookedScore >= 75) {

    document.body.classList.remove("shake");

    void document.body.offsetWidth;

    document.body.classList.add("shake");

}


// Confetti if you're not completely doomed

if (cookedScore <= 30) {

    createConfetti();

}

});

// ========================================
// CALCULATE AGAIN
// ========================================

againButton.addEventListener("click", () => {
result.classList.add("hidden");

window.scrollTo({
    top: 0,
    behavior: "smooth"
});

});

// ========================================
// INITIAL VALUES
// ========================================

updateValues();
