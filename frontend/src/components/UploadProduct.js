import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

const UploadProduct = ({ onClose }) => {
  const [data, setData] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    image: "",
    description: "",
    selling: "",
  });

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  return (
    <div className="fixed w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-slate-100 bg-opacity-40">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%]">
        <div className="flex justify-between items-center pb-4">
          <h2 className="text-lg font-medium">Upload Products</h2>
          <button className="text-2xl hover:text-red-600" onClick={onClose}>
            <IoMdClose></IoMdClose>
          </button>
        </div>

        <form className="grid p-4 gap-2">
          <label htmlFor="name">Product Name: </label>
          <input
            type="text"
            className="p-2 bg-slate-100 border rounded"
            id="name"
            placeholder="Enter product name"
            value={data.name}
            onChange={handleOnChange}
          ></input>

          <label htmlFor="brand" className="mt-3">
            Brand Name:
          </label>
          <input
            type="text"
            className="p-2 bg-slate-100 border rounded"
            id="brand"
            placeholder="Enter brand name"
            value={data.brand}
            onChange={handleOnChange}
          ></input>
        </form>
      </div>
    </div>
  );
};

export default UploadProduct;
