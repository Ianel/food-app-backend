// Node modules
const express = require("express");
const env = require("dotenv");
const cors = require("cors");

// Environment variables
env.config({ path: "./.env" });

// Router
const dishesRouter = require("./routes/dishes.routes");

// Express instance
const app = express();

// Port
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/dishes", dishesRouter);

// Server
app.listen(port, "localhost", () => {
  console.log(`Server listening on port ${port}`);
});
