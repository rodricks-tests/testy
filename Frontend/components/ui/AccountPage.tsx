import React from "react";
import { Pencil } from "lucide-react";
import { User, UserData } from "@/lib/types";
import { BASE_URL } from "@/config";
import ImageWithFallback from "../ui/ImageWithFallback";
import Image from "next/image";

type AccountPageProps = {
  user?: User | null;
};
export default function AccountPage({ user }: AccountPageProps) {
  if (!user) return <p>no user found</p>;
  const { fullName, email, phone, role } = user;

  return (
    <div className="max-w-4xl w-full mx-auto bg-gray-300 text-white p-4 sm:p-6 rounded-2xl shadow-xl">
      <div className="w-full px-4 sm:px-8 py-6 sm:py-10">
        {/* Profile Card */}
        <div className="relative max-w-3xl bg-white border border-gray-300 shadow-md rounded-lg p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <ImageWithFallback
              src={BASE_URL + user.imageUrl}
              width={60}
              height={60}
              alt="profile"
              className="w-20 h-20 rounded-full object-cover border border-gray-300"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-900">{fullName}</h2>
              <p className="text-sm text-gray-500">{email}</p>
            </div>
          </div>
          {/* Edit Icon */}
          <Pencil
            size={20}
            className="absolute right-8 top-8 text-gray-500 cursor-pointer"
          />
        </div>

        {/* Personal Information */}
        <div className="relative max-w-3xl bg-white border border-gray-300 shadow-md rounded-lg p-6 sm:p-8 mb-8">
          <Pencil
            size={20}
            className="absolute right-8 top-8 text-gray-500 cursor-pointer"
          />
          <h3 className="text-xl font-medium text-amber-500 mb-6">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400">First Name</p>
              <p className="text-gray-700 font-medium mt-1">{fullName}</p>
            </div>
            <div>
              <p className="text-gray-400">Last Name</p>
              <p className="text-gray-700 font-medium mt-1">{email}</p>
            </div>
            <div>
              <p className="text-gray-400">Email Address</p>
              <p className="text-gray-700 font-medium mt-1">{email}</p>
            </div>
            <div>
              <p className="text-gray-400">Phone</p>
              <p className="text-gray-700 font-medium mt-1">{phone}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-gray-400">Account Type</p>
              <p className="text-gray-700 font-medium mt-1">{role}</p>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="relative max-w-3xl bg-white border border-gray-300 shadow-md rounded-lg p-6 sm:p-8">
          <Pencil
            size={20}
            className="absolute right-8 top-8 text-gray-500 cursor-pointer"
          />
          <h3 className="text-xl font-medium text-amber-500 mb-6">Address</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400">Country</p>
              <p className="text-gray-700 font-medium mt-1">Sri Lanka</p>
            </div>
            <div>
              <p className="text-gray-400">City / State</p>
              <p className="text-gray-700 font-medium mt-1">Colombo</p>
            </div>
            <div>
              <p className="text-gray-400">Postal Code</p>
              <p className="text-gray-700 font-medium mt-1">12345</p>
            </div>
            <div>
              <p className="text-gray-400">TAX ID</p>
              <p className="text-gray-700 font-medium mt-1">12345678</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
