require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const path = require("path");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON
app.use(express.static(path.join(__dirname, "public"))); // Serve public folder

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("<h1>🚀 Welcome to Anjum’s Node App!</h1><p>This is served from the public folder.</p>");
});

app.use("/api/users", userRoutes);

// Start Server
app.listen(PORT, () => console.log(`🌍 Server running on port ${PORT}`));
