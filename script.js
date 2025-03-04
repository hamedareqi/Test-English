const allQuestions = {
    unit1: {
        lesson: [
            { question: "What is the synonym of 'happy'?", options: ["sad", "joyful", "angry"], answer: "joyful" },
            { question: "What is the opposite of 'hot'?", options: ["cold", "warm", "heat"], answer: "cold" },
            { question: "What is the plural of 'child'?", options: ["childs", "children", "childes"], answer: "children" },
            { question: "What is the past tense of 'go'?", options: ["went", "goed", "gone"], answer: "went" },
            { question: "What is the meaning of 'quick'?", options: ["slow", "fast", "lazy"], answer: "fast" },
            { question: "What is the synonym of 'big'?", options: ["small", "large", "tiny"], answer: "large" },
            { question: "What is the opposite of 'light'?", options: ["dark", "bright", "heavy"], answer: "dark" },
            { question: "What is the plural of 'mouse'?", options: ["mouses", "mice", "mousees"], answer: "mice" },
            { question: "What is the past tense of 'eat'?", options: ["eated", "ate", "eaten"], answer: "ate" },
            { question: "What is the meaning of 'brave'?", options: ["cowardly", "fearless", "shy"], answer: "fearless" }
        ],
        grammar: [
            { question: "Choose the correct sentence:", options: ["He go to school.", "He goes to school.", "He going to school."], answer: "He goes to school." },
            { question: "Which sentence is in the present continuous tense?", options: ["I eat breakfast.", "I am eating breakfast.", "I ate breakfast."], answer: "I am eating breakfast." },
            { question: "What is the correct form of the verb in this sentence: 'She ____ to the store.'?", options: ["go", "goes", "going"], answer: "goes" },
            { question: "Which word is a noun?", options: ["run", "quickly", "happiness"], answer: "happiness" },
            { question: "What is the correct plural form of 'book'?", options: ["bookes", "books", "bookies"], answer: "books" },
            { question: "Which sentence is in the past tense?", options: ["I will go to the park.", "I am going to the park.", "I went to the park."], answer: "I went to the park." },
            { question: "What is the correct form of the verb in this sentence: 'They ____ playing football.'?", options: ["is", "are", "am"], answer: "are" },
            { question: "Which word is an adjective?", options: ["quickly", "happiness", "beautiful"], answer: "beautiful" },
            { question: "What is the correct form of the verb in this sentence: 'He ____ a book every day.'?", options: ["read", "reads", "reading"], answer: "reads" },
            { question: "Which sentence is in the future tense?", options: ["I go to school.", "I will go to school.", "I went to school."], answer: "I will go to school." }
        ]
    },
    // يمكنك إضافة المزيد من الوحدات هنا بنفس الهيكل
};

let currentLanguage = 'en';
let selectedUnits = [];
let currentQuestionIndex = 0;
let score = 0;
let quizQuestions = [];

