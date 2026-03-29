import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { FiChevronDown } from "react-icons/fi";
const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:5000/api/faq")
      .then(res => setFaqs(res.data));
  }, []);

  const toggle = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <div>

      <section className="bg-[#f7f5f2] px-6 md:px-20 py-20 min-h-screen">

        {/* HEADER (MATCHES IMAGE) */}
        <div className="text-center mb-16">

          {/* BADGE */}
          <span className="inline-block bg-green-100 text-green-700 text-xs px-4 py-1 rounded-full font-medium mb-4">
            FAQ
          </span>

          {/* TITLE */}
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
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
              className={`rounded-xl p-4 transition-all duration-300 ${
                active === index
                  ? "bg-[#dce9e6] shadow-sm"
                  : "bg-white"
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