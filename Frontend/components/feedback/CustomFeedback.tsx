// src/app/components/CustomFeedback.tsx
"use client";
import { BASE_URL } from "@/config";
import { fetchWithAuth } from "@/lib/api";
import { useState } from "react";
import toast from "react-hot-toast";

interface Feedback {
  comment: string;
  rating: number;
}

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-gray-700  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors";

const CustomFeedback: React.FC = () => {
  const [feedback, setFeedback] = useState<Feedback>({
    comment: "",
    rating: 0,
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleRatingChange = (newRating: number) => {
    setFeedback((prev) => ({ ...prev, rating: newRating }));
  };

  const handleSubmit = () => {
    if (feedback.comment.trim() === "" || feedback.rating === 0) {
      toast("Please provide a comment and a rating.");
      return;
    }
    onSubmit();
    setSubmitted(true);
    setFeedback({ comment: "", rating: 0 });
    setTimeout(() => setSubmitted(false), 3000);
  };
const onSubmit = async () => {
  const reviewPromise = fetchWithAuth(`${BASE_URL}/api/AppReview`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(feedback),
  });

  try {
    const res = await toast.promise(reviewPromise, {
      loading: "Submitting your review...",
      success: "Thanks for your feedback!",
      error: "Something went wrong while submitting",
    });

    // Optional: handle response if needed
    const result = await res.json();
    console.log("Review submitted:", result);
  } catch (err) {
    console.error("❌ Review submission error:", err);
  }
};

  const getRatingStars = (rating: number) => {
    const stars = [1, 2, 3, 4, 5];
    return (
      <div className="flex gap-1">
        {stars.map((star) => (
          <span
            key={`star-${star}`}
            className={`text-2xl cursor-pointer transition-transform hover:scale-125 ${
              star <= rating ? "text-yellow-400" : "text-black"
            }`}
            onClick={() => handleRatingChange(star)}
            role="button"
            aria-label={`Rate ${star} stars`}
          >
            {star <= rating ? "★" : "☆"}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-md w-full p-8 bg-gray-100 text-black rounded-xl shadow-2xl space-y-6 transform transition-all duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">
          Share Your Feedback
        </h2>
        <p className="">
          We'd love to hear your thoughts on our auction process.
        </p>
      </div>

      <div className="space-y-4">
        <textarea
          className={inputClass}
          rows={4}
          placeholder="Share your feedback about the auction process..."
          value={feedback.comment}
          onChange={(e) =>
            setFeedback((prev) => ({ ...prev, comment: e.target.value }))
          }
        />

        <div className="flex items-center justify-between">
          <span >Rate your experience:</span>
          {getRatingStars(feedback.rating)}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-gray-100 cursor-pointer text-black font-semibold px-6 py-3 rounded-xl border-2 border-yellow-500 transition-colors duration-200"
      >
        Submit Feedback
      </button>

      {submitted && (
        <p className="text-emerald-400">Thank you for your feedback!</p>
      )}
    </div>
  );
};

export default CustomFeedback;
