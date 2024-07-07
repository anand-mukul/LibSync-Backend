import express from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 7777;

app.get("/", (req, res) => {
  res.send("Hello, BookHub!");
});

app.listen(PORT, () => {
  console.log(`🔗 Server is running on http://localhost:${PORT}`);
  console.log(`🌟 Environment: ${process.env.NODE_ENV || "development"}\n`);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
