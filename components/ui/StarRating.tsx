import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";

import { type Review } from "@/types";

import parseData from "@/utils/parseData";

import { StarIcon } from "./Icons";

type StarRatingProps = {
  id: number;
  rating: number | null;
  setRating: Dispatch<SetStateAction<number | null>>;
};

export default function StarRating({ id, rating, setRating }: StarRatingProps) {
  const [hover, setHover] = useState<number | null>(null);
  const [storedReview, setStoredReview] = useState(
    localStorage.getItem(id.toString()),
  );

  const groupedStars = [
    [0.5, 1],
    [1.5, 2],
    [2.5, 3],
    [3.5, 4],
    [4.5, 5],
  ];

  // const storedReview = localStorage.getItem(id.toString());

  useEffect(() => {
    const parsedFilm: Review | null = parseData(storedReview);
    if (parsedFilm) {
      setRating(parsedFilm.rating);
    }
  }, [storedReview, setRating]);

  function handleRating(ratingValue: number | null) {
    if (rating === ratingValue) {
      setRating(null);
      setHover(null);
      localStorage.removeItem(id.toString());
      toast.info("Rating removed");
    } else {
      setRating(ratingValue);
      toast.success("Rating added");
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-center">
        {groupedStars.map((group, index) => {
          return (
            <span
              key={index}
              className="relative transition-transform duration-100 ease-out hover:scale-[1.15] active:scale-105"
            >
              {group.map((star) => {
                const ratingValue = star;

                return (
                  <label
                    key={ratingValue}
                    className={`${ratingValue % 1 !== 0 ? "absolute w-[50%] overflow-hidden" : ""}`}
                  >
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => handleRating(ratingValue)}
                      className="hidden"
                    />
                    <StarIcon
                      fill={
                        ratingValue <= (hover || rating!)
                          ? "#FFD43B"
                          : "#434343"
                      }
                      classes="h-8 w-10 md:h-7 md:w-9 lg:h-8 lg:w-10"
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(null)}
                    />
                  </label>
                );
              })}
            </span>
          );
        })}
      </div>
    </div>
  );
}
