const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { User, sequelize } = require('./models/user');
console.log("Loading environment...");
require('dotenv').config();
console.log("Starting server...");

const app = express();

app.set('views', path.join(__dirname, 'templates'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post("/api/add_user", express.json(), async (req, res) => {
  try {
    const { name, email, subject, phone, message } = req.body;
    const user = await User.create({ name, email, subject, phone, message });
    console.log("User saved:", user.toJSON());
    res.status(200).json({ message: "Contact submission received" });
  } catch (error) {
    console.error("Error handling contact form:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

sequelize.sync().then(() => {
  console.log("Database synced (force: true)");
  app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
  });
}).catch(err => {
  console.error("Failed to sync DB:", err);
});
