import React from "react";

const Shippingdelivery = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-8">
          Shipping & Delivery Help
        </h2>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Shipping Information */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
            <p className="text-gray-700 mb-4">
              We offer a variety of shipping methods to meet your needs. Orders
              are processed within 1-2 business days, and shipping times
              typically range from 3-7 days, depending on your location and
              chosen shipping method.
            </p>
            <ul className="list-disc list-inside text-gray-700">
              <li>Standard Shipping (3-5 days)</li>
              <li>Express Shipping (1-2 days)</li>
              <li>Overnight Shipping (next day delivery)</li>
            </ul>
          </div>

          {/* Delivery Support */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Delivery Support</h3>
            <p className="text-gray-700 mb-4">
              If you have questions or issues regarding your delivery, our
              support team is here to help. Contact us through the form below
              or reach out to our support hotline for immediate assistance.
            </p>
            <p className="text-gray-700">
              <strong>Support Hotline:</strong> 1-800-123-4567
            </p>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="mt-12 bg-white p-6 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Need More Help? Contact Us!
          </h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="border border-gray-300 p-3 rounded-md w-full"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border border-gray-300 p-3 rounded-md w-full"
              required
            />
            <textarea
              placeholder="How can we help you?"
              className="border border-gray-300 p-3 rounded-md w-full md:col-span-2"
              rows="4"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition-colors md:col-span-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Shippingdelivery;
