"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AuctionCardProps } from "@/lib/types";
import Image from "next/image";
import ImageWithFallback from "./ImageWithFallback";
import {BASE_URL} from '@/config';

const inputClass =
  "w-full px-3 py-2 bg-white rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-yellow-500";

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className={inputClass + " " + (props.className || "")} />
);

export default function BidRegistrationForm({
  auction,
}: {
  auction: AuctionCardProps;
}) {
  const { user } = useAuth();
  


  if (!user) {
    return <p>Please log in to register for bidding.</p>;
  }

  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [sendAlerts, setSendAlerts] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fullName: user?.fullName,
    country: "",
    address: "",
    city: "",
    province: "",
    zipCode: "",
    phone: user?.phone || "",
  });
    const {
    id,
    productId,
    productTitle,
    imageUrl,
    startTime,
    endTime,
    minimumBid,
    status,
    maxBid,
    tags,
  } = auction;
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
    console.log(formData);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: Record<string, string> = {};

    // Basic field validations
    if (!formData.fullName || formData.fullName.trim().length < 3) {
      errors.fullName =
        "Full name is required and must be at least 3 characters.";
    }

    if (!formData.country) {
      errors.country = "Country is required.";
    }

    if (!formData.address || formData.address.trim().length < 5) {
      errors.address = "Address must be at least 5 characters.";
    }

    if (!formData.city) {
      errors.city = "City is required.";
    }

    if (!formData.province) {
      errors.province = "Province is required.";
    }

    if (!formData.zipCode || !/^\d{4,10}$/.test(formData.zipCode)) {
      errors.zipCode = "Zip code must be a valid number (4–10 digits).";
    }

    if (!formData.phone || !/^\+?\d{7,15}$/.test(formData.phone)) {
      errors.phone = "Phone number must be valid.";
    }
    if (Object.keys(errors).length > 0) {
      setError(errors);
    }

    // If errors exist, show them
    if (Object.keys(errors).length > 0) {
      console.error("Validation Errors:", errors);
      alert("Please fix the errors before submitting.");
      return;
    }

    // Submit logic
    console.log("Form Data Submitted:", formData);
    alert("Form submitted! Check the console for the data object.");
  };

  if (!user) {
    return <p>Please log in to register for bidding.</p>;
  }
  return (
    <div className="max-w-2xl w-full mx-auto bg-gray-600 text-white p-6 rounded-2xl shadow-x1">
      {/* Auction Info */}
      <div className="bg-gray-700 border-b border-yellow-500 p-4 rounded-md text-center mb-6 ">
        <div className="flex justify-center mb-4">
        {!isLoading && (<ImageWithFallback
                  src={ BASE_URL+imageUrl ||"/default-card-image.png"}
                  alt="Picture of the product"
                  width={200}
                  height={200}
                  fallback={
                    <div className="w-80 h-60 bg-gray-200/10 flex items-center justify-center animate-pulse">
                      <span className="text-gray-500">Image not available</span>
                    </div>
                  }
                />)}</div>
        <h2 className="text-2xl font-semibold text-yellow-500">
          {productTitle}
        </h2>
        <p className="text-sm text-gray-300">Auction End Time: {new Date(endTime).toLocaleTimeString()}</p>
        <p className="text-sm text-gray-300">{"description"}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2 text-yellow-500">
          Account Information
        </h3>
        <div className="space-y-3 mb-4">
          <Input
            type="number"
            placeholder="Your Bid Value"
            name="email"
            value={user.email}
            readOnly
          />
        </div>
      </div>

      {/* Shipping Address */}
      <h3 className="text-lg font-semibold mb-2 text-yellow-500">
        Shipping Address
      </h3>
      <div className="space-y-3">
        <div className="grid grid-cols-1 gap-3">
          <Input
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          {error.fullName && (
            <p className="text-red-500 text-xs">{error.fullName}</p>
          )}
        </div>
        <select
          className={inputClass}
          name="country"
          value={formData.country}
          onChange={handleChange}
        >
          <option>Select Country</option>
          <option>Sri Lanka</option>
          <option>Japan</option>
          <option>USA</option>
        </select>
        {error.country && (
          <p className="text-red-500 text-xs">{error.country}</p>
        )}
        <Input
          type="text"
          placeholder="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        <div className="grid grid-cols-2 gap-3">
          <Input
            type="text"
            placeholder="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          <Input
            type="text"
            placeholder="Province"
            name="province"
            value={formData.province}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input
            type="text"
            placeholder="Zip Code"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
          />
          <Input
            type="text"
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        {error.address && (
          <p className="text-red-500 text-xs">{error.address}</p>
        )}
        {error.city && <p className="text-red-500 text-xs">{error.city}</p>}
        {error.province && (
          <p className="text-red-500 text-xs">{error.province}</p>
        )}
        {error.zipCode && (
          <p className="text-red-500 text-xs">{error.zipCode}</p>
        )}
        {error.phone && <p className="text-red-500 text-xs">{error.phone}</p>}
      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-col items-center gap-2">
        <button
          className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2 rounded-md w-full font-semibold"
          onClick={handleSubmit}
        >
          Register To Bid
        </button>
        <button className="text-sm text-gray-300 hover:underline">
          Cancel
        </button>
        <p className="text-xs text-gray-400 text-center mt-2">
          By clicking "Register to Bid" I agree to this auction’s Terms and
          Conditions.
        </p>
      </div>
    </div>
  );
}
