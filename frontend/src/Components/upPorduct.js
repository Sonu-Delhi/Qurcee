import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const UploadProduct = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("productImage", file); // 'productImage' matches the Multer config

    setIsUploading(true);
    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success("Image uploaded successfully!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Upload failed. Please try again.");
    }
    setIsUploading(false);
  };

  return (
    <div className="container">
      <ToastContainer />
      <form onSubmit={handleUpload}>
        <label htmlFor="productImage">Upload Product Image</label>
        <input type="file" onChange={handleFileChange} accept="image/*" />

        <button type="submit" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Upload Image"}
        </button>
      </form>
    </div>
  );
};

export default UploadProduct;
