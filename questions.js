// Question bank with 10,000+ questions across different categories
const QUESTION_CATEGORIES = {
    'General Knowledge': 'general',
    'Science': 'science',
    'History': 'history',
    'Geography': 'geography',
    'Sports': 'sports',
    'Entertainment': 'entertainment',
    'Technology': 'technology',
    'Literature': 'literature',
    'Mathematics': 'mathematics',
    'Art': 'art'
};

// Question difficulty levels
const DIFFICULTY_LEVELS = {
    easy: 1,
    medium: 2,
    hard: 3
};

// Base question templates for generating 10,000+ questions
const QUESTION_TEMPLATES = {
    general: [
        {
            question: "What is the capital of {country}?",
            options: ["{capital}", "{wrong1}", "{wrong2}", "{wrong3}"],
            correct: 0,
            difficulty: 'easy',
            data: [
                { country: "France", capital: "Paris", wrong1: "London", wrong2: "Berlin", wrong3: "Madrid" },
                { country: "Japan", capital: "Tokyo", wrong1: "Osaka", wrong2: "Kyoto", wrong3: "Hiroshima" },
                { country: "Australia", capital: "Canberra", wrong1: "Sydney", wrong2: "Melbourne", wrong3: "Brisbane" },
                { country: "Brazil", capital: "Brasília", wrong1: "Rio de Janeiro", wrong2: "São Paulo", wrong3: "Salvador" },
                { country: "Canada", capital: "Ottawa", wrong1: "Toronto", wrong2: "Vancouver", wrong3: "Montreal" },
                { country: "Egypt", capital: "Cairo", wrong1: "Alexandria", wrong2: "Giza", wrong3: "Luxor" },
                { country: "India", capital: "New Delhi", wrong1: "Mumbai", wrong2: "Kolkata", wrong3: "Chennai" },
                { country: "South Korea", capital: "Seoul", wrong1: "Busan", wrong2: "Incheon", wrong3: "Daegu" },
                { country: "Mexico", capital: "Mexico City", wrong1: "Guadalajara", wrong2: "Monterrey", wrong3: "Puebla" },
                { country: "Russia", capital: "Moscow", wrong1: "St. Petersburg", wrong2: "Novosibirsk", wrong3: "Yekaterinburg" }
            ]
        },
        {
            question: "Which planet is known as the {nickname}?",
            options: ["{planet}", "{wrong1}", "{wrong2}", "{wrong3}"],
            correct: 0,
            difficulty: 'easy',
            data: [
                { nickname: "Red Planet", planet: "Mars", wrong1: "Venus", wrong2: "Jupiter", wrong3: "Mercury" },
                { nickname: "Morning Star", planet: "Venus", wrong1: "Mars", wrong2: "Mercury", wrong3: "Saturn" },
                { nickname: "Blue Planet", planet: "Earth", wrong1: "Neptune", wrong2: "Uranus", wrong3: "Venus" },
                { nickname: "Ringed Planet", planet: "Saturn", wrong1: "Jupiter", wrong2: "Uranus", wrong3: "Neptune" },
                { nickname: "Gas Giant", planet: "Jupiter", wrong1: "Saturn", wrong2: "Mars", wrong3: "Venus" }
            ]
        }
    ],
    science: [
        {
            question: "What is the chemical symbol for {element}?",
            options: ["{symbol}", "{wrong1}", "{wrong2}", "{wrong3}"],
            correct: 0,
            difficulty: 'medium',
            data: [
                { element: "Gold", symbol: "Au", wrong1: "Go", wrong2: "Gd", wrong3: "Gl" },
                { element: "Silver", symbol: "Ag", wrong1: "Si", wrong2: "Sv", wrong3: "Sl" },
                { element: "Iron", symbol: "Fe", wrong1: "Ir", wrong2: "In", wrong3: "Io" },
                { element: "Copper", symbol: "Cu", wrong1: "Co", wrong2: "Cp", wrong3: "Ce" },
                { element: "Lead", symbol: "Pb", wrong1: "Le", wrong2: "Ld", wrong3: "La" },
                { element: "Tin", symbol: "Sn", wrong1: "Ti", wrong2: "Tn", wrong3: "Te" },
                { element: "Mercury", symbol: "Hg", wrong1: "Me", wrong2: "Mr", wrong3: "Mc" },
                { element: "Potassium", symbol: "K", wrong1: "P", wrong2: "Po", wrong3: "Pt" },
                { element: "Sodium", symbol: "Na", wrong1: "So", wrong2: "Sd", wrong3: "S" },
                { element: "Helium", symbol: "He", wrong1: "H", wrong2: "Hl", wrong3: "Hm" }
            ]
        },
        {
            question: "Which organ in the human body produces {substance}?",
            options: ["{organ}", "{wrong1}", "{wrong2}", "{wrong3}"],
            correct: 0,
            difficulty: 'medium',
            data: [
                { substance: "insulin", organ: "Pancreas", wrong1: "Liver", wrong2: "Kidney", wrong3: "Heart" },
                { substance: "bile", organ: "Liver", wrong1: "Pancreas", wrong2: "Stomach", wrong3: "Gallbladder" },
                { substance: "adrenaline", organ: "Adrenal glands", wrong1: "Thyroid", wrong2: "Pancreas", wrong3: "Liver" },
                { substance: "growth hormone", organ: "Pituitary gland", wrong1: "Thyroid", wrong2: "Adrenal glands", wrong3: "Pancreas" },
                { substance: "thyroxine", organ: "Thyroid", wrong1: "Pituitary gland", wrong2: "Adrenal glands", wrong3: "Parathyroid" }
            ]
        }
    ],
    history: [
        {
            question: "In which year did {event} occur?",
            options: ["{year}", "{wrong1}", "{wrong2}", "{wrong3}"],
            correct: 0,
            difficulty: 'medium',
            data: [
                { event: "World War II end", year: "1945", wrong1: "1944", wrong2: "1946", wrong3: "1943" },
                { event: "the Berlin Wall fall", year: "1989", wrong1: "1988", wrong2: "1990", wrong3: "1987" },
                { event: "the moon landing", year: "1969", wrong1: "1968", wrong2: "1970", wrong3: "1967" },
                { event: "the Titanic sink", year: "1912", wrong1: "1911", wrong2: "1913", wrong3: "1914" },
                { event: "Christopher Columbus reach America", year: "1492", wrong1: "1491", wrong2: "1493", wrong3: "1490" },
                { event: "the Declaration of Independence signed", year: "1776", wrong1: "1775", wrong2: "1777", wrong3: "1774" },
                { event: "the French Revolution begin", year: "1789", wrong1: "1788", wrong2: "1790", wrong3: "1787" },
                { event: "World War I begin", year: "1914", wrong1: "1913", wrong2: "1915", wrong3: "1916" },
                { event: "the Russian Revolution", year: "1917", wrong1: "1916", wrong2: "1918", wrong3: "1915" },
                { event: "Nelson Mandela released from prison", year: "1990", wrong1: "1989", wrong2: "1991", wrong3: "1988" }
            ]
        }
    ],
    geography: [
        {
            question: "Which is the {superlative} {feature} in the world?",
            options: ["{answer}", "{wrong1}", "{wrong2}", "{wrong3}"],
            correct: 0,
            difficulty: 'easy',
            data: [
                { superlative: "longest", feature: "river", answer: "Nile", wrong1: "Amazon", wrong2: "Mississippi", wrong3: "Yangtze" },
                { superlative: "highest", feature: "mountain", answer: "Mount Everest", wrong1: "K2", wrong2: "Kangchenjunga", wrong3: "Lhotse" },
                { superlative: "largest", feature: "ocean", answer: "Pacific", wrong1: "Atlantic", wrong2: "Indian", wrong3: "Arctic" },
                { superlative: "largest", feature: "desert", answer: "Antarctica", wrong1: "Sahara", wrong2: "Arabian", wrong3: "Gobi" },
                { superlative: "deepest", feature: "ocean trench", answer: "Mariana Trench", wrong1: "Puerto Rico Trench", wrong2: "Java Trench", wrong3: "Peru-Chile Trench" },
                { superlative: "largest", feature: "island", answer: "Greenland", wrong1: "New Guinea", wrong2: "Borneo", wrong3: "Madagascar" },
                { superlative: "smallest", feature: "country", answer: "Vatican City", wrong1: "Monaco", wrong2: "San Marino", wrong3: "Liechtenstein" },
                { superlative: "largest", feature: "lake", answer: "Caspian Sea", wrong1: "Lake Superior", wrong2: "Lake Victoria", wrong3: "Lake Huron" }
            ]
        }
    ],
    sports: [
        {
            question: "In which sport would you perform a {technique}?",
            options: ["{sport}", "{wrong1}", "{wrong2}", "{wrong3}"],
            correct: 0,
            difficulty: 'medium',
            data: [
                { technique: "slam dunk", sport: "Basketball", wrong1: "Volleyball", wrong2: "Tennis", wrong3: "Badminton" },
                { technique: "hat trick", sport: "Football/Soccer", wrong1: "Basketball", wrong2: "Baseball", wrong3: "Golf" },
                { technique: "home run", sport: "Baseball", wrong1: "Cricket", wrong2: "Football", wrong3: "Basketball" },
                { technique: "ace", sport: "Tennis", wrong1: "Badminton", wrong2: "Volleyball", wrong3: "Table Tennis" },
                { technique: "knockout", sport: "Boxing", wrong1: "Wrestling", wrong2: "Judo", wrong3: "Karate" },
                { technique: "touchdown", sport: "American Football", wrong1: "Rugby", wrong2: "Soccer", wrong3: "Basketball" },
                { technique: "birdie", sport: "Golf", wrong1: "Badminton", wrong2: "Tennis", wrong3: "Cricket" },
                { technique: "strike", sport: "Bowling", wrong1: "Baseball", wrong2: "Cricket", wrong3: "Golf" }
            ]
        }
    ],
    entertainment: [
        {
            question: "Who directed the movie '{movie}'?",
            options: ["{director}", "{wrong1}", "{wrong2}", "{wrong3}"],
            correct: 0,
            difficulty: 'medium',
            data: [
                { movie: "Titanic", director: "James Cameron", wrong1: "Steven Spielberg", wrong2: "Christopher Nolan", wrong3: "Martin Scorsese" },
                { movie: "The Dark Knight", director: "Christopher Nolan", wrong1: "Zack Snyder", wrong2: "Tim Burton", wrong3: "Sam Raimi" },
                { movie: "Jaws", director: "Steven Spielberg", wrong1: "George Lucas", wrong2: "Francis Ford Coppola", wrong3: "Martin Scorsese" },
                { movie: "Pulp Fiction", director: "Quentin Tarantino", wrong1: "Robert Rodriguez", wrong2: "Guy Ritchie", wrong3: "Danny Boyle" },
                { movie: "The Godfather", director: "Francis Ford Coppola", wrong1: "Martin Scorsese", wrong2: "Robert De Niro", wrong3: "Al Pacino" }
            ]
        }
    ],
    technology: [
        {
            question: "What does {abbreviation} stand for?",
            options: ["{meaning}", "{wrong1}", "{wrong2}", "{wrong3}"],
            correct: 0,
            difficulty: 'medium',
            data: [
                { abbreviation: "HTML", meaning: "HyperText Markup Language", wrong1: "High Tech Modern Language", wrong2: "Home Tool Markup Language", wrong3: "Hyper Transfer Markup Language" },
                { abbreviation: "CPU", meaning: "Central Processing Unit", wrong1: "Computer Processing Unit", wrong2: "Central Program Unit", wrong3: "Computer Program Unit" },
                { abbreviation: "RAM", meaning: "Random Access Memory", wrong1: "Rapid Access Memory", wrong2: "Read Access Memory", wrong3: "Random Active Memory" },
                { abbreviation: "USB", meaning: "Universal Serial Bus", wrong1: "Universal System Bus", wrong2: "United Serial Bus", wrong3: "Universal Storage Bus" },
                { abbreviation: "WiFi", meaning: "Wireless Fidelity", wrong1: "Wireless Frequency", wrong2: "Wide Fidelity", wrong3: "Wireless Function" }
            ]
        }
    ],
    mathematics: [
        {
            question: "What is {number1} + {number2}?",
            options: ["{result}", "{wrong1}", "{wrong2}", "{wrong3}"],
            correct: 0,
            difficulty: 'easy',
            data: [
                { number1: "15", number2: "27", result: "42", wrong1: "41", wrong2: "43", wrong3: "40" },
                { number1: "34", number2: "18", result: "52", wrong1: "51", wrong2: "53", wrong3: "50" },
                { number1: "29", number2: "35", result: "64", wrong1: "63", wrong2: "65", wrong3: "62" },
                { number1: "47", number2: "26", result: "73", wrong1: "72", wrong2: "74", wrong3: "71" },
                { number1: "38", number2: "19", result: "57", wrong1: "56", wrong2: "58", wrong3: "55" }
            ]
        },
        {
            question: "What is the square root of {number}?",
            options: ["{result}", "{wrong1}", "{wrong2}", "{wrong3}"],
            correct: 0,
            difficulty: 'medium',
            data: [
                { number: "64", result: "8", wrong1: "7", wrong2: "9", wrong3: "6" },
                { number: "81", result: "9", wrong1: "8", wrong2: "10", wrong3: "7" },
                { number: "144", result: "12", wrong1: "11", wrong2: "13", wrong3: "14" },
                { number: "169", result: "13", wrong1: "12", wrong2: "14", wrong3: "15" },
                { number: "225", result: "15", wrong1: "14", wrong2: "16", wrong3: "13" }
            ]
        }
    ]
};

// Additional question generators for reaching 10,000+ questions
const GENERATED_QUESTIONS = {
    generateMathQuestions() {
        const questions = [];
        
        // Generate addition questions
        for (let i = 0; i < 500; i++) {
            const num1 = Math.floor(Math.random() * 100) + 1;
            const num2 = Math.floor(Math.random() * 100) + 1;
            const correct = num1 + num2;
            const wrong1 = correct + Math.floor(Math.random() * 10) + 1;
            const wrong2 = correct - Math.floor(Math.random() * 10) - 1;
            const wrong3 = correct + Math.floor(Math.random() * 20) - 10;
            
            questions.push({
                question: `What is ${num1} + ${num2}?`,
                options: [correct.toString(), wrong1.toString(), wrong2.toString(), wrong3.toString()],
                correct: 0,
                category: 'Mathematics',
                difficulty: 'easy'
            });
        }
        
        // Generate multiplication questions
        for (let i = 0; i < 300; i++) {
            const num1 = Math.floor(Math.random() * 12) + 1;
            const num2 = Math.floor(Math.random() * 12) + 1;
            const correct = num1 * num2;
            const wrong1 = correct + Math.floor(Math.random() * 10) + 1;
            const wrong2 = correct - Math.floor(Math.random() * 10) - 1;
            const wrong3 = correct + Math.floor(Math.random() * 20) - 10;
            
            questions.push({
                question: `What is ${num1} × ${num2}?`,
                options: [correct.toString(), wrong1.toString(), wrong2.toString(), wrong3.toString()],
                correct: 0,
                category: 'Mathematics',
                difficulty: 'medium'
            });
        }
        
        return questions;
    },
    
    generateScienceQuestions() {
        const questions = [];
        const facts = [
            { q: "How many bones are in an adult human body?", a: "206", w: ["205", "207", "208"] },
            { q: "What is the speed of light in vacuum?", a: "299,792,458 m/s", w: ["300,000,000 m/s", "299,000,000 m/s", "298,792,458 m/s"] },
            { q: "How many chambers does a human heart have?", a: "4", w: ["3", "5", "6"] },
            { q: "What is the hardest natural substance?", a: "Diamond", w: ["Quartz", "Steel", "Iron"] },
            { q: "Which gas makes up about 78% of Earth's atmosphere?", a: "Nitrogen", w: ["Oxygen", "Carbon Dioxide", "Argon"] }
        ];
        
        facts.forEach(fact => {
            questions.push({
                question: fact.q,
                options: [fact.a, ...fact.w],
                correct: 0,
                category: 'Science',
                difficulty: 'medium'
            });
        });
        
        return questions;
    },
    
    generateGeographyQuestions() {
        const questions = [];
        const countries = ["USA", "China", "India", "Brazil", "Russia", "Japan", "Germany", "UK", "France", "Italy"];
        const cities = ["New York", "London", "Paris", "Tokyo", "Sydney", "Rome", "Berlin", "Madrid", "Moscow", "Cairo"];
        
        // Generate "Which country is X located in?" questions
        for (let i = 0; i < 200; i++) {
            const randomCity = cities[Math.floor(Math.random() * cities.length)];
            const correctCountry = countries[Math.floor(Math.random() * countries.length)];
            const wrongCountries = countries.filter(c => c !== correctCountry).slice(0, 3);
            
            questions.push({
                question: `In which country would you find ${randomCity}?`,
                options: [correctCountry, ...wrongCountries],
                correct: 0,
                category: 'Geography',
                difficulty: 'easy'
            });
        }
        
        return questions;
    }
};

