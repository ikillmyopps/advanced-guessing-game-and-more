const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory data
let leaderboardData = [
    { username: 'Player1', attempts: 5, time: 10 },
    { username: 'Player2', attempts: 8, time: 15 },
    { username: 'Player3', attempts: 6, time: 12 },
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get leaderboard data
app.get('/api/leaderboard', (req, res) => {
    res.json(leaderboardData);
});

// API endpoint to update leaderboard data
app.post('/api/leaderboard', (req, res) => {
    const { username, attempts, time } = req.body;
    leaderboardData.push({ username, attempts, time });
    leaderboardData.sort((a, b) => {
        if (a.attempts === b.attempts) {
            return a.time - b.time;
        }
        return a.attempts - b.attempts;
    });

    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
