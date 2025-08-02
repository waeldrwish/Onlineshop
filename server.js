const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const logger = require("./middleware/logger")
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productsRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(logger)
app.use(express.json());
app.use(express.static("public"));
// Routes
app.use("/api/auth", authRouter);
app.use("/api", productRouter);

// Root route (optional)
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});
app.get("/admin", (req, res) => {
  res.sendFile(__dirname + "/public/admin.html");
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });