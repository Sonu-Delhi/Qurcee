import React from "react";

const Service = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>

        {/* Services List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Service 1: Custom Furniture Design */}
          <div className="bg-white p-6 shadow-lg rounded-lg text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Custom Furniture Design"
              className="mx-auto mb-6"
            />
            <h3 className="text-xl font-semibold mb-4">Custom Furniture Design</h3>
            <p className="text-gray-700">
              Get personalized furniture designed to your specifications. We work closely with you to bring your vision to life.
            </p>
          </div>

          {/* Service 2: Interior Design Consultation */}
          <div className="bg-white p-6 shadow-lg rounded-lg text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Interior Design Consultation"
              className="mx-auto mb-6"
            />
            <h3 className="text-xl font-semibold mb-4">Interior Design Consultation</h3>
            <p className="text-gray-700">
              Our expert designers help you curate the perfect space by recommending the best furniture and layouts for your home.
            </p>
          </div>

          {/* Service 3: Delivery and Installation */}
          <div className="bg-white p-6 shadow-lg rounded-lg text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Delivery and Installation"
              className="mx-auto mb-6"
            />
            <h3 className="text-xl font-semibold mb-4">Delivery & Installation</h3>
            <p className="text-gray-700">
              Enjoy hassle-free delivery and professional installation of your furniture, ensuring a perfect setup in your home.
            </p>
          </div>
        </div>

        {/* Service Highlight Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Why Choose Qurcee Furniture?</h3>
            <p className="text-gray-700 mb-6">
              We offer comprehensive services to ensure you get the best furniture shopping experience. From custom designs to interior consultation and professional installation, we are with you at every step.
            </p>
            <p className="text-gray-700">
              Whether you're furnishing a new home or redesigning your living space, Qurcee Furniture is here to help you create a home you love.
            </p>
          </div>

          {/* Image Section */}
          <div className="flex justify-center">
            <img
              src="https://via.placeholder.com/400"
              alt="Qurcee Services"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;
