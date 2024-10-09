import React from "react";

const QurceeWarrantyHelp = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center mb-8">
          Qurcee Warranty Help
        </h2>

        {/* Warranty Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* General Warranty Information */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-4">
              General Warranty Information
            </h3>
            <p className="text-gray-700 mb-4">
              At Qurcee, we stand behind the quality of our products. All
              products come with a comprehensive warranty to ensure your peace
              of mind. Our warranty covers defects in materials and workmanship
              for a period of 1 to 3 years, depending on the product.
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>1-Year Warranty: Electronics and Accessories</li>
              <li>2-Year Warranty: Home Appliances</li>
              <li>3-Year Warranty: Furniture and Outdoor Equipment</li>
            </ul>
            <p className="text-gray-700">
              To initiate a warranty claim, you will need proof of purchase and
              details of the defect.
            </p>
          </div>

          {/* Warranty Coverage Details */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-4">What is Covered?</h3>
            <p className="text-gray-700 mb-4">
              Our warranty covers defects in materials and workmanship under
              normal use. Here's what's included:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Product defects discovered after unboxing.</li>
              <li>Electrical or mechanical failures under normal use.</li>
              <li>Replacements for defective parts or products.</li>
              <li>Free repairs for issues related to manufacturing defects.</li>
            </ul>
            <p className="text-gray-700">
              Please note, the warranty does not cover accidental damage,
              misuse, or wear and tear from regular use.
            </p>
          </div>
        </div>

        {/* Warranty Claim Form */}
        <div className="mt-12 bg-white p-6 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Need to File a Warranty Claim? Contact Us!
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
              placeholder="Describe the issue"
              className="border border-gray-300 p-3 rounded-md w-full md:col-span-2"
              rows="4"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition-colors md:col-span-2"
            >
              Submit Claim
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default QurceeWarrantyHelp;
