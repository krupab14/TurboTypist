const body = document.querySelector('body')
const synth = window.speechSynthesis
const bg26 = document.querySelectorAll('.bg26')
const bg40 = document.querySelectorAll('.bg40')
const fcblack = document.querySelectorAll('.fcblack')
const nav = document.querySelector('.navbar')
const toggleButton = document.querySelector('.toggleButton')
const loginButton = document.querySelector('.loginButton')
const navButton = document.querySelectorAll('.navButton')

const sun = document.querySelector('.sun')
const moon = document.querySelector('.moon')
const login = document.querySelector('.loginSvg')

const modeDropdown = document.querySelector('.modeDropdown')
const mainContainer = document.querySelector('.container')
const startButton = document.querySelector('#start-button')
const stopButton = document.querySelector('#stop-button')
const timeDisplay = document.querySelector('#time')
const typingArea = document.querySelector('#typing-area')
const charPerMinElement = document.querySelector('#char-per-sec')
const wpmElement = document.querySelector('#wpm-circle')
const accuracyElement = document.querySelector('#accuracy')
const textToTypeElement = document.querySelector('#text-to-type')
const genreDropdown = document.querySelector('#text-genre')
const circlesContainer = document.querySelector('.circles')
const circles = document.querySelectorAll('.circle')

const menuButton = document.querySelector('#menu-button')
const dropdown = document.querySelector('#dropdown')

menuButton.addEventListener('click', function () {
    dropdown.classList.toggle('active')
})

document.addEventListener('click', (event) => {
    // Check if the clicked element is outside the dropdown and menuButton
    if (!menuButton.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.remove('active') // Hide the dropdown
    }
})

toggleButton.addEventListener('click', (event) => {
    dropdown.classList.remove('active') // Hide the dropdown
})

typingArea.style.color = 'white'

loginButton.addEventListener('click', () => {
    window.location.href = './login-registration.html'
})

toggleButton.addEventListener('click', () => {
    if (body.style.backgroundColor !== 'rgb(230, 230, 230)') {
        toggleButton.setAttribute('data-tooltip', 'Dark Mode')

        body.style.backgroundColor = '#E6E6E6'
        mainContainer.style.border = 'none'
        navButton.forEach((el) => {
            el.classList.add('tooltip-light')
        })

        nav.style.backgroundColor = 'white'
        nav.style.border = 'none'

        modeDropdown.style.borderColor = 'black'

        typingArea.classList.remove('dark-textarea')
        typingArea.classList.add('light-textarea')

        circlesContainer.style.border = 'none'

        bg26.forEach((el) => {
            el.style.backgroundColor = 'white'
            el.style.border = 'none'
        })

        bg40.forEach((el) => {
            el.style.backgroundColor = 'white'
        })

        fcblack.forEach((el) => {
            el.style.color = 'black'
        })

        sun.style.display = 'none'
        moon.style.display = 'block'

        localStorage.setItem('light', 'light')
    } else {
        toggleButton.setAttribute('data-tooltip', 'Light Mode')

        body.style.backgroundColor = '#404040'
        mainContainer.style.border = '3px solid #f98404'

        nav.style.backgroundColor = '#262626'
        nav.style.borderBottom = '3px solid #f98404'
        navButton.forEach((el) => {
            el.classList.remove('tooltip-light')
        })

        modeDropdown.style.borderColor = '#f98404'

        typingArea.classList.remove('light-textarea')
        typingArea.classList.add('dark-textarea')

        circlesContainer.style.border = '3px solid #f98404'

        bg26.forEach((el) => {
            el.style.backgroundColor = '#262626'
            el.style.border = '3px solid #f98404'
        })
        dropdown.style.border = 'none'

        bg40.forEach((el) => {
            el.style.backgroundColor = '#404040'
        })

        fcblack.forEach((el) => {
            el.style.color = 'white'
        })

        moon.style.display = 'none'
        sun.style.display = 'block'

        localStorage.setItem('dark', 'dark')
    }
})

let timeLeft = 45 // Starting time for countdown (60 seconds)
let timer
let startTime
let typingStartTime
let typedText = ''
let correctText = ''
const progressCircle = document.getElementById('progress-circle')

// Calculate circle properties
const radius = progressCircle.r.baseVal.value // radius of the outer circle
const circumference = 2 * Math.PI * radius // circumference of the outer circle

// Set up initial stroke properties for the circle
progressCircle.style.strokeDasharray = `${circumference} ${circumference}`
progressCircle.style.strokeDashoffset = `${circumference}` // start with full circle

// Start Button Click Event
// Start Button Click Event
function start() {
    startButton.disabled = true // Disable the start button
    typingArea.disabled = false // Enable typing area
    typingArea.value = '' // Clear previous typing input
    timeLeft = 45 // Reset timer to 45 seconds
    timeDisplay.textContent = `${timeLeft}s` // Update time display at start

    // Set text color to white
    textToTypeElement.style.color = 'white'

    // Reset the progress circle
    progressCircle.style.strokeDashoffset = `${circumference}` // Reset circle to full

    // Reset values of all circles
    circles.forEach((circle) => {
        circle.style.strokeDashoffset = `${circumference}` // Reset each circle to full
        circle.style.opacity = '1' // Ensure circles are visible (if you want them visible)
    })

    // Set typing start time
    typingStartTime = new Date().getTime()

    // Start the timer
    timer = setInterval(updateTimer, 1000) // Call updateTimer every second

    // Optionally, initiate text-to-speech for the text to type
    const textToSpeak = textToTypeElement.textContent
    if (textToSpeak) {
        const utterance = new SpeechSynthesisUtterance(textToSpeak)
        utterance.rate = 0.8 // Adjust the speaking rate as needed
        utterance.pitch = 1.0 // Adjust the pitch as needed
        synth.speak(utterance) // Speak the text
    }
}

// Event listener for the start button
startButton.addEventListener('click', () => {
    start() // Call the start function when the button is clicked
})

// Event listener for the stop button
stopButton.addEventListener('click', function () {
    if (timer) {
        clearInterval(timer) // Clear the timer interval
        timer = null // Reset the timer variable to indicate it's paused
        timeDisplay.textContent = 'Timer Paused' // Update the time display to "Timer Paused"
        synth.cancel() // Stop any speech synthesis
        startButton.disabled = false // Re-enable the start button
        typingArea.disabled = true // Disable typing area when timer is paused
    }
})
// Update Timer Function
function updateTimer() {
    timeLeft--
    timeDisplay.textContent = `${timeLeft}s` // Update the time display

    // Calculate the new offset for the circle
    const offset = circumference - (timeLeft / 45) * circumference // Adjust based on time left
    progressCircle.style.strokeDashoffset = offset // Update the circle's stroke offset

    // If timer reaches 0, stop the countdown
    if (timeLeft === 0) {
        clearInterval(timer)
        timeDisplay.textContent = "Time's up!"
        timeDisplay.style.fontSize = '20px'

        typingArea.disabled = true // Disable typing area
        startButton.disabled = false // Re-enable start button
        // No need to hide the progress circle
        updateStats() // Update final stats
    }
}

// Typing Area Input Event
typingArea.addEventListener('input', function () {
    typedText = typingArea.value
    updateStats()
})

