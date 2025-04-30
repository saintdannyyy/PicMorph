import { useState, useCallback } from "react";
import { Upload } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import { color, motion, transform } from "framer-motion";

const PicMorph = () => {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState("png");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer?.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      handleFileSelection(droppedFile);
    }
  }, []);

  const handleFileSelection = (selectedFile) => {
    setFile(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
  };

  const handleFormatChange = (event) => {
    setFormat(event.target.value);
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setUploadProgress(0);
    setDownloadURL("");

    // Simulate upload/conversion process
    const simulateProgress = () => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        setUploadProgress(progress);

        if (progress >= 100) {
          clearInterval(interval);
          // Simulate completion
          setTimeout(() => {
            setDownloadURL(imagePreview);
            setLoading(false);
            setShowModal(true);
          }, 500);
        }
      }, 100);
    };

    simulateProgress();
  };

  const browseFiles = () => {
    document.getElementById("file-input").click();
  };

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      handleFileSelection(selectedFile);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto text-center">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">PicMorph</h1>
      <p className="text-xl mb-12">
        {/* /* Typing Animation */}
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="sm:text-md md:text-md font-bold text-white"
        >
          <Typewriter
            words={["Fast and Quality Image Conversion!"]}
            typeSpeed={60}
            cursor
          />
        </motion.h1>
      </p>

      {/* Main Container */}
      <div className="mx-auto max-w-3xl">
        {/* Upload Area */}
        <div className="rounded-lg border border-dashed border-gray-700 bg-gray-900 p-16 mb-8">
          <div
            className="flex flex-col items-center justify-center cursor-pointer"
            onClick={browseFiles}
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
          >
            <input
              type="file"
              id="file-input"
              accept="image/*"
              className="hidden"
              onChange={handleFileInputChange}
            />

            {imagePreview ? (
              <div className="flex flex-col items-center">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-48 object-contain rounded mb-4"
                />
                <p className="text-gray-400">{file?.name}</p>
              </div>
            ) : (
              <>
                <Upload size={48} className="text-gray-400 mb-6" />
                <p className="text-xl font-medium mb-3">
                  Drag & drop a file here, or click to select
                </p>
                <p className="text-gray-400">
                  Supported formats: Images, Audio, and Video
                </p>
              </>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <select
            className="bg-gray-800 py-3 px-5 rounded text-white focus:outline-none sm:w-40"
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

          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className={`py-3 px-6 rounded font-medium flex items-center justify-center gap-2 ${
              !file
                ? "bg-gray-700 opacity-50 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Processing..." : "Convert Image"}
          </button>
        </div>

        {/* Progress Bar */}
        {loading && (
          <div className="w-full max-w-lg mx-auto mb-8">
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Result Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80">
          <div className="bg-gray-900 rounded-xl p-8 max-w-lg w-full mx-4">
            <h2 className="text-2xl font-bold mb-6">Conversion Complete!</h2>

            {downloadURL && (
              <div className="flex items-center justify-center mb-6">
                <img
                  src={downloadURL}
                  alt="Converted Preview"
                  className="max-h-64 rounded-lg"
                />
              </div>
            )}

            <p className="text-gray-300 mb-6">
              Your image has been successfully converted to{" "}
              {format.toUpperCase()}
            </p>

            <div className="flex flex-col gap-3">
              <a
                href={downloadURL}
                download={`converted-${file?.name || "image"}.${format}`}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                Download Image
              </a>

              <button
                onClick={() => setShowModal(false)}
                className="w-full py-3 bg-gray-800 hover:bg-gray-700 rounded-lg"
              >
                Convert Another Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PicMorph;
