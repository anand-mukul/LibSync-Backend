import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "app.log" }),
  ],
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = process.env.UPLOAD_PATH || "./public/temp";
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: process.env.MAX_FILE_SIZE || 1 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png/;
    const mimeType = allowedFileTypes.test(file.mimetype);
    const extName = allowedFileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimeType && extName) {
      return cb(null, true);
    }
    cb(
      new Error(
        "Error: File upload only supports the following filetypes - " +
          allowedFileTypes
      )
    );
  },
}).single("file");

const handleMulterErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    logger.error(`📁 Multer error :\n\n ${err.message}`);
    return res.status(400).json({ error: err.message });
  } else if (err) {
    logger.error(`😒 Unknown error :\n\n ${err.message}`);
    return res.status(500).json({ error: err.message });
  }
  next();
};

export { upload, handleMulterErrors };
