const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  })
);

const corsOptions = {
  origin: "https://w3villa-taskmanager.onrender.com/",
  credentials: true,
};
app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

// Mongo connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// route
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// server chalu
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