// Update Stats Function
function updateStats() {
    if (typingStartTime) {
        const elapsedTime = (new Date().getTime() - typingStartTime) / 1000 // Time in seconds
        const totalChars = typedText.length
        const totalWords = typedText.split(/\s+/).filter(Boolean).length

        // Split texts into words
        const typedWords = typedText.split(/\s+/).filter(Boolean)
        const correctWords = correctText.split(/\s+/).filter(Boolean)

        // Match words
        const matchedWords = typedWords.filter((word, index) => word === correctWords[index])
        const correctCount = matchedWords.length
        const totalCount = correctWords.length

        // Accuracy Calculation based on matched words
        const accuracy = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0

        // Calculate characters per second
        const charsPerMin = elapsedTime > 0 ? (totalChars / elapsedTime) * 60 : 0

        // Calculate words per minute
        const wordsPerMin = elapsedTime > 0 ? (totalWords / elapsedTime) * 60 : 0
        const wpm = Math.round(wordsPerMin) || 0

        // Update DOM elements
        charPerMinElement.textContent = Math.round(charsPerMin) || 0
        wpmElement.textContent = wpm
        accuracyElement.textContent = accuracy

        // Change accuracy circle background color based on accuracy
        const accuracyCircle = document.querySelector('.circle:nth-child(2)') // Select the accuracy circle
        if (accuracy < 35) {
            accuracyCircle.style.borderColor = 'red' // Set background color to red
        } else if (accuracy > 60) {
            accuracyCircle.style.borderColor = 'green' // Set background color to green
        } else {
            accuracyCircle.style.borderColor = 'var(--accent1)' // Reset to original color
        }

        const charPerSecCircle = document.querySelector('.circle:nth-child(1)') // Assuming the first circle represents char/sec
        if (charsPerMin < 100) {
            charPerSecCircle.style.borderColor = 'red' // Set background color to red
        } else if (charsPerMin > 200) {
            charPerSecCircle.style.borderColor = 'green' // Set background color to green
        } else {
            charPerSecCircle.style.borderColor = 'var(--accent1)' // Reset to original color
        }

        const wpmCircle = document.querySelector('.circle:nth-child(3)') // Assuming the third circle represents wpm
        if (wpm < 10) {
            wpmCircle.style.borderColor = 'red' // Set background color to red
        } else if (wpm > 20) {
            wpmCircle.style.borderColor = 'green' // Set background color to green
        } else {
            wpmCircle.style.borderColor = 'var(--accent1)' // Reset to original color
        }
    }
}
// Get Correct Characters Function
function getCorrectChars(typed, correct) {
    let correctChars = 0
    const minLength = Math.min(typed.length, correct.length)
    for (let i = 0; i < minLength; i++) {
        if (typed[i] === correct[i]) {
            correctChars++
        }
    }
    return correctChars
}

// Texts based on genre
const textsByGenre = {
    easy: {
        general: 'The quick brown fox jumps over the lazy dog. The fox was quick, but the dog was even lazier.',
        technology:
            'Artificial intelligence is revolutionizing technology across various sectors. Machine learning is a subset of AI.',
        history:
            'The Roman Empire was one of the most influential civilizations in human history. It spanned across three continents.',
        science:
            'Quantum physics explores the behavior of matter and energy at the atomic level. It challenges classical physics.',
        literature:
            "To be, or not to be, that is the question. Shakespeare's Hamlet contemplates the meaning of life and death.",
        philosophy: 'The unexamined life is not worth living. Socrates emphasized the importance of self-reflection.',
        fiction:
            'Once upon a time, in a faraway land, there lived a brave knight. His journey was filled with danger and adventure.',
    },
    medium: {
        general:
            "The quick brown fox jumps over the lazy dog. The fox was quick, but the dog was even lazier. The dog was so lazy that it didn't even bother to chase the fox.",
        technology:
            'Artificial intelligence is revolutionizing technology across various sectors. Machine learning is a subset of AI that enables computers to learn from data without being explicitly programmed.',
        history:
            'The Roman Empire was one of the most influential civilizations in human history. It spanned across three continents and lasted for over 500 years. The Roman Empire was known for its military prowess, engineering achievements, and cultural contributions.',
        science:
            'Quantum physics explores the behavior of matter and energy at the atomic level. It challenges classical physics and introduces concepts such as superposition, entanglement, and uncertainty. Quantum mechanics has led to the development of technologies like lasers and transistors.',
        literature:
            "To be, or not to be, that is the question. Shakespeare's Hamlet contemplates the meaning of life and death. The play explores themes of revenge, madness, and mortality.",
        philosophy:
            'The unexamined life is not worth living. Socrates emphasized the importance of self-reflection and critical thinking. He believed that true knowledge comes from questioning our assumptions and seeking the truth.',
        fiction:
            'Once upon a time, in a faraway land, there lived a brave knight named Sir Galahad. He embarked on a quest to find the Holy Grail, a cup said to have been used by Jesus Christ at the Last Supper. Along the way, he faced many challenges and trials, but his courage and determination led him to his ultimate goal.',
    },
    hard: {
        general:
            'The quick brown fox jumps over the lazy dog. The fox was quick, but the dog was even lazier. They both lived in a small village surrounded by lush green forests. Every day, the fox would try to outsmart the dog, but the dog always found a way to stay one step ahead.',
        technology:
            'Artificial intelligence is revolutionizing technology across various sectors. Machine learning, a subset of AI, enables systems to learn and improve from experience. From healthcare to finance, AI is transforming industries by automating tasks and providing insights that were previously unimaginable.',
        history:
            'The Roman Empire was one of the most influential civilizations in human history. It spanned across three continents and lasted for over a thousand years. The Romans made significant contributions to architecture, law, and engineering, many of which still impact our world today.',
        science:
            'Quantum physics explores the behavior of matter and energy at the atomic level. It challenges classical physics with concepts like superposition and entanglement. These phenomena have led to groundbreaking discoveries and technologies, such as quantum computing and cryptography.',
        literature:
            "To be, or not to be, that is the question. Shakespeare's Hamlet contemplates the meaning of life and death. This soliloquy is one of the most famous passages in English literature, reflecting the deep existential angst and philosophical inquiries of the human condition.",
        philosophy:
            'The unexamined life is not worth living. Socrates emphasized the importance of self-reflection and critical thinking. His teachings laid the foundation for Western philosophy, encouraging individuals to seek knowledge and truth through dialogue and introspection.',
        fiction:
            'Once upon a time, in a faraway land, there lived a brave knight. His journey was filled with danger and adventure. He battled fierce dragons, rescued damsels in distress, and sought the legendary treasure that would bring peace to his kingdom.',
    },
}

