const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

// Multer setup for temporary storage
const upload = multer({ dest: "uploads/" });

app.post("/convert", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const format = req.body.format || "png";
    const allowedFormats = ["jpeg", "png", "webp", "gif", "tiff", "avif"];

    if (!allowedFormats.includes(format)) {
      return res.status(400).json({ error: "Unsupported format" });
    }

    const outputPath = path.join("uploads", `converted.${format}`);

    await sharp(req.file.path).toFormat(format).toFile(outputPath);

    // Send converted file for download and delete files after download completes
    res.download(outputPath, (err) => {
      if (err) {
        console.error("Download error:", err);
        res.status(500).json({ error: "Download failed" });
      }

      // Cleanup: Remove uploaded & converted files
      fs.unlink(req.file.path, () => {});
      fs.unlink(outputPath, () => {});
    });
  } catch (error) {
    console.error("Conversion error:", error);
    res.status(500).json({ error: "Image conversion failed" });
  }
});

app.get("/", (req, res) => {
  res.send("PicMorph API is running...");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
