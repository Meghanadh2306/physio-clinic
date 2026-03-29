import { useEffect, useState } from "react";
import axios from "axios";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:5000/api/reviews")
      .then(res => {
        setReviews(res.data.reviews || []);
        setRating(res.data.rating);
        setTotal(res.data.user_ratings_total);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">

        {/* Heading */}
        <span className="text-green-600 text-sm font-semibold uppercase">
          Reviews
        </span>
        <h2 className="text-4xl font-bold mt-2">
          What Our Patients Say
        </h2>
        <p className="text-gray-500 mt-2">
          Real experiences from real patients
        </p>

        {/* Google Rating */}
        <div className="mt-6 inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
            alt="google"
            className="h-5"
          />
          <span className="text-yellow-500">★★★★★</span>
          <span className="font-semibold">{rating}</span>
          <span className="text-gray-500">{total}+ Reviews</span>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {reviews.slice(0, 3).map((review, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">

              {/* Stars */}
              <div className="text-yellow-400 mb-3">
                {"★".repeat(review.rating)}
              </div>

              {/* Review Text */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {review.text}
              </p>

              {/* User */}
              <div className="flex items-center gap-3 mt-6">
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
        <div className="mt-12 bg-white p-6 rounded-2xl shadow inline-block">
          <p className="text-gray-600 mb-4">
            Had a great experience at our clinic?
          </p>
          <a
            href="https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition"
          >
            Leave a Review on Google
          </a>
        </div>

      </div>
    </section>
  );
};

export default Reviews;