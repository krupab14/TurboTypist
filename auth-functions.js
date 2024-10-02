// Function to display the login form
function showLogin() {
    document.body.innerHTML = `
        <div id="loginForm" class="form-container">
            <div class="header-container">
                <h2 style="float:left;">Login</h2>
                <i class="bx bx-home home-icon" style="float:right;" onclick="navigateHome()"></i>
            </div>
            <form id="loginFormElement">
                <label for="username">Username:</label>
                <input type="text" id="username" placeholder="Enter your username" required />
                <br />
                <label for="password">Password:</label>
                <input type="password" id="password" placeholder="Enter your password" required />
                <br />
                <button type="button" onclick="login()">Login</button>
            </form>
            <button onclick="showSignup()">Sign Up</button>
        </div>
    `
}

// Function to display the signup form
function showSignup() {
    document.body.innerHTML = `
        <div id="signupForm" class="form-container">
            <div class="header-container">
                <h2>Register</h2>
                <i class="bx bx-home home-icon" style="float:right;" onclick="navigateHome()"></i>
            </div>
            <form id="signupFormElement">
                <label for="newUsername">Username:</label>
                <input type="text" id="newUsername" placeholder="Choose a username" required />
                <br />
                <label for="email">Email:</label>
                <input type="email" id="email" placeholder="Enter your email" required />
                <br />
                <label for="newPassword">Password:</label>
                <input type="password" id="newPassword" placeholder="Create a password" required />
                <br />
                <label for="confirmPassword">Confirm Password:</label>
                <input type="password" id="confirmPassword" placeholder="Re-enter your password" required />
                <br />
                <button type="button" onclick="register()">Register</button>
            </form>
            <button onclick="showLogin()">Login</button>
        </div>
    `
}

// Function to handle home icon navigation
function navigateHome() {
    window.location.href = 'index.html' // Redirect to index.html when the home icon is clicked
}

// Sample users data stored as key-value pairs (username, password, role)
const users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'Krupa', password: '111', role: 'user' },
    { username: 'Dharmil', password: '222', role: 'user' },
    { username: 'Ankita', password: '333', role: 'user' },
]

// Function to validate login
function login() {
    const enteredUsername = document.getElementById('username').value.trim()
    const enteredPassword = document.getElementById('password').value.trim()

    if (!enteredUsername || !enteredPassword) {
        alert('Please fill in all fields.')
        return
    }

    const user = users.find((user) => user.username === enteredUsername && user.password === enteredPassword)

    if (user) {
        localStorage.setItem('currentUser', enteredUsername) // Store the username in localStorage
        if (user.role === 'admin') {
            window.location.href = 'admin.html' // Redirect to admin.html for admin
        } else {
            window.location.href = 'user.html' // Redirect to user.html for regular users
        }
    } else {
        alert('Invalid username or password. Please try again.')
    }
}

// Function to register a new user
function register() {
    const newUsername = document.getElementById('newUsername').value.trim()
    const newPassword = document.getElementById('newPassword').value.trim()
    const confirmPassword = document.getElementById('confirmPassword').value.trim()
    const email = document.getElementById('email').value.trim()

    if (!newUsername || !newPassword || !confirmPassword || !email) {
        alert('Please fill in all fields.')
        return
    }

    if (newPassword !== confirmPassword) {
        alert('Passwords do not match!')
        return
    }

    const userExists = users.some((user) => user.username === newUsername)

    if (userExists) {
        alert('Username already exists. Please choose another.')
    } else {
        users.push({ username: newUsername, password: newPassword, role: 'user' })
        alert('Registration successful! You can now log in.')
        showLogin() // Go back to login after successful registration
    }
}

// Initial load
showLogin() // Show login form initially
