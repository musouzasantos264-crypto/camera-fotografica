/* =========================================
   CURSOR
========================================= */

const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

let mouseX = 0;
let mouseY = 0;

let followerX = 0;
let followerY = 0;

document.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
});

function animateCursor() {

    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;

    follower.style.left = followerX + "px";
    follower.style.top = followerY + "px";

    requestAnimationFrame(animateCursor);
}

animateCursor();


/* =========================================
   CURSOR HOVER
========================================= */

const interactiveElements = document.querySelectorAll(
    "a, button, .research-card, .fact-card, .timeline-content, .answer"
);

interactiveElements.forEach(element => {

    element.addEventListener("mouseenter", () => {
        follower.classList.add("hover");
    });

    element.addEventListener("mouseleave", () => {
        follower.classList.remove("hover");
    });

});


/* =========================================
   MENU MOBILE
========================================= */

const menuMobile = document.getElementById("menuMobile");
const nav = document.querySelector("nav");

menuMobile.addEventListener("click", () => {
    nav.classList.toggle("open");
});

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {
        nav.classList.remove("open");
    });

});


/* =========================================
   CAMERA PARALLAX
========================================= */

const cameraVisual = document.querySelector(".camera-visual");

document.addEventListener("mousemove", (e) => {

    if (!cameraVisual) return;

    const x = (window.innerWidth / 2 - e.clientX) / 50;
    const y = (window.innerHeight / 2 - e.clientY) / 50;

    cameraVisual.style.transform =
        `rotateY(${x}deg) rotateX(${y}deg)`;
});


/* =========================================
   MAGNETIC BUTTONS
========================================= */

document.querySelectorAll(".magnetic").forEach(button => {

    button.addEventListener("mousemove", (e) => {

        const rect = button.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform =
            `translate(${x * .15}px, ${y * .15}px)`;
    });

    button.addEventListener("mouseleave", () => {
        button.style.transform = "";
    });

});


/* =========================================
   RESEARCH MODAL
========================================= */

const modal = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");

const modalNumber = document.getElementById("modalNumber");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalFact = document.getElementById("modalFact");

const modalData = {

    history: {
        number: "01",
        title: "História da fotografia",
        text:
            "A história da fotografia está ligada ao estudo da luz e da óptica. Antes mesmo da fotografia existir, a câmera escura já era utilizada para observar como a luz poderia projetar uma imagem. Com o passar dos anos surgiram processos fotográficos, filmes, câmeras mais compactas e, posteriormente, tecnologias digitais.",
        fact:
            "A câmera escura é considerada um dos princípios fundamentais que ajudaram a desenvolver a fotografia."
    },

    camera: {
        number: "02",
        title: "Como funciona uma câmera?",
        text:
            "Uma câmera funciona controlando a entrada de luz. A luz entra pela lente, é direcionada e focalizada, passa pelo sistema de obturação e chega ao material fotossensível. Nas câmeras digitais, o sensor transforma essa informação luminosa em dados que formam a fotografia.",
        fact:
            "Uma fotografia pode ser entendida como o registro controlado da luz."
    },

    parts: {
        number: "03",
        title: "Partes da câmera",
        text:
            "Entre os principais componentes estão a lente, o obturador, o sensor ou filme, o visor e os controles de exposição. Cada parte possui uma função específica e todas trabalham juntas para registrar a imagem.",
        fact:
            "A lente não apenas amplia ou aproxima: ela também influencia o campo de visão, o foco e a aparência da fotografia."
    },

    evolution: {
        number: "04",
        title: "A evolução das câmeras",
        text:
            "As câmeras passaram por grandes transformações. Equipamentos antigos dependiam de processos mais complexos e filmes. Depois vieram as câmeras digitais, que utilizam sensores. Atualmente, os smartphones possuem câmeras pequenas e sofisticadas capazes de realizar processamento digital das imagens.",
        fact:
            "Atualmente, muitas pessoas carregam uma câmera no bolso sem perceber o nível de tecnologia presente em um celular."
    }

};

document.querySelectorAll(".research-card").forEach(card => {

    card.addEventListener("click", () => {

        const key = card.dataset.modal;
        const data = modalData[key];

        modalNumber.textContent = data.number;
        modalTitle.textContent = data.title;
        modalText.textContent = data.text;
        modalFact.textContent = data.fact;

        modal.classList.add("open");

        document.body.classList.add("no-scroll");
    });

});

function closeModal() {

    modal.classList.remove("open");
    document.body.classList.remove("no-scroll");
}

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {

    if (e.target === modal) {
        closeModal();
    }

});

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {
        closeModal();
    }

});


/* =========================================
   FACT CARDS
========================================= */

document.querySelectorAll(".fact-card").forEach(card => {

    card.addEventListener("click", () => {

        card.classList.toggle("flipped");

    });

});


/* =========================================
   MECANISMO INTERATIVO
========================================= */

const mechanismSteps = document.querySelectorAll(".mechanism-step");

mechanismSteps.forEach(step => {

    step.addEventListener("mouseenter", () => {

        mechanismSteps.forEach(item => {
            item.classList.remove("active");
        });

        step.classList.add("active");

    });

});


/* =========================================
   QUIZ
========================================= */

const questions = [

    {
        question:
            "O que uma câmera digital utiliza para registrar a luz?",
        answers: [
            "Filme fotográfico",
            "Sensor digital",
            "Papel",
            "Espelho"
        ],
        correct: 1
    },

    {
        question:
            "Qual componente controla o tempo de exposição?",
        answers: [
            "Obturador",
            "Flash",
            "Tripé",
            "Visor"
        ],
        correct: 0
    },

    {
        question:
            "O que é essencial para que uma fotografia seja formada?",
        answers: [
            "Som",
            "Calor",
            "Luz",
            "Vento"
        ],
        correct: 2
    },

    {
        question:
            "Qual destes é um princípio relacionado à origem da fotografia?",
        answers: [
            "Câmera escura",
            "Televisão",
            "Rádio",
            "Impressora"
        ],
        correct: 0
    },

    {
        question:
            "Qual equipamento moderno possui câmeras integradas?",
        answers: [
            "Celular",
            "Calculadora simples",
            "Relógio analógico",
            "Régua"
        ],
        correct: 0
    },

    {
        question:
            "Qual elemento influencia o enquadramento e o campo de visão?",
        answers: [
            "Lente",
            "Bateria",
            "Botão liga/desliga",
            "Cartão de memória"
        ],
        correct: 0
    }

];

let currentQuestion = 0;
let scoreQuiz = 0;
let answered = false;

const questionText = document.getElementById("questionText");
const questionNumber = document.getElementById("questionNumber");
const answersContainer = document.getElementById("answers");
const quizProgress = document.getElementById("quizProgress");
const quizResult = document.getElementById("quizResult");
const nextQuestion = document.getElementById("nextQuestion");

function loadQuestion() {

    answered = false;

    const question = questions[currentQuestion];

    questionNumber.textContent =
        `QUESTÃO ${String(currentQuestion + 1).padStart(2, "0")}`;

    questionText.textContent = question.question;

    answersContainer.innerHTML = "";

    quizResult.textContent = "";

    const progress =
        ((currentQuestion) / questions.length) * 100;

    quizProgress.style.width = `${progress}%`;

    question.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "answer";
        button.textContent = answer;

        button.addEventListener("click", () => {

            if (answered) return;

            answered = true;

            const buttons =
                answersContainer.querySelectorAll(".answer");

            buttons.forEach((btn, i) => {

                if (i === question.correct) {
                    btn.classList.add("correct");
                }

            });

            if (index === question.correct) {

                scoreQuiz++;

                quizResult.textContent =
                    "✓ CORRETO! Muito bem.";

            } else {

                button.classList.add("wrong");

                quizResult.textContent =
                    "✕ INCORRETO. Observe a resposta correta.";
            }

        });

        answersContainer.appendChild(button);

    });

}

nextQuestion.addEventListener("click", () => {

    if (!answered) {

        quizResult.textContent =
            "Escolha uma resposta primeiro.";

        return;
    }

    currentQuestion++;

    if (currentQuestion >= questions.length) {

        showQuizResult();

        return;
    }

    loadQuestion();

});

function showQuizResult() {

    quizProgress.style.width = "100%";

    questionNumber.textContent = "RESULTADO";

    questionText.textContent =
        `Você acertou ${scoreQuiz} de ${questions.length} perguntas!`;

    answersContainer.innerHTML = "";

    let message;

    if (scoreQuiz === questions.length) {
        message = "PERFEITO! Você domina a fotografia.";
    } else if (scoreQuiz >= 4) {
        message = "MUITO BOM! Você aprendeu bastante.";
    } else if (scoreQuiz >= 2) {
        message = "BOM COMEÇO! Continue explorando a pesquisa.";
    } else {
        message = "QUE TAL REVISAR OS TEMAS E TENTAR NOVAMENTE?";
    }

    quizResult.textContent = message;

    nextQuestion.textContent = "RECOMEÇAR";

    next