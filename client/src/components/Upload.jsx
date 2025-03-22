import { useCallback, useState } from "react";
import {
  ArrowBigDown,
  ArrowDown,
  FileInputIcon,
  Recycle,
  Upload,
} from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Typewriter } from "react-simple-typewriter";
import { motion, transform } from "framer-motion";

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState("png");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isPopping, setIsPopping] = useState(false);

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

  const allowedFormats = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/tiff",
    "image/avif",
  ];

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (!allowedFormats.includes(file.type)) {
      alert("Invalid file type. Please upload a valid image.");
      return;
    }

    setFile(file);
  };

  const handleFormatChange = (event) => {
    setFormat(event.target.value);
  };

  const API_URL =
    import.meta.env.VITE_APP_ENV === "prod"
      ? import.meta.env.VITE_APP_PROD_BACKEND_API
      : import.meta.env.VITE_APP_DEV_BACKEND_API;
  const handleUpload = async () => {
    if (!file) return alert("Please select an image file");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("format", format);

    setLoading(true);
    setUploadProgress(0);
    setDownloadURL("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const downloadLink = URL.createObjectURL(blob);
        setDownloadURL(downloadLink);

        // Trigger pop effect
        setIsPopping(true);
        setTimeout(() => setIsPopping(false), 1000);

        // Show modal after conversion
        setTimeout(() => setShowModal(true), 1100);
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
    <div className="flex flex-col items-center justify-center p-6 w-full sm:max-w-[50%] md:max-w-[50%] font-stretch-ultra-condensed mx-auto bg-purple-200 shadow-lg rounded-lg">
      <div className="text-center mb-6">
        {/* Typing Animation */}
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="sm:text-lg md:text-2xl font-bold text-gray-800"
        >
          <Typewriter
            words={["Image Conversion, Simplified in Three Steps!"]}
            typeSpeed={50}
            cursor
          />
        </motion.h1>
        <p className="text-gray-600 sm:text-sm text-left ml-10 md:text-2xl mt-12">
          Upload your image, choose your desired format, and get your converted
          file instantly! <br />
          No complex settings, no hassle—just fast and high-quality conversions
          at your fingertips.
        </p>
      </div>
      {/* Drag & Drop Upload Box */}
      <div
        {...getRootProps()}
        className="border-2 mt-10 w-52 h-52 mb-10 border-dashed border-black p-10 text-center cursor-pointer bg-gray-300 hover:bg-gray-400 rounded-md flex items-center justify-center"
      >
        <input {...getInputProps()} />
        {imagePreview ? (
          <div className="flex items-center justify-center w-full h-full">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-md"
            />
          </div>
        ) : (
          <div className="text-gray-500 text-2xl flex flex-col items-center justify-center">
            <FileInputIcon size={55} />
            <span>Drag & drop an image, or click to select one</span>
          </div>
        )}
      </div>
      {/* File Format Selection */}
      <select
        className="mt-8 md:w-[10%] sm:w-[50%] sm:p-10 p-5 bg-blue-800 border rounded-md"
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
      {/* /* Upload & Convert Button with Pop Effect */}
      <motion.button
        onClick={handleUpload}
        className="convert mt-4 w-[30%] sm:w-[80%] md:w-[50%] lg:w-[20%] bg-black text-white font-semibold py-2 px-4 rounded flex items-center justify-center gap-2"
        disabled={loading}
        animate={isPopping ? { scale: [1, 1.2, 1] } : {}}
      >
        {loading ? (
          <>
            Processing...
            <Recycle size={30} className="animate-spin" />
          </>
        ) : (
          <>
            Convert Image
            <Recycle size={30} />
          </>
        )}
      </motion.button>
      {/* Progress Bar */}
      {loading && (
        <div className="w-full bg-gray-300 rounded-full h-2 mt-4">
          <div
            className="bg-blue-500 h-full transition-all duration-500"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}
      {/* Modal for Converted Image */}
      {showModal && (
        <div className="fixed h-[100%] p-10 inset-0 flex items-center justify-center bg-black z-30 opacity-95">
          <div className="bg-white opacity-100 p-6 rounded-lg shadow-lg w-[90%] max-w-md text-center">
            <h2 className="text-lg font-extrabold">
              We Cooked!! Your Image is Readyy
            </h2>
            {downloadURL && (
              <div className="flex items-center justify-center mt-10">
                <img
                  src={downloadURL}
                  alt="Converted Preview"
                  className="w-50 flex items-center justify-center rounded mt-3"
                />
              </div>
            )}
            <p className="text-gray-600 mt-2">
              {file ? file.name : "Converted Image"}
            </p>
            <a
              href={downloadURL}
              download={file ? file.name : "converted-image"}
              className="btn btn-success mt-4 w-full"
            >
              Download Image
            </a>
            <p className="text-sm mt-4">
              The developer spent **
              <span className="font-bold">2 sleepless night</span>** building
              this. <br /> Motivate Him to Build more!
            </p>
            <a
              href="https://buymeacoffee.com/saintdannyyy"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline mt-2 w-full"
            >
              ☕ Buy Him Some Coffee
            </a>
            <div className="flex items-center justify-center mt-4">
              <button
                className="btn btn-error mt-4 w-[30%]"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