const translations = {
    en: {
        title: "English Quiz",
        description: "Select the units and number of questions for each unit to start the quiz.",
        startQuiz: "Start Quiz",
        nextQuestion: "Next Question",
        results: "Quiz Results",
        score: "You scored {score} out of {total}.",
        unit: "Unit",
        lesson: "Lesson",
        grammar: "Grammar",
        switchLanguage: "Switch to Arabic",
        correctFeedbacks: [
            "Well done! 🎉", "Great job! 👍", "You're on fire! 🔥", "Fantastic! 🌟", "Incredible! 🚀",
            "Keep it up! 💪", "You nailed it! 🎯", "Awesome! 🙌", "Perfect! 👌", "Excellent! 🥇",
            "Brilliant! ✨", "You're doing great! 🤩", "That's the way! 🏆", "Superb! 🏅", "Outstanding! 🌠",
            "You're amazing! 💥", "Sensational! 🙌", "Remarkable! 🌟", "Spectacular! 🎇", "You're unstoppable! 🏆"
        ],
        incorrectFeedbacks: [
            "No worries, try again and you'll get it! 😊", "Keep trying, you’re doing great! 👏", "Mistakes are proof that you are trying! 💪", "You can do it next time! 🤗", "Believe in yourself, keep going! 🚀",
            "Almost there, keep pushing! 🌟", "You're getting closer, keep practicing! 🔍", "Don't worry, you'll nail it next time! 📚", "Stay positive, keep learning! 🧠", "You're doing well, don't give up! 🚴",
            "Keep your spirit up, you're on the right track! 🛤", "Stay focused and try again! 🎯", "Every mistake is a step forward! 👏", "Keep your head high, you're doing great! 🙋", "Push through, you're almost there! 🚀",
            "You have the potential to succeed! 💪", "Stay determined, you're improving! 🚀", "Never give up, you're learning! 🌟", "Keep moving forward, you're progressing! 📈", "Believe in yourself, you can achieve it! 💖"
        ],
        progress: "Question {current} of {total}",
        restartQuiz: "Restart Quiz",
    },
    ar: {
        title: "اختبار اللغة الإنجليزية",
        description: "اختر الوحدات وعدد الأسئلة لكل وحدة لبدء الاختبار.",
        startQuiz: "بدء الاختبار",
        nextQuestion: "السؤال التالي",
        results: "نتائج الاختبار",
        score: "لقد حصلت على {score} من أصل {total}.",
        unit: "الوحدة",
        lesson: "الدرس",
        grammar: "القواعد",
        switchLanguage: "التغيير إلى الإنجليزية",
        correctFeedbacks: [
            "أحسنت! 🎉", "عمل رائع! 👍", "أنت ممتاز! 🔥", "رائع! 🌟", "لا يصدق! 🚀",
            "استمر في العمل! 💪", "لقد أبدعت! 🎯", "رائع! 🙌", "مثالي! 👌", "ممتاز! 🥇",
            "ذكي! ✨", "أداء رائع! 🤩", "هكذا يكون العمل! 🏆", "مذهل! 🏅", "متميز! 🌠",
            "أنت رائع! 💥", "خيالي! 🙌", "بارع! 🌟", "مذهل! 🎇", "لا يمكن إيقافك! 🏆"
        ],
        incorrectFeedbacks: [
            "لا تقلق، حاول مرة أخرى وستنجح! 😊", "استمر في المحاولة، أنت تقوم بعمل رائع! 👏", "الأخطاء دليل على أنك تحاول! 💪", "يمكنك فعلها في المرة القادمة! 🤗", "ثق بنفسك، استمر! 🚀",
            "قريب جدًا، استمر في الدفع! 🌟", "أنت تقترب، استمر في التدريب! 🔍", "لا تقلق، ستحققها في المرة القادمة! 📚", "ابقَ إيجابيًا، استمر في التعلم! 🧠", "أنت تقوم بعمل جيد، لا تستسلم! 🚴",
            "ابقَ روحك عالية، أنت على الطريق الصحيح! 🛤", "ابقَ مركزًا وحاول مرة أخرى! 🎯", "كل خطأ هو خطوة للأمام! 👏", "ابقَ رأسك مرفوعًا، أنت تقوم بعمل رائع! 🙋", "ادفع للأمام، أنت قريب! 🚀",
            "لديك الإمكانيات للنجاح! 💪", "ابقَ مصممًا، أنت تتحسن! 🚀", "لا تستسلم، أنت تتعلم! 🌟", "استمر في التقدم، أنت تتطور! 📈", "ثق بنفسك، يمكنك تحقيق ذلك! 💖"
        ],
        progress: "السؤال {current} من {total}",
        restartQuiz: "إعادة الاختبار",
    }
};

document.getElementById('languageToggle').addEventListener('click', toggleLanguage);
document.getElementById('startQuiz').addEventListener('click', startQuiz);
document.getElementById('nextQuestion').addEventListener('click', nextQuestion);
document.getElementById('restartQuiz').addEventListener('click', restartQuiz);

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
    updateLanguage();
}

function updateLanguage() {
    const lang = translations[currentLanguage];
    document.getElementById('title').textContent = lang.title;
    document.getElementById('description').textContent = lang.description;
    document.getElementById('startQuiz').textContent = lang.startQuiz;
    document.getElementById('nextQuestion').textContent = lang.nextQuestion;
    document.getElementById('languageToggle').textContent = lang.switchLanguage;
    document.getElementById('restartQuiz').textContent = lang.restartQuiz;
    document.querySelectorAll('.unit h3').forEach((unitTitle, index) => {
        unitTitle.textContent = `${lang.unit} ${index + 1}`;
    });
}

