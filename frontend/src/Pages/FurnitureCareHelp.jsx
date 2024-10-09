import React from "react";

const FurnitureCareHelp = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center mb-8">
          Furniture Care Help
        </h2>

        {/* Grid for Furniture Care Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* General Furniture Care */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-4">
              General Furniture Care
            </h3>
            <p className="text-gray-700 mb-4">
              Proper care of your furniture will ensure its longevity and keep it looking great for years to come. Here are some general tips to maintain the beauty of your pieces:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Avoid direct sunlight to prevent fading.</li>
              <li>Dust frequently using a soft, lint-free cloth.</li>
              <li>Use coasters and mats to protect surfaces from heat and spills.</li>
              <li>Clean up spills immediately to prevent staining.</li>
            </ul>
          </div>

          {/* Material-Specific Care */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-4">
              Material-Specific Care
            </h3>
            <p className="text-gray-700 mb-4">
              Different materials require different care. Follow these tips based on the material of your furniture:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>
                <strong>Wood:</strong> Use a mild cleaner, avoid excess water, and polish with a wood conditioner.
              </li>
              <li>
                <strong>Fabric:</strong> Vacuum upholstery regularly, blot stains (don't rub), and use fabric protectors.
              </li>
              <li>
                <strong>Leather:</strong> Clean with a damp cloth and condition with leather care products to maintain softness.
              </li>
              <li>
                <strong>Metal:</strong> Wipe clean with a damp cloth and use a metal polish to prevent tarnishing.
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-12 bg-white p-6 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Need More Assistance? Contact Us!
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
              placeholder="Your Question"
              className="border border-gray-300 p-3 rounded-md w-full md:col-span-2"
              rows="4"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600 transition-colors md:col-span-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FurnitureCareHelp;
