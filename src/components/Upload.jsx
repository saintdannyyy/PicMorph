import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { storage } from "../firebase"; // Ensure Firebase is configured
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import sharp from "sharp-wasm";

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [convertedImage, setConvertedImage] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState("png");
  const [downloadURL, setDownloadURL] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imagePreview, setImagePreview] = useState("");

  // Drag & Drop Handler
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  // Convert Image
  const convertImage = async () => {
    if (!image) return;

    const arrayBuffer = await image.arrayBuffer();
    const sharpInstance = await sharp(arrayBuffer);

    let outputFormat = selectedFormat;
    if (selectedFormat === "jpg") outputFormat = "jpeg"; // Sharp uses "jpeg"

    const convertedBuffer = await sharpInstance
      .toFormat(outputFormat)
      .toBuffer();

    const convertedFile = new File(
      [convertedBuffer],
      `converted.${selectedFormat}`,
      {
        type: `image/${selectedFormat}`,
      }
    );

    setConvertedImage(convertedFile);
  };

  // Upload Converted Image
  const handleUpload = () => {
    if (!convertedImage) return;

    const storageRef = ref(storage, `uploads/${convertedImage.name}`);
    const uploadTask = uploadBytesResumable(storageRef, convertedImage);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => console.error("Upload failed:", error),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setDownloadURL(url);
        setUploadProgress(100); // Set to complete
      }
    );
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-6">
      {/* Drag & Drop Area */}
      <div
        {...getRootProps()}
        className="border-2 border-dashed p-6 w-64 text-center cursor-pointer bg-gray-100 hover:bg-gray-200"
      >
        <input {...getInputProps()} />
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-32 h-32 object-cover mx-auto"
          />
        ) : (
          <p>Drag & drop an image, or click to select one</p>
        )}
      </div>

      {/* Format Selection */}
      <select
        onChange={(e) => setSelectedFormat(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="png">PNG</option>
        <option value="jpg">JPG</option>
        <option value="webp">WEBP</option>
      </select>

      {/* Convert Button */}
      <button
        onClick={convertImage}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Convert Image
      </button>

      {/* Upload Button & Progress Bar */}
      {convertedImage && (
        <>
          <button
            onClick={handleUpload}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Upload Converted Image
          </button>
          {uploadProgress > 0 && (
            <div className="w-64 bg-gray-300 rounded-full h-4 overflow-hidden">
              <div
                className="bg-green-500 h-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}
        </>
      )}

      {/* Download Link */}
      {downloadURL && (
        <div className="text-center">
          <p>Download your converted image:</p>
          <a
            href={downloadURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
