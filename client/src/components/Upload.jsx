import { useCallback, useState } from "react";
import { FileInputIcon, Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState("png");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file);
    setImagePreview(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  const handleFormatChange = (event) => {
    setFormat(event.target.value);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select an image file");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("format", format);

    setLoading(true);
    setUploadProgress(0);
    setDownloadURL("");

    try {
      const response = await fetch("http://localhost:3000/convert", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const downloadLink = URL.createObjectURL(blob);
        setDownloadURL(downloadLink);
      } else {
        alert("Conversion failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 w-full max-w-[60%] font-stretch-ultra-condensed mx-auto bg-purple-200 shadow-lg rounded-lg">
      <div className="text-center mb-6">
        {/* Typing Animation */}
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl font-bold text-gray-800"
        >
          <Typewriter
            words={["Image Conversion, Simplified in Three Steps!"]}
            typeSpeed={50}
            cursor
          />
        </motion.h1>
        <p className="text-gray-600 text-2xl mt-12">
          Upload your image, choose your desired format, and get your converted
          file instantly! No complex settings, no hassle—just fast and
          high-quality conversions at your fingertips.
        </p>
      </div>
      {/* /* Drag & Drop Upload Box */}
      <div
        {...getRootProps()}
        className="border-2 w-52 h-52 mt-5 border-dashed border-black p-10 text-center cursor-pointer bg-gray-300 hover:bg-gray-400 rounded-md flex items-center justify-center"
      >
        <input {...getInputProps()} />
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-40 h-40 object-cover rounded-md"
          />
        ) : (
          <div className="text-gray-500 text-2xl flex flex-col items-center justify-center">
            <FileInputIcon size={55} />
            <span>Drag & drop an image, or click to select one</span>
          </div>
        )}
      </div>

      {/* File Format Selection */}
      <select
        className="mt-8 w-[10%] p-5 bg-blue-800 border rounded-md"
        value={format}
        onChange={handleFormatChange}
      >
        <option value="png">PNG</option>
        <option value="jpg">JPG</option>
        <option value="webp">WEBP</option>
        <option value="avif">AVIF</option>
        <option value="gif">GIF</option>
        <option value="tiff">TIFF</option>
      </select>

      {/* Upload & Convert Button */}
      <button
        onClick={handleUpload}
        className="btn btn-primary mt-4 w-[50%] bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded flex items-center justify-center gap-2"
        disabled={loading}
      >
        {loading ? "Processing..." : "Convert Image"}
        <Upload size={16} />
      </button>

      {/* Progress Bar */}
      {loading && (
        <div className="w-full bg-gray-300 rounded-full h-2 mt-4">
          <div
            className="bg-blue-500 h-full transition-all duration-500"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}

      {/* Download Link */}
      {downloadURL && (
        <div className="text-center mt-4">
          <p className="text-gray-600">Download your converted image:</p>
          <a
            href={downloadURL}
            download={`converted.${format}`}
            className="text-blue-600 underline"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
