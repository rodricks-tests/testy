"use client";

import { useState, useEffect } from "react";
import { fetchWithAuth } from "@/lib/api";
import { BASE_URL } from "@/config";
import Image from "next/image";
import { describe } from "node:test";
import { List } from "lucide-react";
import toast from "react-hot-toast";

export default function ProductForm() {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    sellerId: "",
    tags: [] as string[],
  });

  // Handle file preview
  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setFilePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl); // Cleanup on unmount or file change
    } else {
      setFilePreview(null);
    }
  }, [file]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "tags") {
      const tagsArray: string[] = value.split(",").map((tag) => tag.trim());
      setFormData({
        ...formData,
        tags: tagsArray,
      });
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFormClear = () => {
    setFormData({
      title: "",
      description: "",
      sellerId: "",
      tags: [],
    });
    setFile(null);
    setFilePreview(null);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    if (formData.tags.length < 2) {
      setErrors({ tags: "Please enter at least two tags." });
      setIsSubmitting(false);
      return;
    }

    if (formData.title.trim().length < 8) {
      setErrors({ title: "Title must be at least 8 characters long." });
      setIsSubmitting(false);
      return;
    }

    if (formData.description.trim().length < 30) {
      setErrors({
        description:
          "Description must be detailed enough to review the product (at least 30 characters).",
      });
      setIsSubmitting(false);
      return;
    }
    if (!file) {
      setErrors({ imageUrl: "Please upload an image." });
      setIsSubmitting(false);
      return;
    }

    try {
      const newFormData = new FormData();
      newFormData.append("title", formData.title);
      newFormData.append("description", formData.description);
      formData.tags.forEach((tag) => newFormData.append("Tags", tag));

      if (file) {
        newFormData.append("file", file);
      }
      const response = await fetchWithAuth(BASE_URL + "/api/product", {
        method: "POST",
        body: newFormData,
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }
      if(response.ok){
        toast.success("Product created successfully, 🔃 refresh to update Dashboard")
      }

      const data = await response.json();
      console.log("Product created:", data);

      setFilePreview(null);
    } catch (err: any) {
      setErrors({ submit: err.message || "An error occurred product" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center min-h-screen items-center  bg-neutral-900/80 p-4 ">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-800 p-8 rounded-xl shadow-lg w-full max-w-lg border border-neutral-700 relative"
      >
        <button
          type="reset"
          onClick={handleFormClear}
          className="right-4 top-4 absolute bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors duration-300"
        >
          Reset
        </button>
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Product Registration
        </h1>

        <div className="space-y-4">
          <div className="flex flex-col">
            <label
              htmlFor="title"
              className="text-sm font-medium text-neutral-400 mb-1 mt-5"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="bg-neutral-900 text-white border border-neutral-700 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-neutral-500"
              required
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-2">{errors.title}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="text-sm font-medium text-neutral-400 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="bg-neutral-900 text-white border border-neutral-700 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-neutral-500"
              required
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-2 text-wrap w-80">
                {errors.description}
              </p>
            )}
          </div>

          <div className="mt-4 w-full flex justify-center">
            {filePreview ? (
              <Image
                src={filePreview}
                alt="Selected file preview"
                width={100}
                height={100}
                className="object-cover rounded-lg"
              />
            ) : (
              <Image
                src="/default-product.png"
                alt="Default profile"
                width={100}
                height={100}
                className="object-cover rounded-lg"
              />
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="imageUrl"
              className="text-sm font-medium text-neutral-400 mb-1"
            >
              Image URL
            </label>
            <input
              type="file"
              id="imageUrl"
              name="imageUrl"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="bg-neutral-900 text-white border border-neutral-700 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-neutral-500"
              required
            />
            {errors.imageUrl && (
              <p className="text-red-500 text-sm mt-2">{errors.imageUrl}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="tags"
              className="text-sm font-medium text-neutral-400 mb-1"
            >
              Tags (comma-separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="bg-neutral-900 text-white border border-neutral-700 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-neutral-500"
              placeholder="e.g., electronics, gadgets, smartphone"
              required
            />
            {errors.tags && (
              <p className="text-red-500 text-sm mt-2">{errors.tags}</p>
            )}
          </div>
        </div>
        {errors.submit && (
          <p className="text-red-500 text-sm mt-2">{errors.submit}</p>
        )}

        <button
          type="submit"
          className="mt-6 w-full bg-neutral-700 text-white font-bold py-3 px-4 rounded-md hover:bg-neutral-600 transition-colors duration-300"
        >
          {isSubmitting ? "Uploading..." : "Register Product"}
        </button>
      </form>
    </div>
  );
}
