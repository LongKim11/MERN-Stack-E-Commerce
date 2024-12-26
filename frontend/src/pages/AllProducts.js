import React, { useState } from "react";
import UploadProduct from "../components/UploadProduct";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h1 className="font-bold text-lg">All Products</h1>
        <button
          className="border py-1 px-3 rounded-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all"
          onClick={() => setOpenUploadProduct((prev) => !prev)}
        >
          Upload Product
        </button>
      </div>

      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct((prev) => !prev)} />
      )}
    </div>
  );
};

export default AllProducts;
