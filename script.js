/* =====================================================
   CURSOR INTERATIVO
===================================================== */

const cursor = document.querySelector(".cursor");
const cursorLight = document.querySelector(".cursor-light");

document.addEventListener("mousemove", (e) => {

    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    cursorLight.style.left = e.clientX + "px";
    cursorLight.style.top = e.clientY + "px";

});


/* =====================================================
   EFEITO PARALLAX NA CÂMERA
===================================================== */

const camera = document.querySelector(".camera-container");

document.addEventListener("mousemove", (e) => {

    if (!camera) return;

    const x = (window.innerWidth / 2 - e.clientX) / 60;
    const y = (window.innerHeight / 2 - e.clientY) / 60;

    camera.style.transform =
        `translate(${x}px, ${y}px)`;

});


/* =====================================================
   MINI JOGO
   CAPTURE A LUZ
===================================================== */

const startGame = document.getElementById("start-game");
const target = document.getElementById("target");
const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");
const gameResult = document.getElementById("game-result");
const gameMessage = document.querySelector(".game-message");

let score = 0;
let gameRunning = false;


function moveTarget() {

    const areaWidth = gameArea.clientWidth;
    const areaHeight = gameArea.clientHeight;

    const targetSize = 35;

    const randomX =
        Math.random() * (areaWidth - targetSize);

    const randomY =
        Math.random() * (areaHeight - targetSize);

    target.style.left = randomX + "px";
    target.style.top = randomY + "px";

}


startGame.addEventListener("click", () => {

    score = 0;

    scoreDisplay.textContent = score;

    gameRunning = true;

    gameResult.textContent = "";

    target.style.display = "block";

    startGame.style.display = "none";

    gameMessage.style.display = "none";

    moveTarget();

});


target.addEventListener("click", () => {

    if (!gameRunning) return;

    score++;

    scoreDisplay.textContent = score;

    target.style.transform = "scale(2)";

    setTimeout(() => {

        target.style.transform = "";

    }, 100);

    if (score >= 5) {

        gameRunning = false;

        target.style.display = "none";

        gameResult.innerHTML =
            "🎉 CAPTURA PERFEITA! VOCÊ DOMINOU A LUZ.";

        startGame.textContent = "JOGAR NOVAMENTE";

        startGame.style.display = "block";

    } else {

        moveTarget();

    }

});


/* =====================================================
   FLASHCARDS
===================================================== */

function flipCard(card) {

    card.classList.toggle("flipped");

}


/* =====================================================
   PARTES DA CÂMERA
===================================================== */

const partTitle = document.getElementById("part-title");
const partDescription = document.getElementById("part-description");

const cameraLabels = document.querySelectorAll(".camera-label");

const parts = {

    "LENTE": {
        title: "LENTE",
        description:
            "A lente direciona e focaliza a luz que entra na câmera. Ela influencia o foco, o enquadramento e a perspectiva da fotografia."
    },

    "OBTURADOR": {
        title: "OBTURADOR",
        description:
            "O obturador controla durante quanto tempo a luz chega ao sensor. Velocidades diferentes podem congelar ou criar movimento na imagem."
    },

    "SENSOR": {
        title: "SENSOR",
        description:
            "O sensor recebe a luz e transforma essa informação em sinais elétricos que serão processados para formar a fotografia digital."
    },

    "FLASH": {
        title: "FLASH",
        description:
            "O flash produz uma fonte de luz adicional para iluminar uma cena, principalmente quando existe pouca iluminação disponível."
    }

};


cameraLabels.forEach(label => {

    label.addEventListener("mouseenter", () => {

        const name = label.textContent.trim();

        partTitle.textContent =
            parts[name].title;

        partDescription.textContent =
            parts[name].description;

    });

});


/* =====================================================
   QUIZ
===================================================== */

