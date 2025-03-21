import { useState } from "react";
import { Upload } from "lucide-react";

export default function PicMorph() {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState("png");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFormatChange = (event) => {
    setFormat(event.target.value);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select an image file");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("format", format);

    try {
      const response = await fetch("http://localhost:3000/convert", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `converted.${format}`;
        link.click();
      } else {
        alert("Conversion failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-base-content">
      {/* Header */}
      <header className="w-full p-4 bg-primary text-white text-center text-2xl font-bold shadow-md">
        PicMorph
      </header>

      {/* Upload Section */}
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-6 mt-6">
        <div className="card-body flex flex-col items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input file-input-bordered w-full"
          />
          <select
            className="select select-bordered w-full"
            value={format}
            onChange={handleFormatChange}
          >
            <option value="png">PNG</option>
            <option value="jpg">JPG</option>
            <option value="webp">WEBP</option>
          </select>
          <button
            onClick={handleUpload}
            className="btn btn-primary w-full flex items-center gap-2"
          >
            <Upload size={16} /> Convert Image
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full p-4 mt-8 bg-base-300 text-center text-sm">
        <a
          href="https://www.buymeacoffee.com/yourpage"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          ☕ Buy Me a Coffee
        </a>
      </footer>
    </div>
  );
}