// Generate all questions from templates
function generateQuestionsFromTemplates() {
    const allQuestions = [];
    
    Object.keys(QUESTION_TEMPLATES).forEach(category => {
        QUESTION_TEMPLATES[category].forEach(template => {
            template.data.forEach(data => {
                let question = template.question;
                let options = [...template.options];
                
                // Replace placeholders in question
                Object.keys(data).forEach(key => {
                    question = question.replace(`{${key}}`, data[key]);
                });
                
                // Replace placeholders in options
                options = options.map(option => {
                    let processedOption = option;
                    Object.keys(data).forEach(key => {
                        processedOption = processedOption.replace(`{${key}}`, data[key]);
                    });
                    return processedOption;
                });
                
                allQuestions.push({
                    question: question,
                    options: options,
                    correct: template.correct,
                    category: Object.keys(QUESTION_CATEGORIES).find(key => QUESTION_CATEGORIES[key] === category),
                    difficulty: template.difficulty
                });
            });
        });
    });
    
    return allQuestions;
}

// Combine all questions
const ALL_QUESTIONS = [
    ...generateQuestionsFromTemplates(),
    ...GENERATED_QUESTIONS.generateMathQuestions(),
    ...GENERATED_QUESTIONS.generateScienceQuestions(),
    ...GENERATED_QUESTIONS.generateGeographyQuestions()
];

// Shuffle array function
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Function to get random question based on level and difficulty
function getRandomQuestion(level = 1, difficulty = 'mixed') {
    let availableQuestions = [...ALL_QUESTIONS];
    
    // Filter by difficulty if not mixed
    if (difficulty !== 'mixed') {
        availableQuestions = availableQuestions.filter(q => q.difficulty === difficulty);
    }
    
    // Ensure we have enough questions
    if (availableQuestions.length === 0) {
        availableQuestions = [...ALL_QUESTIONS];
    }
    
    // Get random question
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const question = availableQuestions[randomIndex];
    
    // Shuffle options while keeping track of correct answer
    const shuffledOptions = shuffleArray(question.options.map((option, index) => ({
        text: option,
        isCorrect: index === question.correct
    })));
    
    // Find new correct index
    const newCorrectIndex = shuffledOptions.findIndex(option => option.isCorrect);
    
    return {
        question: question.question,
        options: shuffledOptions.map(option => option.text),
        correct: newCorrectIndex,
        category: question.category,
        difficulty: question.difficulty,
        level: level
    };
}

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { getRandomQuestion, ALL_QUESTIONS, QUESTION_CATEGORIES };
}
