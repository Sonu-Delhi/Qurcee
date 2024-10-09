import React from "react";

const TermsAndCond = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center mb-8">
          Terms and Conditions Help
        </h2>

        {/* Grid for Terms and Conditions Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* General Terms */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-4">General Terms</h3>
            <p className="text-gray-700 mb-4">
              By using our services, you agree to our terms and conditions. Please read them carefully to understand your rights and responsibilities while using our platform.
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>You must be at least 18 years old to use our services.</li>
              <li>All transactions on our platform are subject to the governing law of our region.</li>
              <li>We reserve the right to terminate or suspend accounts in case of violation of these terms.</li>
            </ul>
            <p className="text-gray-700">
              For full details, refer to the complete Terms and Conditions available on our website.
            </p>
          </div>

          {/* Privacy and Security */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Privacy and Security</h3>
            <p className="text-gray-700 mb-4">
              Your privacy and security are important to us. We take all necessary precautions to protect your personal information and ensure your data is secure.
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>We collect personal information only to provide better services.</li>
              <li>We will not share your data with third parties without your consent.</li>
              <li>All data is protected using encryption and secure storage practices.</li>
            </ul>
            <p className="text-gray-700">
              For further information, please review our Privacy Policy and Security Measures page.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 bg-white p-6 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Frequently Asked Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Can I cancel my account?</h4>
              <p className="text-gray-700">
                Yes, you can cancel your account at any time by visiting your profile settings.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">How do you handle data privacy?</h4>
              <p className="text-gray-700">
                We follow strict data protection laws to ensure your personal information is safe. Please read our Privacy Policy for more details.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-12 bg-white p-6 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Still Have Questions? Contact Us!
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
              className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition-colors md:col-span-2"
            >
              Submit Question
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default TermsAndCond;
