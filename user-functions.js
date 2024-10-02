function linkStylesheet() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'user-style.css'; // Path to your stylesheet
    document.head.appendChild(link);
}

// Call the function to link the stylesheet
linkStylesheet();


// Sample users data stored as key-value pairs (username, password, role)
const users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'Krupa', password: '111', role: 'user' },
    { username: 'Dharmil', password: '222', role: 'user' },
    { username: 'Ankita', password: '333', role: 'user' }
];

// Sample data for user performance metrics
const userPerformanceData = {
    'Krupa': [
        { date: '2024-09-27', accuracy: '98%', wpm: '85 WPM', cps: '5.7' },
        { date: '2024-09-26', accuracy: '97%', wpm: '80 WPM', cps: '5.5' },
        { date: '2024-09-25', accuracy: '96%', wpm: '78 WPM', cps: '5.3' },
        { date: '2024-09-24', accuracy: '95%', wpm: '76 WPM', cps: '5.2' },
        { date: '2024-09-23', accuracy: '94%', wpm: '74 WPM', cps: '5.1' },
        { date: '2024-09-22', accuracy: '93%', wpm: '72 WPM', cps: '5.0' }
    ],
    'Dharmil': [
        { date: '2024-09-27', accuracy: '97%', wpm: '82 WPM', cps: '5.4' },
        { date: '2024-09-26', accuracy: '96%', wpm: '79 WPM', cps: '5.2' },
        { date: '2024-09-25', accuracy: '95%', wpm: '76 WPM', cps: '5.1' },
        { date: '2024-09-24', accuracy: '94%', wpm: '73 WPM', cps: '5.0' },
        { date: '2024-09-23', accuracy: '93%', wpm: '71 WPM', cps: '4.9' },
        { date: '2024-09-22', accuracy: '92%', wpm: '69 WPM', cps: '4.8' }
    ],
    'Ankita': [
        { date: '2024-09-27', accuracy: '95%', wpm: '80 WPM', cps: '5.3' },
        { date: '2024-09-26', accuracy: '94%', wpm: '78 WPM', cps: '5.2' },
        { date: '2024-09-25', accuracy: '93%', wpm: '76 WPM', cps: '5.1' },
        { date: '2024-09-24', accuracy: '92%', wpm: '74 WPM', cps: '5.0' },
        { date: '2024-09-23', accuracy: '91%', wpm: '72 WPM', cps: '4.9' },
        { date: '2024-09-22', accuracy: '90%', wpm: '70 WPM', cps: '4.8' }
    ]
};

// Function to get a random subset of an array
function getRandomSubset(arr, maxSize) {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, maxSize);
}

// Function to check if the user is logged in and display the user dashboard
function loadUserDashboard() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        alert('You must be logged in to view this page.');
        window.location.href = 'index.html'; // Redirect to login page if not logged in
        return;
    }

    // Get the user details from localStorage
    const user = users.find(u => u.username === currentUser);

    if (user) {
        populateUserTable(user.username); // Populate the user table with user data
    } else {
        alert('User not found.');
        window.location.href = 'index.html'; // Redirect to login page if user is not found
    }
}

// Function to populate the user table
function populateUserTable(username) {
    const tables = document.querySelectorAll('.user-table');
    tables.forEach(table => table.style.display = 'none'); // Hide all tables

    const currentTable = document.getElementById(username + 'Table');
    if (currentTable) {
        currentTable.style.display = 'table'; // Show the current user's table

        const tableBody = currentTable.getElementsByTagName('tbody')[0];
        tableBody.innerHTML = ''; // Clear existing rows

        const data = userPerformanceData[username];
        const randomData = getRandomSubset(data, 5);

        randomData.forEach(entry => {
            const row = document.createElement('tr');
            const dateCell = document.createElement('td');
            dateCell.textContent = entry.date;
            const accuracyCell = document.createElement('td');
            accuracyCell.textContent = entry.accuracy;
            const wpmCell = document.createElement('td');
            wpmCell.textContent = entry.wpm;
            const cpsCell = document.createElement('td');
            cpsCell.textContent = entry.cps;

            row.appendChild(dateCell);
            row.appendChild(accuracyCell);
            row.appendChild(wpmCell);
            row.appendChild(cpsCell);
            tableBody.appendChild(row);
        });
    }
}

// Function to handle logout
function logout() {
    localStorage.removeItem('currentUser');
    alert('You have been logged out.');
    window.location.href = 'index.html'; // Redirect to login page
}

// Initial load
loadUserDashboard();
