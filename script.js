// ============================================================
// 💕 DATE ME — CONFIGURATION
// ============================================================

const CONFIG = {
  herName: "Bhavna Dwivedi (Silent Sunshine ❤️)",

  question: "Would you like to go out with me? ❤️",

  noMessages: [
    "Nice try. 😌",
    "Oops... the NO button is shy. 😂",
    "You really thought I'd let me click that? 😏",
    "NO is currently unavailable. Please select YES. ❤️",
    "Wait... where did the NO button go? 🏃‍♂️💨",
    "The button has chosen freedom. 😂",
    "Wrong button! Try the suspiciously attractive YES. 😌",
    "Okay, this is getting embarrassing for the NO button. 😂",
    "I think the universe is trying to tell you something... ✨",
    "Still trying? I respect the determination. 😂",
    "Fine... I'll make NO even harder. 😈",
    "At this point, YES is basically inevitable. ❤️"
  ],

  successTitle: "YAYYYYY! ❤️",

  successMessage:
    "You have officially accepted my invitation to go out with me. 😎❤️",

  finalNote:
    "I knew you'd make the right choice. 😌<br>" +
    "Now get ready for a very good time with me. ❤️"
};


// ============================================================
// ELEMENTS
// ============================================================

const questionCard =
  document.getElementById("questionCard");

const successCard =
  document.getElementById("successCard");

const yesBtn =
  document.getElementById("yesBtn");

const noBtn =
  document.getElementById("noBtn");

const againBtn =
  document.getElementById("againBtn");

const attemptsText =
  document.getElementById("attemptsText");

const hintText =
  document.getElementById("hintText");

const toast =
  document.getElementById("toast");

const confettiContainer =
  document.getElementById("confettiContainer");

const heartsContainer =
  document.querySelector(".hearts");


// ============================================================
// PERSONALIZATION
// ============================================================

document
  .querySelectorAll(".name")
  .forEach((element) => {
    element.textContent = CONFIG.herName;
  });


const questionText =
  document.getElementById("questionText");

if (questionText) {
  questionText.textContent = CONFIG.question;
}


const successTitle =
  document.querySelector(".success-card h2");

if (successTitle) {
  successTitle.textContent =
    CONFIG.successTitle;
}


const successMessage =
  document.querySelector(".success-message");

if (successMessage) {
  successMessage.textContent =
    CONFIG.successMessage;
}


const finalNote =
  document.querySelector(".final-note");

if (finalNote) {
  finalNote.innerHTML =
    CONFIG.finalNote;
}


// ============================================================
// VARIABLES
// ============================================================

let noAttempts = 0;

let noButtonRunning = false;

let toastTimer = null;


// ============================================================
// TOAST
// ============================================================

function showToast(message) {

  if (!toast) {
    return;
  }

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {

    toast.classList.remove("show");

  }, 1800);
}


// ============================================================
// GET RANDOM SAFE POSITION
// ============================================================
//
// This version calculates the button's position using the
// ACTUAL viewport and the ACTUAL button dimensions.
//
// The button can never intentionally be placed outside
// the screen.
// ============================================================

function getSafePosition() {

  const margin = 20;

  const buttonWidth =
    noBtn.getBoundingClientRect().width || 120;

  const buttonHeight =
    noBtn.getBoundingClientRect().height || 50;


  const screenWidth =
    window.innerWidth;

  const screenHeight =
    window.innerHeight;


  // Leave a little room at the top.
  const minTop = 80;


  // Maximum X and Y positions.

  const maxLeft =
    Math.max(
      margin,
      screenWidth -
        buttonWidth -
        margin
    );


  const maxTop =
    Math.max(
      minTop,
      screenHeight -
        buttonHeight -
        margin
    );


  const x =
    Math.random() *
      Math.max(
        1,
        maxLeft - margin
      ) +
    margin;


  const y =
    Math.random() *
      Math.max(
        1,
        maxTop - minTop
      ) +
    minTop;


  return {
    x: Math.round(x),
    y: Math.round(y)
  };
}


// ============================================================
// MOVE NO BUTTON
// ============================================================

