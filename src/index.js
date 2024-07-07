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

    app.on("error", (err) => {
      console.error("\n❌ Server error:\n", err);
      process.exit(1);
    });

    const gracefulShutdown = () => {
      console.log("\n🔥 Server is closing...");
      
      server.close(() => {
        console.log("\n🔒 All connections closed, exiting process...");
        process.exit(0);
      });
    };

    process.on("SIGINT", gracefulShutdown);
    process.on("SIGTERM", gracefulShutdown);
  })
  .catch((err) => {
    console.error("\n❌ Failed to connect to MongoDB:\n", err);
    process.exit(1);
  });

process.on("uncaughtException", (err) => {
  console.error("\n❌ Uncaught Exception:\n", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("\n❌ Unhandled Rejection at:", promise, "\nReason:", reason);
  process.exit(1);
});
