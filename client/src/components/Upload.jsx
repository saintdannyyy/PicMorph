import { useCallback, useState } from "react";
import { Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";

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
    <div className="flex flex-col items-center justify-center p-6 w-full max-w-lg mx-auto bg-gradient-to-bl from-purple-700 to-blue-700 shadow-lg rounded-lg">
      {/* Drag & Drop Upload Box */}
      <div
        {...getRootProps()}
        className="border-2 border-dashed p-6 w-full text-center cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-md"
      >
        <input {...getInputProps()} />
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-32 h-32 object-cover mx-auto rounded-md"
          />
        ) : (
          <p className="text-gray-500">
            Drag & drop an image, or click to select one
          </p>
        )}
      </div>

      {/* File Format Selection */}
      <select
        className="mt-4 w-full p-2 border rounded-md"
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
        className="mt-4 w-[50%] bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded flex items-center justify-center gap-2"
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
