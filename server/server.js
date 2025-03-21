const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // Ensure JSON body is parsed
app.use(express.urlencoded({ extended: true })); // Enable form data parsing

// Set up multer for handling file uploads
const upload = multer({ dest: "uploads/" });

app.post("/convert", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const format = req.body.format || "png"; // Get format from request body
    const outputPath = path.join(__dirname, "uploads", `converted.${format}`); // Define output path correctly

    await sharp(req.file.path).toFormat(format).toFile(outputPath);

    // Send the converted file for download
    res.download(outputPath, (err) => {
      if (err) {
        console.error("Download error:", err);
      }
      // Cleanup files
      if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path); // Delete original file
      if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath); // Delete converted file
    });
  } catch (error) {
    console.error("Sharp processing error:", error);
    res.status(500).json({ error: "Image conversion failed" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
