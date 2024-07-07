import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, BookHub!");
});

export default app;