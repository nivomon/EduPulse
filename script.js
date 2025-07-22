/**
 * EduPulse - Brain Training Quiz Game
 * A quiz game with 10,000 levels featuring random questions
 */

class EduPulseGame {
    constructor() {
        this.gameState = {
            currentLevel: 1,
            totalScore: 0,
            correctAnswers: 0,
            totalAnswers: 0,
            correctAnswersInCurrentLevel: 0, // Track correct answers for current level
            currentQuestion: null,
            timer: null,
            timeLeft: 30,
            settings: {
                sound: true,
                timerDuration: 30,
                difficulty: 'mixed'
            },
            achievements: []
        };

        this.screens = {
            loading: document.getElementById('loadingScreen'),
            mainMenu: document.getElementById('mainMenu'),
            game: document.getElementById('gameScreen'),
            result: document.getElementById('resultScreen'),
            achievements: document.getElementById('achievementsScreen'),
            settings: document.getElementById('settingsScreen')
        };

        this.init();
    }

    init() {
        this.loadGameData();
        this.setupEventListeners();
        this.showLoadingScreen();
    }

    loadGameData() {
        try {
            const savedData = localStorage.getItem('edupulse-game-data');
            if (savedData) {
                const data = JSON.parse(savedData);
                this.gameState = { ...this.gameState, ...data };
            }
        } catch (error) {
            console.log('No saved game data found, starting fresh');
        }
        this.updateMainMenuStats();
    }

    saveGameData() {
        try {
            localStorage.setItem('edupulse-game-data', JSON.stringify(this.gameState));
        } catch (error) {
            console.error('Failed to save game data:', error);
        }
    }