const questions = [

    {
        question:
            "Qual componente controla o tempo de exposição?",

        answers: [
            "Sensor",
            "Obturador",
            "Flash",
            "Visor"
        ],

        correct: 1
    },

    {
        question:
            "O que uma câmera digital utiliza para capturar a luz?",

        answers: [
            "Filme químico",
            "Papel",
            "Sensor",
            "Espelho"
        ],

        correct: 2
    },

    {
        question:
            "Qual elemento direciona a luz para dentro da câmera?",

        answers: [
            "Lente",
            "Bateria",
            "Cartão de memória",
            "Tripé"
        ],

        correct: 0
    },

    {
        question:
            "A fotografia depende principalmente de qual elemento?",

        answers: [
            "Som",
            "Luz",
            "Temperatura",
            "Velocidade"
        ],

        correct: 1
    },

    {
        question:
            "Qual destes dispositivos também possui câmera digital?",

        answers: [
            "Smartphone",
            "Lápis",
            "Régua",
            "Caderno"
        ],

        correct: 0
    }

];


let currentQuestion = 0;
let quizScore = 0;

const questionElement =
    document.getElementById("question");

const answersElement =
    document.getElementById("answers");

const questionNumber =
    document.getElementById("question-number");

const progressBar =
    document.getElementById("progress-bar");

const quizResult =
    document.getElementById("quiz-result");


function loadQuestion() {

    const q = questions[currentQuestion];

    questionElement.textContent =
        q.question;

    questionNumber.textContent =
        currentQuestion + 1;

    progressBar.style.width =
        ((currentQuestion + 1) / questions.length * 100) + "%";

    answersElement.innerHTML = "";

    q.answers.forEach((answer, index) => {

        const button =
            document.createElement("button");

        button.classList.add("answer");

        button.textContent = answer;

        button.addEventListener("click", () => {

            checkAnswer(index, button);

        });

        answersElement.appendChild(button);

    });

}


function checkAnswer(index, button) {

    const correct =
        questions[currentQuestion].correct;

    const buttons =
        document.querySelectorAll(".answer");

    buttons.forEach(btn => {

        btn.disabled = true;

    });


    if (index === correct) {

        button.classList.add("correct");

        quizScore++;

    } else {

        button.classList.add("wrong");

        buttons[correct].classList.add("correct");

    }


    setTimeout(() => {

        currentQuestion++;

        if (currentQuestion < questions.length) {

            loadQuestion();

        } else {

            finishQuiz();

        }

    }, 900);

}


function finishQuiz() {

    questionElement.textContent =
        "QUIZ FINALIZADO!";

    answersElement.innerHTML = "";

    progressBar.style.width = "100%";

    let message = "";

    if (quizScore === 5) {

        message =
            "🏆 PERFEITO! Você domina fotografia.";

    } else if (quizScore >= 3) {

        message =
            "⚡ MUITO BOM! Você conhece bastante sobre câmeras.";

    } else {

        message =
            "📸 Continue estudando e tente novamente.";

    }

    quizResult.innerHTML =
        `Você acertou <strong>${quizScore}/5</strong><br><br>${message}`;

}


/* =====================================================
   INICIAR QUIZ
===================================================== */

loadQuestion();


/* =====================================================
   ANIMAÇÃO DOS ELEMENTOS AO ENTRAR NA TELA
===================================================== */

const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        },
        {
            threshold: .15
        }
    );


document
    .querySelectorAll(
        ".process-card, .history-card, .flashcard, .timeline-item, .gallery-item, .video-card"
    )
    .forEach(element => {

        observer.observe(element);

    });


/* =====================================================
   EFEITO DE BRILHO AO PASSAR O MOUSE
===================================================== */

const interactiveElements =
    document.querySelectorAll(
        ".process-card, .history-card, .school-card, .students-card, .video-card"
    );


interactiveElements.forEach(element => {

    element.addEventListener("mousemove", (e) => {

        const rect =
            element.getBoundingClientRect();

        const x =
            e.clientX - rect.left;

        const y =
            e.clientY - rect.top;

        element.style.background =
            `radial-gradient(
                circle at ${x}px ${y}px,
                rgba(0,234,255,.10),
                #081018 45%
            )`;

    });


    element.addEventListener("mouseleave", () => {

        element.style.background =
            "#081018";

    });

});


/* =====================================================
   EFEITO DE TECLADO
===================================================== */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        document
            .querySelectorAll(".flashcard")
            .forEach(card => {

                card.classList.remove("flipped");

            });

    }

});


/* =====================================================
   MENU - SCROLL SUAVE
===================================================== */

document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", function(e) {

        e.preventDefault();

        const target =
            document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});