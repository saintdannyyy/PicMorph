import { useState } from "react";
import { storage } from "../fiirebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("png");

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!image) return;

    const storageRef = ref(storage, `uploads/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Upload failed:", error);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setDownloadURL(url);
        console.log("Uploaded Image URL:", url);
      }
    );
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 border rounded-lg shadow-md">
      <input type="file" onChange={handleFileChange} />

      <select
        value={selectedFormat}
        onChange={(e) => setSelectedFormat(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="png">PNG</option>
        <option value="jpg">JPG</option>
        <option value="webp">WEBP</option>
      </select>

      <button
        onClick={handleUpload}
        className="px-4 py-2 text-white bg-blue-500 rounded"
      >
        Upload Image
      </button>

      {uploadProgress > 0 && (
        <p>Upload Progress: {Math.round(uploadProgress)}%</p>
      )}

      {downloadURL && (
        <div>
          <p>Image Uploaded Successfully!</p>
          <img src={downloadURL} alt="Uploaded" className="w-40 h-auto" />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