    setupEventListeners() {
        // Main menu buttons
        document.getElementById('playBtn').addEventListener('click', () => this.startGame());
        document.getElementById('achievementsBtn').addEventListener('click', () => this.showAchievements());
        document.getElementById('settingsBtn').addEventListener('click', () => this.showSettings());

        // Game screen buttons
        document.getElementById('homeBtn').addEventListener('click', () => this.showMainMenu());

        // Result screen buttons
        document.getElementById('nextQuestionBtn').addEventListener('click', () => this.nextQuestion());
        document.getElementById('backToMenuBtn').addEventListener('click', () => this.showMainMenu());

        // Achievements screen
        document.getElementById('achievementsBackBtn').addEventListener('click', () => this.showMainMenu());

        // Settings screen
        document.getElementById('settingsBackBtn').addEventListener('click', () => this.showMainMenu());
        document.getElementById('resetProgressBtn').addEventListener('click', () => this.resetProgress());
        
        // Settings controls
        document.getElementById('soundToggle').addEventListener('change', (e) => {
            this.gameState.settings.sound = e.target.checked;
            this.saveGameData();
        });

        document.getElementById('timerSelect').addEventListener('change', (e) => {
            this.gameState.settings.timerDuration = parseInt(e.target.value);
            this.saveGameData();
        });

        document.getElementById('difficultySelect').addEventListener('change', (e) => {
            this.gameState.settings.difficulty = e.target.value;
            this.saveGameData();
        });

        // Prevent context menu on mobile
        document.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    showLoadingScreen() {
        this.hideAllScreens();
        this.screens.loading.classList.add('active');
        
        // Simulate loading time
        setTimeout(() => {
            this.showMainMenu();
        }, 3000);
    }

    showMainMenu() {
        this.hideAllScreens();
        this.updateMainMenuStats();
        this.screens.mainMenu.classList.add('active');
        this.saveGameData();
    }

    showAchievements() {
        this.hideAllScreens();
        this.updateAchievements();
        this.screens.achievements.classList.add('active');
    }

    showSettings() {
        this.hideAllScreens();
        this.updateSettingsValues();
        this.screens.settings.classList.add('active');
    }

    hideAllScreens() {
        Object.values(this.screens).forEach(screen => {
            screen.classList.remove('active');
        });
    }

    updateMainMenuStats() {
        document.getElementById('currentLevel').textContent = this.gameState.currentLevel;
        document.getElementById('totalScore').textContent = this.gameState.totalScore;
        
        const accuracy = this.gameState.totalAnswers > 0 
            ? Math.round((this.gameState.correctAnswers / this.gameState.totalAnswers) * 100)
            : 0;
        document.getElementById('accuracy').textContent = accuracy + '%';

        // Update milestone progress (show progress to next level)
        const nextLevel = this.gameState.currentLevel + 1;
        document.getElementById('nextMilestone').textContent = nextLevel;
        
        const progress = (this.gameState.correctAnswersInCurrentLevel / 21) * 100;
        document.getElementById('milestoneProgress').style.width = progress + '%';
    }

    updateSettingsValues() {
        document.getElementById('soundToggle').checked = this.gameState.settings.sound;
        document.getElementById('timerSelect').value = this.gameState.settings.timerDuration;
        document.getElementById('difficultySelect').value = this.gameState.settings.difficulty;
    }

    startGame() {
        this.hideAllScreens();
        this.screens.game.classList.add('active');
        this.loadQuestion();
    }

    loadQuestion() {
        try {
            // Get random question based on current level and settings
            this.gameState.currentQuestion = getRandomQuestion(
                this.gameState.currentLevel, 
                this.gameState.settings.difficulty
            );

            this.displayQuestion();
            this.startTimer();
            this.updateGameHeader();
        } catch (error) {
            console.error('Failed to load question:', error);
            this.showError('Failed to load question. Please try again.');
        }
    }

    displayQuestion() {
        const question = this.gameState.currentQuestion;
        
        document.getElementById('questionCategory').textContent = question.category;
        document.getElementById('questionText').textContent = question.question;
        
        const answersContainer = document.getElementById('answersContainer');
        answersContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'answer-btn';
            button.innerHTML = `
                <div class="answer-option">${String.fromCharCode(65 + index)}</div>
                <span>${option}</span>
            `;
            button.addEventListener('click', () => this.selectAnswer(index));
            answersContainer.appendChild(button);
        });
    }

    updateGameHeader() {
        document.getElementById('gameLevelDisplay').textContent = this.gameState.currentLevel;
        document.getElementById('gameScore').textContent = this.gameState.totalScore;
        
        // Update level progress (progress based on 21 correct answers needed for next level)
        const progressInLevel = (this.gameState.correctAnswersInCurrentLevel / 21) * 100;
        document.getElementById('levelProgressFill').style.width = progressInLevel + '%';
    }

    startTimer() {
        if (this.gameState.settings.timerDuration === 0) {
            document.querySelector('.timer-container').style.display = 'none';
            return;
        }

        document.querySelector('.timer-container').style.display = 'block';
        this.gameState.timeLeft = this.gameState.settings.timerDuration;
        this.updateTimerDisplay();

        this.gameState.timer = setInterval(() => {
            this.gameState.timeLeft--;
            this.updateTimerDisplay();

            if (this.gameState.timeLeft <= 0) {
                this.timeUp();
            }
        }, 1000);
    }

    updateTimerDisplay() {
        document.getElementById('timerText').textContent = this.gameState.timeLeft;
        const progress = (this.gameState.timeLeft / this.gameState.settings.timerDuration) * 360;
        document.documentElement.style.setProperty('--timer-progress', progress + 'deg');
    }

    timeUp() {
        this.stopTimer();
        this.selectAnswer(-1); // -1 indicates time up
    }

    stopTimer() {
        if (this.gameState.timer) {
            clearInterval(this.gameState.timer);
            this.gameState.timer = null;
        }
    }

    selectAnswer(selectedIndex) {
        this.stopTimer();
        
        const answerButtons = document.querySelectorAll('.answer-btn');
        answerButtons.forEach(btn => btn.classList.add('disabled'));

        const isCorrect = selectedIndex === this.gameState.currentQuestion.correct;
        const isTimeUp = selectedIndex === -1;

        // Update statistics
        this.gameState.totalAnswers++;
        if (isCorrect) {
            this.gameState.correctAnswers++;
            this.gameState.correctAnswersInCurrentLevel++;
        }

        // Visual feedback
        if (!isTimeUp) {
            if (isCorrect) {
                answerButtons[selectedIndex].classList.add('correct');
                this.playSound('correct');
            } else {
                answerButtons[selectedIndex].classList.add('incorrect');
                this.playSound('incorrect');
            }
        }

        // Always show correct answer
        if (!isCorrect && !isTimeUp) {
            answerButtons[this.gameState.currentQuestion.correct].classList.add('correct');
        }

        // Show result after delay
        setTimeout(() => {
            this.showResult(isCorrect, isTimeUp);
        }, 1500);
    }

    showResult(isCorrect, isTimeUp) {
        this.hideAllScreens();
        this.screens.result.classList.add('active');

        const resultIcon = document.getElementById('resultIcon');
        const resultTitle = document.getElementById('resultTitle');
        const resultMessage = document.getElementById('resultMessage');
        const resultScore = document.getElementById('resultScore');
        const resultLevel = document.getElementById('resultLevel');

        if (isTimeUp) {
            resultIcon.innerHTML = '<i class="fas fa-clock"></i>';
            resultIcon.className = 'result-icon incorrect';
            resultTitle.textContent = 'Time\'s Up!';
            resultMessage.textContent = 'You ran out of time. Better luck next time!';
            resultScore.textContent = '+0';
        } else if (isCorrect) {
            resultIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
            resultIcon.className = 'result-icon correct';
            resultTitle.textContent = 'Correct!';
            resultMessage.textContent = this.getRandomPositiveMessage();
            
            const scoreGain = this.calculateScore();
            this.gameState.totalScore += scoreGain;
            resultScore.textContent = '+' + scoreGain;
        } else {
            resultIcon.innerHTML = '<i class="fas fa-times-circle"></i>';
            resultIcon.className = 'result-icon incorrect';
            resultTitle.textContent = 'Incorrect!';
            resultMessage.textContent = `The correct answer was: ${this.gameState.currentQuestion.options[this.gameState.currentQuestion.correct]}`;
            resultScore.textContent = '+0';
        }

        resultLevel.textContent = this.gameState.currentLevel;
        
        // Check for achievements
        this.checkAchievements();
    }

    calculateScore() {
        const baseScore = 10;
        const levelBonus = Math.floor(this.gameState.currentLevel / 10);
        const timeBonus = Math.floor(this.gameState.timeLeft / 5);
        
        return baseScore + levelBonus + timeBonus;
    }

    getRandomPositiveMessage() {
        const messages = [
            "Excellent work!",
            "Well done!",
            "Outstanding!",
            "Brilliant!",
            "Perfect!",
            "Great job!",
            "Fantastic!",
            "Amazing!",
            "Superb!",
            "Wonderful!"
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    }

    nextQuestion() {
        // Check if user has answered 21 questions correctly in current level
        if (this.gameState.correctAnswersInCurrentLevel >= 21) {
            this.gameState.currentLevel++;
            this.gameState.correctAnswersInCurrentLevel = 0; // Reset for new level
            this.showLevelUpNotification();
        }
        this.startGame();
    }

    showLevelUpNotification() {
        // Show level up notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #4ecdc4, #44a08d);
            color: white;
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
            z-index: 1000;
            text-align: center;
            animation: bounceIn 0.6s ease;
            min-width: 250px;
        `;
        notification.innerHTML = `
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">🎉</div>
            <div style="font-weight: 700; font-size: 1.3rem; margin-bottom: 0.5rem;">Level Up!</div>
            <div style="font-size: 1rem; opacity: 0.9;">Welcome to Level ${this.gameState.currentLevel}</div>
            <div style="font-size: 0.9rem; margin-top: 0.5rem; opacity: 0.8;">21 correct answers completed!</div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);

        this.playSound('levelup');
    }

    checkAchievements() {
        const achievements = [
            { id: 'first_correct', name: 'First Success', description: 'Answer your first question correctly', condition: () => this.gameState.correctAnswers >= 1 },
            { id: 'level_10', name: 'Getting Started', description: 'Reach level 10', condition: () => this.gameState.currentLevel >= 10 },
            { id: 'level_50', name: 'Making Progress', description: 'Reach level 50', condition: () => this.gameState.currentLevel >= 50 },
            { id: 'level_100', name: 'Century Mark', description: 'Reach level 100', condition: () => this.gameState.currentLevel >= 100 },
            { id: 'level_500', name: 'Expert Player', description: 'Reach level 500', condition: () => this.gameState.currentLevel >= 500 },
            { id: 'level_1000', name: 'Master Brain', description: 'Reach level 1000', condition: () => this.gameState.currentLevel >= 1000 },
            { id: 'score_1000', name: 'Score Hunter', description: 'Reach 1000 points', condition: () => this.gameState.totalScore >= 1000 },
            { id: 'score_10000', name: 'Point Master', description: 'Reach 10,000 points', condition: () => this.gameState.totalScore >= 10000 },
            { id: 'accuracy_80', name: 'Sharp Mind', description: 'Maintain 80% accuracy', condition: () => this.gameState.totalAnswers >= 20 && (this.gameState.correctAnswers / this.gameState.totalAnswers) >= 0.8 },
            { id: 'accuracy_90', name: 'Genius Level', description: 'Maintain 90% accuracy', condition: () => this.gameState.totalAnswers >= 50 && (this.gameState.correctAnswers / this.gameState.totalAnswers) >= 0.9 }
        ];

        achievements.forEach(achievement => {
            if (!this.gameState.achievements.includes(achievement.id) && achievement.condition()) {
                this.gameState.achievements.push(achievement.id);
                this.showAchievementUnlocked(achievement);
            }
        });
    }

    showAchievementUnlocked(achievement) {
        // Simple achievement notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #ffd700, #ffed4e);
            color: #2d3436;
            padding: 1rem;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            z-index: 1000;
            animation: slideInRight 0.5s ease;
        `;
        notification.innerHTML = `
            <div style="font-weight: 600; margin-bottom: 0.5rem;">🏆 Achievement Unlocked!</div>
            <div style="font-size: 0.9rem;">${achievement.name}</div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);

        this.playSound('achievement');
    }

    updateAchievements() {
        const achievementsContainer = document.getElementById('achievementsContainer');
        achievementsContainer.innerHTML = '';

        const allAchievements = [
            { id: 'first_correct', name: 'First Success', description: 'Answer your first question correctly', icon: 'star' },
            { id: 'level_10', name: 'Getting Started', description: 'Reach level 10', icon: 'trophy' },
            { id: 'level_50', name: 'Making Progress', description: 'Reach level 50', icon: 'medal' },
            { id: 'level_100', name: 'Century Mark', description: 'Reach level 100', icon: 'crown' },
            { id: 'level_500', name: 'Expert Player', description: 'Reach level 500', icon: 'gem' },
            { id: 'level_1000', name: 'Master Brain', description: 'Reach level 1000', icon: 'brain' },
            { id: 'score_1000', name: 'Score Hunter', description: 'Reach 1000 points', icon: 'target' },
            { id: 'score_10000', name: 'Point Master', description: 'Reach 10,000 points', icon: 'fire' },
            { id: 'accuracy_80', name: 'Sharp Mind', description: 'Maintain 80% accuracy', icon: 'bullseye' },
            { id: 'accuracy_90', name: 'Genius Level', description: 'Maintain 90% accuracy', icon: 'lightning' }
        ];

        allAchievements.forEach(achievement => {
            const isUnlocked = this.gameState.achievements.includes(achievement.id);
            const achievementElement = document.createElement('div');
            achievementElement.className = `achievement-item ${isUnlocked ? 'unlocked' : ''}`;
            
            achievementElement.innerHTML = `
                <div class="achievement-icon">
                    <i class="fas fa-${achievement.icon}"></i>
                </div>
                <div class="achievement-info">
                    <h3>${achievement.name}</h3>
                    <p>${achievement.description}</p>
                </div>
            `;
            
            achievementsContainer.appendChild(achievementElement);
        });
    }

    resetProgress() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            this.gameState = {
                currentLevel: 1,
                totalScore: 0,
                correctAnswers: 0,
                totalAnswers: 0,
                currentQuestion: null,
                timer: null,
                timeLeft: 30,
                settings: {
                    sound: true,
                    timerDuration: 30,
                    difficulty: 'mixed'
                },
                achievements: []
            };
            this.saveGameData();
            this.showMainMenu();
        }
    }

    playSound(type) {
        if (!this.gameState.settings.sound) return;

        // Create simple audio feedback using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            switch (type) {
                case 'correct':
                    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
                    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
                    break;
                case 'incorrect':
                    oscillator.frequency.setValueAtTime(220, audioContext.currentTime); // A3
                    oscillator.frequency.setValueAtTime(196, audioContext.currentTime + 0.1); // G3
                    break;
                case 'achievement':
                    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
                    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
                    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
                    break;
            }

            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (error) {
            console.log('Audio playback not supported');
        }
    }

    showError(message) {
        alert(message); // Simple error display - could be enhanced with custom modal
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.eduPulseGame = new EduPulseGame();
});

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Handle page visibility changes to pause game when not visible
document.addEventListener('visibilitychange', () => {
    if (window.eduPulseGame && document.hidden) {
        if (window.eduPulseGame.gameState.timer) {
            window.eduPulseGame.stopTimer();
        }
    }
});

// Prevent zoom on mobile
document.addEventListener('touchstart', (event) => {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
});

let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);
