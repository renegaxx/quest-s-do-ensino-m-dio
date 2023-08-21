const questionElement = document.getElementById('question');
const questionImageElement = document.getElementById('question-image');
const answerButtons = document.getElementById('answer-buttons');
const resultContainer = document.getElementById('result-container');
const resultElement = document.getElementById('result');
const nextButton = document.getElementById('next-button');

let currentQuestionIndex = 0;
let score = 0;
let chances = 2;
const questions = [

    {
        question: 'Qual a Formula da Agua?',
        image: 'agua.png',
        
        answers: [
            { text: 'A. o2', correct: false },
            { text: 'B. Co2', correct: false },
            { text: 'C. H2o', correct: true },
            { text: 'D. N2', correct: false }
        ]
    },
    
    {
        question: 'Qual é o maior planeta do sistema solar?',
        image: 'sistema.png',
        answers: [
            { text: 'A. Júpiter', correct: true },
            { text: 'B. Terra', correct: false },
            { text: 'C. Vênus', correct: false },
            { text: 'D. Marte', correct: false }
        ]
    },
    {
        question: 'Em que época os navios negreiros chegaram?',
        image: 'navio1.jpg',
        answers: [
            { text: 'ano de 2000 até 2023', correct: false },
            { text: 'ano de 1370 até 1500', correct: false },
            { text: 'ano de 1430 até 1800', correct: false },
            { text: 'ano de 1550 até 1855', correct: true }
        ]
    },
    {
        question: 'Oque é a sétima arte?',
        image: 'arte-geral.png',
        answers: [
            { text: 'estádio de Futebol de páris', correct: false },
            { text: 'torre eiffel', correct: false },
            { text: 'Cinema', correct: true },
            { text: 'Torta escocesa', correct: false }
        ]
    },
    {
        question: 'Quem é o nego mais lindo do mundo?',
        image: 'pessoas.jpg',
        answers: [
            { text: 'Renan', correct: true },
            { text: 'Samuel', correct: false },
            { text: 'Diego', correct: false },
            { text: 'Isaque', correct: false }
        ]
    },
];




function showQuestion(question) {
    questionElement.innerText = question.question;
    questionImageElement.src = question.image;

    answerButtons.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtons.appendChild(button);
    });
}

function selectAnswer(answer) {
    if (answer.correct) {
        resultElement.innerText = 'Resposta correta!';
        resultElement.style.color = 'green';
        resultContainer.classList.remove('hidden');
        answerButtons.classList.add('hidden');

        answerButtons.querySelectorAll('.btn').forEach(button => {
            if (button.innerText === answer.text) {
                button.classList.add('correct');
            } else {
                button.classList.add('wrong');
                button.disabled = true;
            }
        });

    } else {
        chances--;
        if (chances > 0) {
            resultElement.innerText = 'Resposta incorreta! Tente novamente.';
            resultElement.style.color = 'red';
        } else {
            resultElement.innerText = 'Você errou duas vezes. Tente a próxima pergunta.';
            resultElement.style.color = 'red';
            nextButton.innerText = 'Próxima Pergunta';
        }
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        resultContainer.classList.add('hidden');
        answerButtons.classList.remove('hidden');
        nextButton.innerText = 'Responder';
    } else {
        questionElement.innerText = 'Fim do Quiz!';
        questionImageElement.src = '';
        answerButtons.innerHTML = '';
        resultContainer.classList.remove('hidden');
        nextButton.classList.add('hidden');
    }
}

nextButton.addEventListener('click', () => {
    if (chances === 0 || currentQuestionIndex === questions.length) {
        currentQuestionIndex = 0;
        chances = 2;
        showQuestion(questions[currentQuestionIndex]);
        nextButton.innerText = 'Responder';
        resultContainer.classList.add('hidden');
        answerButtons.classList.remove('hidden');
    } else {
        nextQuestion();
    }
});

showQuestion(questions[currentQuestionIndex]);


