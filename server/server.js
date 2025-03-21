const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

// Set up multer for handling file uploads
const upload = multer({ dest: "uploads/" });

app.post("/convert", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const format = req.body.format || "png";
    const fileName = req.body.file || "converted";
    const outputPath = path.join("uploads", `${fileName.format}`);

    await sharp(req.file.path).toFormat(format).toFile(outputPath);

    // Send the converted file for download
    res.download(outputPath, (err) => {
      if (err) console.error("Download error:", err);
      fs.unlinkSync(req.file.path); // Clean up uploaded file
      fs.unlinkSync(outputPath); // Clean up converted file
    });
  } catch (error) {
    console.error("Sharp processing error:", error);
    res.status(500).json({ error: "Image conversion failed" });
  }
});

app.get("/", (req, res) => {
  res.send("PicMorph API is running...");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
