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
          What Our Patients Say
        </h2>
        <p className="text-gray-500 mt-2">
          Real experiences from real patients
        </p>

        {/* Google Rating */}
        <div className="mt-6 inline-flex items-center gap-3 bg-white px-8 py-3.5 rounded-full shadow-md border border-gray-100 cursor-pointer hover:shadow-lg transition-shadow">
          <a
            href="https://www.google.com/search?rlz=1C1PNFE_enIN1097IN1097&sca_esv=26efe42c3f425b34&sxsrf=ANbL-n47otTL-Y3JTLWrt4O84HWIcD2YAA:1775653914577&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOQDjgshTvPVBwVeHfL-SNsevSTIGLWamMWQsK1wmI_w6qVa8nZBuGwdSzzDyC2kNAYxdCnlIuHLt_mVvuUrbzhq_7YaumP1VFEQsAHgGmIBTFD1GKw%3D%3D&q=Sri+Physiotherapy+Clinic+Reviews&sa=X&ved=2ahUKEwiY48mmqt6TAxUDka8BHbDYHbcQ0bkNegQIJBAF&biw=1536&bih=695&dpr=1.25"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
              alt="google"
              className="h-5"
              loading="lazy"
            />
            <span className="text-yellow-500">★★★★★</span>
            <span className="font-semibold">{rating}</span>
            <span className="text-gray-500">{total}+ Reviews</span>
          </a>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {reviews.slice(0, 3).map((review, index) => (
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
        <div className="mt-16 space-y-6">
          {/* View All Reviews */}
          <div className="medical-card inline-block max-w-md w-full">
            <p className="text-gray-600 mb-4">
              Want to see all our reviews?
            </p>
            <a
              href="https://www.google.com/search?rlz=1C1PNFE_enIN1097IN1097&sca_esv=26efe42c3f425b34&sxsrf=ANbL-n47otTL-Y3JTLWrt4O84HWIcD2YAA:1775653914577&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOQDjgshTvPVBwVeHfL-SNsevSTIGLWamMWQsK1wmI_w6qVa8nZBuGwdSzzDyC2kNAYxdCnlIuHLt_mVvuUrbzhq_7YaumP1VFEQsAHgGmIBTFD1GKw%3D%3D&q=Sri+Physiotherapy+Clinic+Reviews&sa=X&ved=2ahUKEwiY48mmqt6TAxUDka8BHbDYHbcQ0bkNegQIJBAF&biw=1536&bih=695&dpr=1.25"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary block w-full"
            >
              📖 View All Reviews on Google
            </a>
          </div>

          {/* Leave a Review */}
          <div className="medical-card inline-block max-w-md w-full">
            <p className="text-gray-600 mb-4">
              Had a great experience at our clinic?
            </p>
            <a
              href="https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline block w-full"
            >
              ✍️ Leave a Review on Google
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Reviews;