function highlightMismatches() {
    const inputText = typingArea.value // Get the current input from the typing area
    const textToType = textToTypeElement.textContent // Get the text to type

    // Split the input and the text to type into arrays of words
    const inputWords = inputText.split(/\s+/) // Changed to handle multiple spaces
    const targetWords = textToType.split(/\s+/)

    // Create a highlighted text
    const highlightedText = targetWords
        .map((word, index) => {
            // Compare words and change color if they do not match
            return inputWords[index] !== word
                ? `<span style="color: red;">${word}</span>` // Mismatch
                : word // Match
        })
        .join(' ')

    // Update the text-to-type element with highlighted text
    textToTypeElement.innerHTML = highlightedText // Use innerHTML to allow HTML rendering
}

// Event listener for input in the typing area
typingArea.addEventListener('input', function () {
    highlightMismatches() // Highlight mismatches on input
    updateStats() // Update stats as the user types
})
// Function to get text by selected mode and genre (unchanged)
function getTextByModeAndGenre(mode, genre) {
    if (mode === 'easy') return textsByGenre.easy[genre]
    if (mode === 'medium') return textsByGenre.medium[genre]
    if (mode === 'hard') return textsByGenre.hard[genre]
}

// Function to update text based on the current mode and genre (unchanged)
function updateText() {
    const selectedGenre = genreDropdown.value // Get selected genre
    const selectedMode = modeDropdown.value // Get selected mode

    // Get the correct text based on mode and genre
    const textToDisplay = getTextByModeAndGenre(selectedMode, selectedGenre)
    // Update the text-to-type element
    textToTypeElement.textContent = textToDisplay || 'Text not available'

    // Reset the text area and other related variables
    if (!typingArea.disabled) {
        typingArea.value = ''
        correctText = textToDisplay
        updateStats() // Assuming this function handles updating stats
    }
}

// Set default text on window load (unchanged)
window.onload = function () {
    const defaultText = textsByGenre.easy.general // Default text
    textToTypeElement.textContent = defaultText // Set default text
    correctText = defaultText // Set correct text
}

// Event listener for genre change (unchanged)
genreDropdown.addEventListener('change', updateText)

// Event listener for mode change (unchanged)
modeDropdown.addEventListener('change', updateText)
