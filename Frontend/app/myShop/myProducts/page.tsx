"use client";
import Sidebar from "@/components/ui/Sidebar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSellerData } from "@/contexts/ShopContext";
import Button from "@/components/ui/Button";
import { IoMdAdd } from "react-icons/io";
import { Search } from "lucide-react";
import { BASE_URL } from "@/config";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import ProductForm from "@/components/auction/ProductForm";
import { BiCloset } from "react-icons/bi";
import { RiCloseCircleLine } from "react-icons/ri";
import AuctionForm from "@/components/auction/AuctionForm";

export default function MyProducts() {
  const { products, refreshAll } = useSellerData();
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isAuctionFormOpen, setIsAuctionFormOpen] = useState<boolean>(false);
  const [newAuction, setNewAuction] = useState<string | null>(null);

  useEffect(() => {
    refreshAll();
  }, []);

  if (products.length < 1) {
    return <h1> no product found</h1>;
  }

  return (
    <div className="relative">
      {isFormOpen && (
        <div className="absolute h-screen w-screen z-100">
          <button
            onClick={() => setIsFormOpen((prev) => !prev)}
            className="text-red-500 absolute top-5 right-5 cursor-pointer text-3xl z-100"
          >
            {" "}
            <RiCloseCircleLine />{" "}
          </button>
          <ProductForm />
        </div>
      )}
      {newAuction && (
        <>
          <button
            onClick={() => setNewAuction(null)}
            className="text-red-500 absolute top-5 right-5 cursor-pointer text-3xl z-101"
          >
            {" "}
            <RiCloseCircleLine />{" "}
          </button>
          <AuctionForm productId={newAuction} />
        </>
      )}

      <div className="hidden md:fixed md:block left-0 top-0 h-full z-10 shadow-2xl">
        <Sidebar />
      </div>
      <div className=" min-h-screen bg-white px-4 py-6 sm:px-6 relative">
        {/* Header */}
        <div className="pl-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <h1 className="text-lg font-bold text-yellow-700">My Products</h1>
          <div className="flex items-center bg-gray-300 rounded-full px-3 py-1 w-full sm:w-56">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none w-full text-sm"
            />
            <span className="text-gray-600">
              <Search />
            </span>
          </div>
        </div>
        <div className="space-y-6 pl-16">
          {products.map((product) => {
            const openForm = () => {
              setNewAuction(product.id);
            };
            return (
              <div
                key={product.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white border rounded-lg shadow-sm p-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <ImageWithFallback
                    src={BASE_URL + product.imageUrl || ""}
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
                <div className="mt-4 sm:mt-0 sm:ml-4 flex flex-col space-y-2">
                  <Button variant="secondary" onClick={openForm}>
                    Create Auction
                  </Button>
                  <Button variant="neutral">View Product</Button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-8 fixed right-4 bottom-6 flex flex-col items-center space-y-1">
          <Button
            variant="primaryPlaneRound"
            hoverLabel="Add Product"
            width={16}
            height={16}
            onClick={() => setIsFormOpen((prev) => !prev)}
          >
            <IoMdAdd className="text-4xl" />
          </Button>
        </div>
      </div>
    </div>
  );
}