function moveNoButton() {

  noAttempts++;


  // ==========================================================
  // CHANGE BUTTON TO FIXED POSITIONING
  // ==========================================================

  if (!noButtonRunning) {

    noButtonRunning = true;


    // IMPORTANT:
    // Remove any CSS positioning that could interfere.

    noBtn.style.position =
      "fixed";

    noBtn.style.right =
      "auto";

    noBtn.style.bottom =
      "auto";

    noBtn.style.margin =
      "0";

    noBtn.style.zIndex =
      "99999";

    noBtn.style.visibility =
      "visible";

    noBtn.style.opacity =
      "1";

    noBtn.style.display =
      "block";

    noBtn.style.pointerEvents =
      "auto";

  }


  // ==========================================================
  // RANDOM POSITION
  // ==========================================================

  const position =
    getSafePosition();


  noBtn.style.left =
    `${position.x}px`;

  noBtn.style.top =
    `${position.y}px`;


  // ==========================================================
  // FUNNY MESSAGE
  // ==========================================================

  const messageIndex =
    (noAttempts - 1) %
    CONFIG.noMessages.length;


  const message =
    CONFIG.noMessages[
      messageIndex
    ];


  // ==========================================================
  // COUNTER
  // ==========================================================

  if (attemptsText) {

    attemptsText.textContent =
      noAttempts === 1
        ? "NO attempt detected. 😂"
        : `${noAttempts} attempts... still no NO. 😂`;

  }


  // ==========================================================
  // HINT
  // ==========================================================

  if (hintText) {

    hintText.textContent =
      message;

  }


  showToast(message);


  // ==========================================================
  // YES BUTTON GROWS SLIGHTLY
  // ==========================================================

  const scale =
    Math.min(
      1.15,
      1 +
        noAttempts *
        0.01
    );


  yesBtn.style.transform =
    `scale(${scale})`;
}


// ============================================================
// NO BUTTON
// ============================================================
//
// ONE event only.
// Works on:
// ✔ Android
// ✔ iPhone
// ✔ Desktop
// ✔ Tablet
// ============================================================

noBtn.addEventListener(
  "pointerdown",
  function (event) {

    event.preventDefault();

    event.stopPropagation();

    moveNoButton();

  }
);


// ============================================================
// YES BUTTON
// ============================================================

yesBtn.addEventListener(
  "click",
  celebrate
);


// ============================================================
// SUCCESS
// ============================================================

function celebrate() {

  questionCard.classList.add(
    "hidden"
  );

  successCard.classList.remove(
    "hidden"
  );


  // Hide NO after YES is selected.
  noBtn.style.display =
    "none";


  document.body.style.overflow =
    "hidden";


  createConfetti();

  createBurstHearts();
}


// ============================================================
// RESET
// ============================================================

function resetGame() {

  noAttempts = 0;

  noButtonRunning = false;


  noBtn.style.position =
    "";

  noBtn.style.left =
    "";

  noBtn.style.top =
    "";

  noBtn.style.right =
    "";

  noBtn.style.bottom =
    "";

  noBtn.style.margin =
    "";

  noBtn.style.zIndex =
    "";

  noBtn.style.visibility =
    "";

  noBtn.style.opacity =
    "";

  noBtn.style.display =
    "";

  noBtn.style.pointerEvents =
    "";


  noBtn.classList.remove(
    "running"
  );


  yesBtn.style.transform =
    "";


  if (hintText) {

    hintText.textContent =
      "Choose carefully. This decision may have consequences. 😌";

  }


  if (attemptsText) {

    attemptsText.textContent =
      "";

  }


  successCard.classList.add(
    "hidden"
  );

  questionCard.classList.remove(
    "hidden"
  );


  document.body.style.overflow =
    "";
}


// ============================================================
// AGAIN BUTTON
// ============================================================

if (againBtn) {

  againBtn.addEventListener(
    "click",
    resetGame
  );

}


// ============================================================
// CONFETTI
// ============================================================

function createConfetti() {

  if (!confettiContainer) {
    return;
  }


  confettiContainer.innerHTML =
    "";


  const count =
    window.innerWidth < 600
      ? 90
      : 140;


  const colors = [
    "#ff4f81",
    "#ffb3c7",
    "#ffd166",
    "#8ecae6",
    "#b8e986"
  ];


  for (
    let i = 0;
    i < count;
    i++
  ) {

    const piece =
      document.createElement(
        "span"
      );


    piece.className =
      "confetti";


    piece.style.left =
      `${Math.random() * 100}%`;


    piece.style.animationDuration =
      `${2.5 + Math.random() * 2.2}s`;


    piece.style.animationDelay =
      `${Math.random() * 0.8}s`;


    piece.style.setProperty(
      "--drift",
      `${-120 + Math.random() * 240}px`
    );


    piece.style.background =
      colors[
        Math.floor(
          Math.random() *
            colors.length
        )
      ];


    confettiContainer.appendChild(
      piece
    );

  }


  setTimeout(() => {

    confettiContainer.innerHTML =
      "";

  }, 6000);
}


// ============================================================
// HEART BURST
// ============================================================

function createBurstHearts() {

  const symbols = [
    "❤️",
    "💕",
    "💖",
    "💗",
    "✨"
  ];


  for (
    let i = 0;
    i < 25;
    i++
  ) {

    const heart =
      document.createElement(
        "span"
      );


    heart.className =
      "heart";


    heart.textContent =
      symbols[
        Math.floor(
          Math.random() *
            symbols.length
        )
      ];


    heart.style.left =
      `${Math.random() * 100}%`;


    heart.style.fontSize =
      `${14 + Math.random() * 22}px`;


    heart.style.animationDuration =
      `${3 + Math.random() * 3}s`;


    document.body.appendChild(
      heart
    );


    setTimeout(() => {

      heart.remove();

    }, 7000);

  }
}


// ============================================================
// FLOATING BACKGROUND HEARTS
// ============================================================

setInterval(() => {

  if (
    !successCard.classList.contains(
      "hidden"
    )
  ) {
    return;
  }


  if (!heartsContainer) {
    return;
  }


  const heart =
    document.createElement(
      "span"
    );


  heart.className =
    "heart";


  heart.textContent =
    "♡";


  heart.style.left =
    `${Math.random() * 100}%`;


  heart.style.fontSize =
    `${14 + Math.random() * 18}px`;


  heart.style.animationDuration =
    `${7 + Math.random() * 6}s`;


  heartsContainer.appendChild(
    heart
  );


  setTimeout(() => {

    heart.remove();

  }, 14000);

}, 900);


// ============================================================
// HANDLE RESIZE / ROTATION
// ============================================================

window.addEventListener(
  "resize",
  () => {

    if (!noButtonRunning) {
      return;
    }


    if (
      !successCard.classList.contains(
        "hidden"
      )
    ) {
      return;
    }


    const position =
      getSafePosition();


    noBtn.style.position =
      "fixed";

    noBtn.style.left =
      `${position.x}px`;

    noBtn.style.top =
      `${position.y}px`;

    noBtn.style.right =
      "auto";

    noBtn.style.bottom =
      "auto";

    noBtn.style.visibility =
      "visible";

    noBtn.style.opacity =
      "1";

    noBtn.style.display =
      "block";

  }
);


// ============================================================
// EMERGENCY VISIBILITY CHECK
// ============================================================
//
// Every 200ms we check whether the NO button somehow ended
// up outside the screen.
//
// If it did, immediately bring it back.
//
// This means it cannot remain lost.
// ============================================================

setInterval(() => {

  if (!noButtonRunning) {
    return;
  }


  if (
    !successCard.classList.contains(
      "hidden"
    )
  ) {
    return;
  }


  const rect =
    noBtn.getBoundingClientRect();


  const width =
    noBtn.offsetWidth;

  const height =
    noBtn.offsetHeight;


  const viewportWidth =
    window.innerWidth;

  const viewportHeight =
    window.innerHeight;


  const outside =
    rect.left < 0 ||
    rect.top < 50 ||
    rect.right > viewportWidth ||
    rect.bottom > viewportHeight ||
    width === 0 ||
    height === 0;


  if (outside) {

    const position =
      getSafePosition();


    noBtn.style.position =
      "fixed";

    noBtn.style.left =
      `${position.x}px`;

    noBtn.style.top =
      `${position.y}px`;

    noBtn.style.right =
      "auto";

    noBtn.style.bottom =
      "auto";

    noBtn.style.zIndex =
      "99999";

    noBtn.style.visibility =
      "visible";

    noBtn.style.opacity =
      "1";

    noBtn.style.display =
      "block";

    noBtn.style.pointerEvents =
      "auto";
  }

}, 200);