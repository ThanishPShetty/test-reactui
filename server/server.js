const express = require('express');
const cors = require('cors');
const NodeSSPI = require('node-sspi');

const app = express();


app.use(cors({
    origin: "http://localhost:3000", // Allow React frontend
    credentials: true // Allow cookies & authentication
}));


app.options('*', cors());


app.use((req, res, next) => {
    const nodeSSPI = new NodeSSPI({
        retrieveGroups: true
    });

    nodeSSPI.authenticate(req, res, (err) => {
        if (!res.finished) {
            req.user = req.connection.user;
            next();
        }
    });
});

// Route to send user info
app.get('/api/get-ntid', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // ✅ Ensures frontend can access API
    res.setHeader("Access-Control-Allow-Credentials", "true"); // ✅ Allows credentials
    res.json({ username: req.user });
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

