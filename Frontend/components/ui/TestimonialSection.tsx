"use client";
import { AppReview } from "@/lib/types";
import React, { useState, useEffect } from "react";
import { BiSkipPrevious } from "react-icons/bi";
import { GrCaretPrevious, GrCaretNext, GrNext, GrPrevious } from "react-icons/gr";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

type props = {
  testimonials : AppReview[];
}

function TestimonialSection ({testimonials}:props) {

  const itemsPerPage: number = 3;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [editableRatings, setEditableRatings] = useState<
    Record<number, number>
  >({});
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const autoScrollInterval: number = 5000; // 5 seconds per page

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) =>
          (prevIndex + 1) % Math.ceil(testimonials.length / itemsPerPage)
      );
    }, autoScrollInterval);
    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  const handlePrev = (): void => {
    setIsPaused(true); // Pause auto-scroll on manual interaction
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + Math.ceil(testimonials.length / itemsPerPage)) %
        Math.ceil(testimonials.length / itemsPerPage)
    );
    setTimeout(() => setIsPaused(false), 1000); // Resume after 1 second
  };

  const handleNext = (): void => {
    setIsPaused(true); // Pause auto-scroll on manual interaction
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex + 1) % Math.ceil(testimonials.length / itemsPerPage)
    );
    setTimeout(() => setIsPaused(false), 1000); // Resume after 1 second
  };

  const handleDotClick = (index: number): void => {
    setIsPaused(true); // Pause auto-scroll on manual interaction
    setCurrentIndex(index);
    setTimeout(() => setIsPaused(false), 1000); // Resume after 1 second
  };

  const handleRatingChange = (index: number, newRating: number): void => {
    setEditableRatings((prev) => ({
      ...prev,
      [index]: newRating,
    }));
  };

  const getRatingStars = (rating: number, index: number): React.ReactNode => {
    const updatedRating =
      editableRatings[index] !== undefined ? editableRatings[index] : rating;
    const fullStars = Math.floor(updatedRating);
    const halfStar = updatedRating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <div className="flex gap-1 ">
        {Array(fullStars)
          .fill("★")
          .map((star, i) => (
            <span
              key={`full-${i}`}
              className="text-yellow-400 text-lg cursor-pointer transition-transform hover:scale-125"
              onClick={() => handleRatingChange(index, i + 1)}
              role="button"
              aria-label={`Rate ${i + 1} stars`}
            >
              {star}
            </span>
          ))}
        {halfStar === 1 && (
          <span
            key="half"
            className="text-yellow-400 text-lg cursor-pointer transition-transform hover:scale-125"
            onClick={() => handleRatingChange(index, fullStars + 0.5)}
            role="button"
            aria-label={`Rate ${fullStars + 0.5} stars`}
          >
            ✯
          </span>
        )}
        {Array(emptyStars)
          .fill("☆")
          .map((star, i) => (
            <span
              key={`empty-${i}`}
              className="text-gray-300 text-lg cursor-pointer transition-transform hover:scale-125"
              onClick={() =>
                handleRatingChange(index, fullStars + halfStar + i + 1)
              }
              role="button"
              aria-label={`Rate ${fullStars + halfStar + i + 1} stars`}
            >
              {star}
            </span>
          ))}
      </div>
    );
  };

  const totalPages: number = Math.ceil(testimonials.length / itemsPerPage);

  return (
    <section
      className="bg-gradient-to-b from-yellow-50 to-yellow-100 py-16 px-4 sm:px-6 lg:px-8 w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-live="polite"
    >
      <div className="max-w-7xl mx-auto text-center relative">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4 sm:text-5xl">
          What Our Clients Say
        </h2>
        <p className="text-lg text-gray-700 mb-8 sm:text-xl">
          Hear Directly from Our Satisfied Partners
        </p>
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${
                  (currentIndex * 100) / itemsPerPage
                }%)`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="p-4 w-full sm:w-1/2 lg:w-1/3 flex-shrink-0"
                >
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col justify-between">
                    <p className="text-gray-600 italic text-sm sm:text-base mb-4 h-24 overflow-hidden break-words">
                      &quot;{testimonial.comment}&quot;
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-4">
                        <div className="text-left">
                          <p className="font-semibold text-gray-900 text-sm sm:text-base">
                            {testimonial.fullName}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {getRatingStars(testimonial.rating, index)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center space-y-4">
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    currentIndex === index ? "bg-blue-600" : "bg-gray-300"
                  } hover:bg-blue-500 transition-colors duration-300`}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Go to testimonial page ${index + 1}`}
                />
              ))}
            </div>
            <div className="flex justify-between space-x-4 absolute items-center  h-60 top-0 w-full">
              <button
                onClick={handlePrev}
                className=" text-black cursor-pointer hover:text-gray-500 p-3 rounded-full transition-colors duration-300 focus:outline-none"
                aria-label="Previous testimonials"
              >
                <GrPrevious className="w-5 h-5"/>

              </button>
              <button
                onClick={handleNext}
                className=" text-black cursor-pointer hover:text-gray-500 p-3 rounded-full transition-colors duration-300 focus:outline-none "
                aria-label="Next testimonials"
              >
                <GrNext className="w-5 h-5"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
