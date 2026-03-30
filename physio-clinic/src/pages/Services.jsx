import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get("https://physio-backend-swd8.onrender.com/api/services")
      .then(res => setServices(res.data))
      .catch(() => setServices([]));
  }, []);

  return (
    <div>

      <section className="section-container bg-slate-50">

        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="text-green-600 text-xs font-semibold tracking-widest mb-2">
            OUR SERVICES
          </p>

          <h1 className="section-title mb-4">
            Advanced Physiotherapy Treatments
          </h1>

          <p className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto">
            From pain relief to rehabilitation — personalized care to help you move better and live stronger.
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-4 gap-6">

          {services.map((s) => (
            <div
              key={s._id}
              className="medical-card rounded-3xl relative group flex flex-col items-start"
            >

              {/* TAG */}
              {s.tag && (
                <span className="absolute top-4 right-4 text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                  {s.tag}
                </span>
              )}

              {/* ICON */}
              <div className="text-3xl mb-6 bg-medical-50 text-medical-600 w-14 h-14 flex items-center justify-center rounded-2xl shadow-sm border border-medical-100 group-hover:scale-110 transition-transform">
                {s.icon || "💪"}
              </div>

              {/* TITLE */}
              <h3 className="text-xl font-bold text-medical-900 mb-3 group-hover:text-medical-600 transition-colors leading-tight">
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