import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import productCategory from "../helper/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helper/uploadImage";
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import summryApi from "../common";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadProduct = ({ onClose, fetchDatas }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const [openFullScreen, setOpenFullScreen] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Upload product image
  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast('File size should be less than 5MB');
      return;
    }

    setIsUploading(true);
    try {
      const uploadImageCloudinary = await uploadImage(file);
      setData((prev) => ({
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url],
      }));
    } catch (error) {
      console.error('Image upload failed:', error);
      toast('Image upload failed, please try again.');
    }
    setIsUploading(false);
  };

  // Delete uploaded product image
  const handleDeleteProductImage = (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => ({
      ...prev,
      productImage: newProductImage,
    }));
  };

  // Submit product
  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(summryApi.uplaodProducts.url, {
        method: summryApi.uplaodProducts.method,
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData.message);
        onClose();
        fetchDatas();
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error('Product upload failed:', error);
      toast('Product upload failed, please try again.');
    }

    setIsLoading(false);
  };

  const handleClose = () => {
    onClose();
    setData({
      productName: "",
      brandName: "",
      category: "",
      productImage: [],
      description: "",
      price: "",
      sellingPrice: "",
    });
  };

  const isFormValid =
    data.productName && data.brandName && data.category && data.productImage.length;

  return (
    <div className="fixed w-full h-full top-0 left-0 bottom-0 right-0 bg-slate-200 bg-opacity-35 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex items-center justify-between pb-3">
        <ToastContainer/>
          <h2 className="font-bold text-lg">Upload Product</h2>
          <div
            onClick={handleClose}
            className="w-fit ml-auto text-2xl hover:text-orange-600 cursor-pointer"
          >
            <IoMdClose />
          </div>
        </div>

        <form className="grid p-4 gap-3 overflow-y-auto h-full pb-5" onSubmit={handleSubmitProduct}>
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            placeholder="Enter product name"
            id="productName"
            name="productName"
            value={data.productName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="brandName">Brand Name:</label>
          <input
            type="text"
            placeholder="Enter brand name"
            id="brandName"
            name="brandName"
            value={data.brandName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="category">Category:</label>
          <select
            value={data.category}
            name="category"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          >
            <option value="">Select Category</option>
            {productCategory.map((el, index) => (
              <option key={index} value={el.value}>
                {el.label}
              </option>
            ))}
          </select>

          <label htmlFor="productImage">Product Image:</label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full cursor-pointer flex justify-center items-center">
              <div className="text-slate-500 gap-2 flex justify-center items-center flex-col">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                  disabled={isUploading}
                />
              </div>
            </div>
          </label>
          <div>
            {data?.productImage.length > 0 ? (
              <div className="flex items-center gap-2">
                {data.productImage.map((img, index) => (
                  <div className="relative group" key={index}>
                    <img
                      src={img}
                      alt={`Product ${index + 1}`}
                      width={80}
                      height={80}
                      className="bg-slate-100 border cursor-pointer"
                      onClick={() => {
                        setOpenFullScreen(true);
                        setFullScreenImage(img);
                      }}
                    />
                    <div
                      className="absolute bottom-0 right-0 p-1 text-white bg-orange-600 rounded-full hidden group-hover:block"
                      onClick={() => handleDeleteProductImage(index)}
                    >
                      <MdDelete />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-red-600 text-xs cursor-pointer rounded-full">
                *Please upload product image
              </p>
            )}
          </div>

          <label htmlFor="price" className="mt-3">
            Price:
          </label>
          <input
            type="number"
            placeholder="Enter product price"
            id="price"
            name="price"
            value={data.price}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="sellingPrice" className="mt-3">
            Selling Price:
          </label>
          <input
            type="number"
            placeholder="Enter selling price"
            id="sellingPrice"
            name="sellingPrice"
            value={data.sellingPrice}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="description" className="mt-3">
            Description:
          </label>
          <textarea
            placeholder="Enter product description"
            rows={3}
            className="h-28 bg-slate-100 border resize-none p-1 rounded"
            onChange={handleOnChange}
            value={data.description}
            name="description"
            required
          />

          <button
            className="px-3 py-2 bg-orange-600 text-white mb-10 hover:bg-orange-700"
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? 'Uploading...' : 'Upload Product'}
          </button>
        </form>
      </div>

      {/* Display image full screen */}
      {openFullScreen && <DisplayImage onClose={() => setOpenFullScreen(false)} imageUrl={fullScreenImage} />}
    </div>
  );
};

export default UploadProduct;
