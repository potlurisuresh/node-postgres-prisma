const express = require("express");
require("dotenv").config();

// import routers
const postRoutes = require("./routes/posts");

const app = express();
app.use(express.json());
const port = process.env.PORT || 555;

app.get("/", (req, res) => {
  res.send("Welcome to Prisma, Express, and PSQL Tutorial");
});

// mount post routes
app.use(postRoutes);

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});