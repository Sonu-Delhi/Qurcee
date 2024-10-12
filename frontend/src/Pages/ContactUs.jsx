import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const ContactUs = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Contact Form */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-6 text-center">
              Send Us a Message
            </h3>
            <form>
              {/* Name Input */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  Name
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <FaEnvelope className="text-gray-500 mx-3" />
                  <input
                    type="text"
                    id="name"
                    className="w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-r-lg"
                    placeholder="Your Name"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="email">
                  Email
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <FaEnvelope className="text-gray-500 mx-3" />
                  <input
                    type="email"
                    id="email"
                    className="w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-r-lg"
                    placeholder="Your Email"
                  />
                </div>
              </div>

              {/* Phone Input */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="phone">
                  Phone
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <FaPhone className="text-gray-500 mx-3" />
                  <input
                    type="text"
                    id="phone"
                    className="w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-r-lg"
                    placeholder="Your Phone"
                  />
                </div>
              </div>

              {/* Message Input */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="message">
                  Message
                </label>
                <div className="flex items-start border border-gray-300 rounded-lg">
                  <FaEnvelope className="text-gray-500 mx-3 mt-3" />
                  <textarea
                    id="message"
                    className="w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-r-lg"
                    placeholder="Your Message"
                    rows="4"
                  />
                </div>
              </div>

              <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 w-full">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="p-6 bg-transparent  rounded-lg">
            <h3 className="text-xl font-semibold mb-6 text-center">
              Get in Touch
            </h3>
            <ul>
              {/* Email */}
              <li className="flex items-center mb-4">
                <div className="bg-white w-1/2 flex items-center gap-2 p-5 border-b-2 border-blue-500 shadow">
                  <div className="bg-blue-500 w-16 h-16 text-center rounded-full flex items-center justify-center">
                    <FaEnvelope className="text-white text-2xl" />
                  </div>
                <div>
                <p className="font-semibold text-gray-700">Email</p>
                <p className="text-gray-600">contact@qurcee.com</p>
                </div>
                </div>
              </li>

              {/* Location */}
              <li className="flex items-center mb-4">
                <FaMapMarkerAlt className="text-blue-500 text-xl mr-4" />
                <div>
                  <p className="font-semibold text-gray-700">Location</p>
                  <p className="text-gray-600">
                    123 Furniture St, Design City, Country
                  </p>
                </div>
              </li>

              {/* Phone */}
              <li className="flex items-center">
                <FaPhone className="text-blue-500 text-xl mr-4" />
                <div>
                  <p className="font-semibold text-gray-700">Phone</p>
                  <p className="text-gray-600">+123-456-7890</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
