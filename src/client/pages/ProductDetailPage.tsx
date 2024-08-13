import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CollectionProps, ProductProps } from "../types/types";
import axios from "axios";

const ProductDetailPage: React.FC = () => {
  const { key } = useParams();
  const [data, setData] = useState<CollectionProps | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/collections/${key}`);
      setData(response.data);
    };
    fetchData();
  }, [key]);

  const onAddProduct = () => {
    const existingCartItems: ProductProps[] = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart") || "{}")
      : [];
    localStorage.setItem(
      "cart",
      JSON.stringify([
        ...existingCartItems,
        {
          image: data!.products[0].image,
          title: data!.products[0].title,
          price: data!.products[0].price,
          description: data!.description,
          quantity: quantity,
        },
      ])
    );
  };

  return (
    <>
      {!data ? (
        <h1 className="text-center text-gray-500">Loading product details...</h1>
      ) : (
        <div>
          <div className="flex flex-col md:flex-row w-full justify-between p-4 space-y-4 md:space-y-0 md:space-x-6">
            <img src={data.products[0].image} className="w-full md:w-1/2 h-auto object-cover rounded-lg shadow-md" />
            <div className="flex flex-col w-full md:w-1/2 justify-between space-y-4">
            <p className="text-lg font-semibold">Kermanig Bakery</p>
              <p className="text-2xl font-bold">{data.products[0].title}</p>
              <p className="text-yellow-500">Stars: {data.products[0].star}</p>
              <p className="text-gray-600">{data.description}</p>
              <p className="text-xl font-bold">${data.products[0].price} USD</p>
              <div className="flex flex-row items-center space-x-4">
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-20 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={onAddProduct}
                  className="bg-blue-500 text-white p-3 rounded-md shadow-md hover:bg-blue-600 transition duration-200"  
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full items-center justify-between px-5">
            {
              data.products[0].images.map((product) => {
                return (
                  <img src={product} className="cursor-pointer w-[500px] h-[500px]" />
                );
              })
            }
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailPage;