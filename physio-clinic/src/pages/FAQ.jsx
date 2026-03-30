import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { FiChevronDown } from "react-icons/fi";
const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    axios.get("https://physio-backend-swd8.onrender.com/api/faq")
      .then(res => setFaqs(res.data));
  }, []);

  const toggle = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <div>

      <section className="section-container bg-slate-50 min-h-[80vh]">

        {/* HEADER (MATCHES IMAGE) */}
        <div className="text-center mb-16">

          {/* BADGE */}
          <span className="inline-block bg-green-100 text-green-700 text-xs px-4 py-1 rounded-full font-medium mb-4">
            FAQ
          </span>

          {/* TITLE */}
          <h1 className="section-title mt-4 mb-4">
            Common Questions About Your Visit
          </h1>

          {/* SUBTITLE */}
          <p className="text-gray-500 mt-3 text-sm">
            Everything you need to know before coming to our clinic.
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="max-w-3xl mx-auto space-y-4">

          {faqs.map((item, index) => (
            <div
              key={index}
              className={`medical-card mb-4 !p-6 cursor-pointer transition-all duration-300 ${
                active === index
                  ? "ring-2 ring-medical-500 bg-medical-50/30"
                  : ""
              }`}
            >

              {/* QUESTION */}
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center"
              >
                <span className="font-medium text-gray-800 text-left">
                  {item.question}
                </span>

                {/* ARROW */}
                <FiChevronDown
                  className={`text-black text-xl transition-transform duration-300 ${
                    active === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* ANSWER */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  active === index ? "max-h-40 mt-3" : "max-h-0"
                }`}
              >
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.answer}
                </p>
              </div>

            </div>
          ))}

        </div>

      </section>
    </div>
  );
};

export default FAQ;