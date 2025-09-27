"use client";
import { BASE_URL } from "@/config";
import { useAuth } from "@/contexts/AuthContext";
import { fetchWithAuth } from "@/lib/api";
import { SellerProduct } from "@/lib/types";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Button from "./Button";
import { IoIosAddCircle } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";

export default function MyProducts() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [products, setProducts] = useState<SellerProduct[]>([
    {
      id: "prod-001",
      title: "Wireless Noise-Canceling Headphones",
      description:
        "High-fidelity over-ear headphones with active noise cancellation and 30-hour battery life.",
      imageUrl: "https://example.com/images/headphones.jpg",
      category: "Electronics",
      price: 149.99,
      stock: 25,
    },
    {
      id: "prod-002",
      title: "Handcrafted Ceramic Vase",
      description:
        "Elegant handmade vase perfect for minimalist home decor. Each piece is unique.",
      imageUrl: "https://example.com/images/vase.jpg",
      category: "Home & Living",
      // price and stock intentionally omitted
    },
    {
      id: "prod-003",
      title: "Organic Cotton T-Shirt",
      description:
        "Soft and breathable t-shirt made from 100% organic cotton. Available in multiple sizes.",
      imageUrl: "https://example.com/images/tshirt.jpg",
      category: "Apparel",
      price: 19.99,
      // stock intentionally omitted
    },
  ]);
  const fetchSellerProducts = useCallback(async () => {
    if (!user || user.role !== "Seller") return;
    setIsLoading(true);
    try {
      const response = await fetchWithAuth(
        BASE_URL + "/api/Product/user/" + user.id
      );
      if (response.ok) {
        const data: SellerProduct[] = await response.json();
        console.log(data)
        setProducts(data);
      } else {
        // setError("Failed to fetch products");
      }
    } catch (error) {
      // setError("Error fetching products");
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchSellerProducts();
  }, []);
  return (
    <div className="max-h-screen bg-white px-4 py-6 sm:px-6 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-lg font-bold text-yellow-700">My Products</h1>
        <div className="flex items-center bg-gray-300 rounded-full px-3 py-1 w-full sm:w-56">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none w-full text-sm"
          />
          <span className="text-gray-600">🔍</span>
        </div>
      </div>

      {/* Product List */}
      <div className="space-y-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white border rounded-lg shadow-sm p-4"
          >
            {/* Left section */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Image
                src={product.imageUrl || ""}
                alt={product.title}
                width={100}
                height={100}
                className="rounded-md object-cover w-full sm:w-[100px] sm:h-[100px]"
              />
              <div>
                <h2 className="font-semibold">{product.title}</h2>
                <p className="text-sm text-gray-500 truncate sm:max-w-xs">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Right section */}
            <div className="mt-4 sm:mt-0 sm:ml-4 flex flex-col space-y-2">
              <Button variant="secondary">Create Auction</Button>
              <Button variant="neutral">View Product</Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Product */}
      <div className="mt-8 fixed right-4 bottom-6 flex flex-col items-center space-y-1">
        <Button
          variant="primaryPlaneRound"
          hoverLabel="Add Product"
          width={16}
          height={16}
        >
          <IoMdAdd className="text-4xl" />
        </Button>
      </div>
    </div>
  );
}
