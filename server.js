const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Endpoint to generate a random startup idea
app.get('/generate-idea', (req, res) => {
  const ideas = [
    "Private car rental platform",
    "Local restaurant food delivery app",
    "Marketplace for used items",
    "Social network for art lovers",
    "Online course organization service"
  ];
  const idea = ideas[Math.floor(Math.random() * ideas.length)];
  res.json({ idea });
});

// Endpoint to calculate investments with a simulated error
app.get('/calculate-investments', (req, res) => {
  const randomError = Math.random() < 0.5; // 50% chance of error
  if (randomError) {
    const errorCode = Math.random() < 0.5 ? 500 : 404;
    const errorMessage = `Server Error: ${errorCode}`;
    
    // Log the error to logs/error.log
    const logDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }
    const logMessage = `${new Date().toISOString()} - ${req.originalUrl} - ${errorMessage}\n`;
    fs.appendFileSync(path.join(logDir, 'error.log'), logMessage);
    
    res.status(errorCode).json({ error: errorMessage });
  } else {
    res.json({ investment: "Investments calculated successfully!" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
