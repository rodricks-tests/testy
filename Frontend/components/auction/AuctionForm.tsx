"use client";

import { BASE_URL } from "@/config";
import { fetchWithAuth } from "@/lib/api";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AuctionForm({ productId }: { productId?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const category = [
    "Art",
    "Antiques",
    "Jewelry",
    "Collectibles",
    "Furniture",
    "BooksAndManuscripts",
    "Fashion",
    "Automobiles",
    "WineAndSpirits",
    "Photography",
    "Other",
  ];
  const [formData, setFormData] = useState({
    productId: productId || "",
    startTime: "",
    endTime: "",
    minimumBid: "",
    category: "0",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    const errors: Record<string, string> = {};

    // ✅ Validate productId (basic UUID v4 check)
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(formData.productId)) {
      errors.productId = "Invalid product ID.";
    }

    // ✅ Validate and convert times
    const start = new Date(formData.startTime);
    const end = new Date(formData.endTime);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      errors.startTime = "Start and end times must be valid.";
    } else if (start >= end) {
      errors.startTime = "Start time must be before end time.";
      errors.endTime = "End time must be after start time.";
    }

    // ✅ Validate minimumBid
    const bid = parseFloat(formData.minimumBid);
    if (isNaN(bid) || bid < 0) {
      errors.minimumBid = "Minimum bid must be a non-negative number.";
    }

    // ✅ If errors exist, show them
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setIsSubmitting(false);
      return;
    }

    // ✅ Prepare payload
    const payload = {
      productId: formData.productId,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      minimumBid: bid,
      category: parseInt(formData.category),
    };

    // ✅ Submit to backend
    submitAuction(payload);
  };

  const submitAuction = async (data: {
    productId: string;
    startTime: string;
    endTime: string;
    minimumBid: number;
    category: number;
  }) => {
    const formData = new FormData();
    formData.append("productId", data.productId);
    formData.append("startTime", data.startTime);
    formData.append("endTime", data.endTime);
    formData.append("minimumBid", data.minimumBid.toString());
    formData.append("category", data.category.toString());

    const auctionPromise = fetchWithAuth(BASE_URL + "/api/Shop", {
      method: "POST",
      body: formData,
    });

    try {
      const response = await toast.promise(auctionPromise, {
        loading: "Submitting auction...",
        success: "Auction created! 🔃 Refresh to update dashboard",
        error: "Failed to create auction",
      });

      const result = await response.json();
      console.log("Auction created successfully:", result);

      // ✅ Reset form
      setFormData({
        productId: "",
        startTime: "",
        endTime: "",
        minimumBid: "",
        category: "0",
      });
      setErrors({});
    } catch (error) {
      console.error("❌ Auction submission error:", error);
      toast.error("Something went wrong while submitting auction");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex absolute w-screen z-100 justify-center items-center min-h-screen bg-neutral-900/80 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-800 p-8 rounded-xl shadow-lg w-full max-w-lg border border-neutral-700"
      >
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Create New Auction
        </h1>

        <div className="space-y-4">
          <div className="flex flex-col">
            <label
              htmlFor="productId"
              className="text-sm font-medium text-neutral-400 mb-1"
            >
              Product ID
            </label>
            <input
              type="text"
              id="productId"
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              className="bg-neutral-900 text-white border border-neutral-700 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-neutral-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="minimumBid"
              className="text-sm font-medium text-neutral-400 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="bg-neutral-900 text-white border border-neutral-700 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-neutral-500"
            >
              {category.map((op, index) => {
                return <option value={index}>{op}</option>;
              })}
            </select>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="startTime"
              className="text-sm font-medium text-neutral-400 mb-1"
            >
              Start Time
            </label>
            <input
              type="datetime-local"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="bg-neutral-500 text-white border border-neutral-700 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="endTime"
              className="text-sm font-medium text-neutral-400 mb-1"
            >
              End Time
            </label>
            <input
              type="datetime-local"
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="bg-neutral-500 text-white border border-neutral-700 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-neutral-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="minimumBid"
              className="text-sm font-medium text-neutral-400 mb-1"
            >
              Minimum Bid
            </label>
            <input
              type="number"
              id="minimumBid"
              name="minimumBid"
              value={formData.minimumBid}
              onChange={handleChange}
              className="bg-neutral-900 text-white border border-neutral-700 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-neutral-500"
              step="0.01"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-neutral-700 text-white font-bold py-3 px-4 rounded-md hover:bg-neutral-600 transition-colors duration-300"
        >
          Create Auction
        </button>
      </form>
    </div>
  );
}