function startQuiz() {
    selectedUnits = [];
    const units = document.querySelectorAll('.unit');
    let totalQuestions = 0;

    units.forEach(unit => {
        const unitId = unit.getAttribute('data-unit');
        const lessonCount = parseInt(unit.querySelector('.lessonCount').value);
        const grammarCount = parseInt(unit.querySelector('.grammarCount').value);

        if (lessonCount > 0) {
            selectedUnits.push({
                unitId,
                type: 'lesson',
                count: lessonCount
            });
        }
        if (grammarCount > 0) {
            selectedUnits.push({
                unitId,
                type: 'grammar',
                count: grammarCount
            });
        }

        totalQuestions += lessonCount + grammarCount;
    });

    if (selectedUnits.length === 0 || totalQuestions === 0) {
        alert(currentLanguage === 'en' ? 'Please select at least one unit and number of questions.' : 'الرجاء اختيار وحدة واحدة على الأقل وعدد الأسئلة.');
        return;
    }

    if (totalQuestions > 10) {
        alert(currentLanguage === 'en' ? 'The maximum number of questions is 10.' : 'الحد الأقصى لعدد الأسئلة هو 10.');
        return;
    }

    quizQuestions = generateQuizQuestions();
    document.getElementById('unitSelection').style.display = 'none';
    document.getElementById('startQuiz').style.display = 'none';
    document.getElementById('quizInterface').style.display = 'block';
    currentQuestionIndex = 0;
    score = 0;
    loadNextQuestion();
}

function generateQuizQuestions() {
    const questions = [];
    selectedUnits.forEach(unit => {
        const unitQuestions = allQuestions[unit.unitId][unit.type];
        const selectedQuestions = unitQuestions.sort(() => 0.5 - Math.random()).slice(0, unit.count);
        questions.push(...selectedQuestions);
    });

    // Ensure questions are unique and shuffled
    const uniqueQuestions = [...new Set(questions.map(q => q.question))].map(q => questions.find(question => question.question === q));
    return uniqueQuestions.sort(() => 0.5 - Math.random());
}

function loadNextQuestion() {
    if (currentQuestionIndex < quizQuestions.length) {
        const question = quizQuestions[currentQuestionIndex];
        document.getElementById('questionTitle').textContent = question.question;
        const optionsDiv = document.getElementById('options');
        optionsDiv.innerHTML = '';
        question.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', () => checkAnswer(button, option, question.answer));
            optionsDiv.appendChild(button);
        });
        document.getElementById('feedback').textContent = '';
        document.getElementById('nextQuestion').style.display = 'none';
        updateProgress();
    } else {
        showResults();
    }
}

function checkAnswer(button, selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        score++;
        button.classList.add('correct-answer');
    } else {
        button.classList.add('wrong-answer');
        // حدد الزر الصحيح واضبطه ليكون أخضر مع نص أبيض
        const buttons = document.querySelectorAll('#options button');
        buttons.forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.classList.add('correct-answer');
            }
        });
    }

    const feedbackMessages = selectedAnswer === correctAnswer ?
        translations[currentLanguage].correctFeedbacks :
        translations[currentLanguage].incorrectFeedbacks;
    
    document.getElementById('feedback').textContent = feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)];

    // تعطيل جميع الأزرار بعد الإجابة
    document.querySelectorAll('#options button').forEach(btn => btn.disabled = true);

    document.getElementById('nextQuestion').style.display = 'block';
}

function updateProgress() {
    const lang = translations[currentLanguage];
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
    document.getElementById('progressText').textContent = lang.progress
        .replace("{current}", currentQuestionIndex + 1)
        .replace("{total}", quizQuestions.length);
}

function nextQuestion() {
    currentQuestionIndex++;
    loadNextQuestion();
}

function showResults() {
    document.getElementById('quizInterface').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    const lang = translations[currentLanguage];
    document.getElementById('score').textContent = lang.score
        .replace("{score}", score)
        .replace("{total}", quizQuestions.length);
}
function restartQuiz() {
document.getElementById('results').style.display = 'none';
    document.getElementById('unitSelection').style.display = 'grid';
    const startQuizButton = document.getElementById('startQuiz');
    startQuizButton.style.display = 'block';
    startQuizButton.classList.add('center-button'); // تأكد من توسيط الزر
    selectedUnits = [];
    quizQuestions = [];
    currentQuestionIndex = 0;
    score = 0;
    updateLanguage();
}

// إنشاء وحدات بشكل ديناميكي
const unitSelection = document.getElementById('unitSelection');
for (let i = 1; i <= 12; i++) {
    const unitDiv = document.createElement('div');
    unitDiv.className = 'unit';
    unitDiv.setAttribute('data-unit', `unit${i}`);
    unitDiv.innerHTML = `
        <h3>${translations[currentLanguage].unit} ${i}</h3>
        <label>${translations[currentLanguage].lesson}</label>
        <input type="number" class="lessonCount" min="0" max="10" value="0">
        <label>${translations[currentLanguage].grammar}</label>
        <input type="number" class="grammarCount" min="0" max="10" value="0">
    `;
    unitSelection.appendChild(unitDiv);
}

updateLanguage();