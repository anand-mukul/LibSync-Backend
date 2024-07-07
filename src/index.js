import "dotenv/config";
import connectDB from "./lib/db.js";
import app from "./app.js";

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`\n🔗 Server is running on http://localhost:${PORT}`);
      console.log(`🌟 Environment: ${process.env.NODE_ENV || "development"}\n`);
    });
  })
  .catch((err) => {
    console.error(
      "\n❌ MongoDB connection failed during server start! \n\n",
      err
    );
  });

process.on("uncaughtException", (err) => {
  console.error("\n❌ Uncaught Exception: \n\n", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error(
    "\n❌ Unhandled Rejection at: \n\n",
    promise,
    "\nreason: \n\n",
    reason
  );
});
