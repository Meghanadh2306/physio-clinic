import { useEffect, useState } from "react";
import axios from "axios";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios.get("https://physio-backend-swd8.onrender.com/api/reviews")
      .then(res => {
        setReviews(res.data.reviews || []);
        setRating(res.data.rating);
        setTotal(res.data.user_ratings_total);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <section className="section-container bg-slate-50">
      <div className="max-w-6xl mx-auto text-center">

        {/* Heading */}
        <span className="text-green-600 text-sm font-semibold uppercase">
          Reviews
        </span>
        <h2 className="section-title mt-2 mb-4">
          Patient Reviews & Testimonials
        </h2>
        <p className="text-gray-500 mt-2">
          Authentic patient experiences shared on Google Reviews
        </p>

        {/* Google Rating */}
        <div className="mt-6 inline-flex items-center gap-3 bg-white px-8 py-3.5 rounded-full shadow-md border border-gray-100">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
            alt="google"
            className="h-5"
            loading="lazy"
          />
          <span className="text-yellow-500">★★★★★</span>
          <span className="font-semibold">{rating}</span>
          <span className="text-gray-500">{total}+ Reviews</span>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {reviews.map((review, index) => (
            <div key={index} className="medical-card text-left flex flex-col h-full">

              {/* Stars */}
              <div className="text-yellow-400 mb-3">
                {"★".repeat(review.rating)}
              </div>

              {/* Review Text */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {review.text}
              </p>

              {/* User */}
              <div className="flex items-center gap-3 mt-auto pt-6 border-t border-gray-100">
                <div className="w-10 h-10 bg-green-100 text-green-600 flex items-center justify-center rounded-full font-bold">
                  {review.author_name[0]}
                </div>
                <div>
                  <p className="font-semibold text-sm">
                    {review.author_name}
                  </p>
                  <p className="text-gray-400 text-xs">
                    Google Review
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 medical-card inline-block max-w-md w-full">
          <p className="text-gray-600 mb-4">
            Ready to experience our care?
          </p>
          <a
            href="/appointment"
            className="btn-primary block w-full"
          >
            📅 Book Your Appointment
          </a>
        </div>

      </div>
    </section>
  );
};

export default Reviews;