import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/services")
      .then(res => setServices(res.data))
      .catch(() => setServices([]));
  }, []);

  return (
    <div>

      <section className="bg-[#f7f5f2] px-6 md:px-20 py-20">

        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="text-green-600 text-xs font-semibold tracking-widest mb-2">
            OUR SERVICES
          </p>

          <h1 className="text-3xl md:text-5xl font-semibold text-gray-900">
            Advanced Physiotherapy Treatments
          </h1>

          <p className="text-gray-500 mt-3 text-sm">
            From pain relief to rehabilitation — personalized care to help you move better and live stronger.
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-4 gap-6">

          {services.map((s) => (
            <div
              key={s._id}
              className="bg-white p-6 rounded-3xl shadow-md hover:shadow-xl transition duration-300 relative group"
            >

              {/* TAG */}
              {s.tag && (
                <span className="absolute top-4 right-4 text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                  {s.tag}
                </span>
              )}

              {/* ICON */}
              <div className="text-3xl mb-4 bg-green-50 w-12 h-12 flex items-center justify-center rounded-xl">
                {s.icon || "💪"}
              </div>

              {/* TITLE */}
              <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-green-700 transition">
                {s.title}
              </h3>

              {/* DESC */}
              <p className="text-gray-500 text-sm mb-4">
                {s.description}
              </p>

              {/* CTA */}
              <a
  href={`https://wa.me/919493800475?text=${encodeURIComponent(
    `Hi, I would like to book a session for ${s.title}`
  )}`}
  target="_blank"
  rel="noreferrer"
  className="text-green-600 text-sm font-medium hover:underline"
>
  Book Session →
</a>

            </div>
          ))}

        </div>
      </section>
    </div>
  );
};

export default Services;