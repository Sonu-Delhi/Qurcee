import React from "react";

const PaymentSecurityHelp = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center mb-8">
          Payment & Security Help
        </h2>

        {/* Grid for Payment and Security Help */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Payment Information */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Payment Information</h3>
            <p className="text-gray-700 mb-4">
              We accept a wide variety of payment methods, including credit
              cards, PayPal, and other secure payment gateways. All transactions
              are protected with encryption to ensure your details remain safe.
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Visa, MasterCard, American Express</li>
              <li>PayPal</li>
              <li>Apple Pay, Google Pay</li>
              <li>Bank Transfers</li>
            </ul>
            <p className="text-gray-700">
              If you encounter any issues with your payment, please contact our
              support team for assistance.
            </p>
          </div>

          {/* Security Information */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Security Information</h3>
            <p className="text-gray-700 mb-4">
              Your security is our top priority. Our website uses the latest
              security protocols to safeguard your personal and payment
              information. Here’s how we protect your data:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>256-bit SSL encryption</li>
              <li>Two-factor authentication</li>
              <li>Secure servers with regular audits</li>
              <li>PCI DSS Compliance</li>
            </ul>
            <p className="text-gray-700">
              For further questions or concerns about our security practices,
              please reach out to our security team.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-12 bg-white p-6 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Have More Questions? Contact Us!
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
              placeholder="Your Message"
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

export default PaymentSecurityHelp;
