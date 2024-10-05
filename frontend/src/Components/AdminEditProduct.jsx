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

const AdminEditProduct = ({
    onClose,
    productData,
    fetchDatas
}) => {
    const [data, setData] = useState({
        ...productData,
        productName: productData?.productName,
        brandName: productData?.brandName || "",
        category: productData?.category || "",
        productImage: productData?.productImage || [],
        description: productData?.description || "",
        price: productData?.price || 0,
        sellingPrice: productData?.sellingPrice || 0,
    });
    
    const [openFullScreen, setOpenFullScreen] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    
    const handleUploadProduct = async (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setLoading(true);
            try {
                const uploadImageCloudinary = await uploadImage(file);
                setData((prev) => ({
                    ...prev,
                    productImage: [...(prev.productImage || []), uploadImageCloudinary.url],
                }));
            } catch (error) {
                toast.error("Error uploading image");
            } finally {
                setLoading(false);
            }
        } else {
            toast.error("Please upload a valid image file");
        }
    };

    const handleDeleteProductImage = (index) => {
        const newProductImage = [...data.productImage];
        newProductImage.splice(index, 1);
        setData((prev) => ({
            ...prev,
            productImage: newProductImage,
        }));
    };
    
    const handleSubmitProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(summryApi.updateProduct.url, {
                method: summryApi.updateProduct.method,
                credentials: "include",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();
            if (responseData.success) {
                toast.success(responseData?.message);
                setData({
                    productName: "",
                    brandName: "",
                    category: "",
                    productImage: [],
                    description: "",
                    price: 0,
                    sellingPrice: 0,
                });
                onClose();
                fetchDatas();
            } else {
                toast.error(responseData?.message);
            }
        } catch (error) {
            toast.error("Error saving product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed w-full h-full top-0 left-0 bottom-0 right-0 bg-slate-200 bg-opacity-35 flex justify-center items-center">
            <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
                <div className="flex items-center justify-between pb-3">
                <ToastContainer/>
                    <h2 className="font-bold text-lg">Edit Product</h2>
                    <div
                        onClick={onClose}
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
                        disabled={loading}
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
                        disabled={loading}
                    />

                    <label htmlFor="category">Category:</label>
                    <select
                        value={data.category}
                        name="category"
                        onChange={handleOnChange}
                        className="p-2 bg-slate-100 border rounded"
                        required
                        disabled={loading}
                    >
                        <option value="">Select Category</option>
                        {productCategory.map((el, index) => (
                            <option key={el.value + index} value={el.value}>
                                {el.label}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="productImage">Product Image:</label>
                    <label htmlFor="uploadImageInput" className="cursor-pointer">
                        <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center">
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
                                    disabled={loading}
                                />
                            </div>
                        </div>
                    </label>
                    <div>
                        {data?.productImage.length ? (
                            <div className="flex items-center gap-2">
                                {data.productImage.map((img, index) => (
                                    <div className="relative group" key={index}>
                                        <img
                                            src={img}
                                            alt={img}
                                            width={80}
                                            height={80}
                                            className="bg-slate-100 border cursor-pointer"
                                            onClick={() => {
                                                setOpenFullScreen(true);
                                                setFullScreenImage(img);
                                            }}
                                        />
                                        <div className="absolute bottom-0 right-0 p-1 text-white bg-orange-600 rounded-full hidden group-hover:block" onClick={() => handleDeleteProductImage(index)}>
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

                    <label htmlFor="price" className="mt-3">Price:</label>
                    <input
                        type="number"
                        placeholder="Enter product price"
                        id="price"
                        name="price"
                        value={data.price}
                        onChange={handleOnChange}
                        className="p-2 bg-slate-100 border rounded"
                        min="0"
                        required
                        disabled={loading}
                    />

                    <label htmlFor="sellingPrice" className="mt-3">Selling Price:</label>
                    <input
                        type="number"
                        placeholder="Enter selling price"
                        id="sellingPrice"
                        name="sellingPrice"
                        value={data.sellingPrice}
                        onChange={handleOnChange}
                        className="p-2 bg-slate-100 border rounded"
                        min="0"
                        required
                        disabled={loading}
                    />

                    <label htmlFor="description" className="mt-3">Description:</label>
                    <textarea
                        placeholder="Enter product description"
                        rows={3}
                        className="h-28 bg-slate-100 border resize-none p-1 rounded"
                        onChange={handleOnChange}
                        value={data.description}
                        name="description"
                        disabled={loading}
                    />

                    <button
                        className="px-3 py-2 bg-orange-600 text-white hover:bg-orange-700 flex justify-center items-center gap-2"
                        disabled={loading}
                    >
                        {loading && <span className="loader" />}
                        {loading ? "Uploading..." : "Update Product"}
                    </button>
                </form>
            </div>

            {openFullScreen && (
                <DisplayImage onClose={() => setOpenFullScreen(false)} imageUrl={fullScreenImage} />
            )}
        </div>
    );
};

export default AdminEditProduct;
