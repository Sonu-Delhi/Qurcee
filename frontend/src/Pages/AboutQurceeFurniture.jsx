import React from "react";
import image from "../assets/banners/sonu-yadav.jpg"
const AboutQurceeFurniture = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center mb-8">About Qurcee Furniture</h2>

        {/* About Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Who We Are</h3>
            <p className="text-gray-700 mb-6">
              At Qurcee Furniture, we believe in creating spaces that reflect your style and personality.
              Established with a passion for modern design and functionality, we offer a wide range of 
              furniture that blends aesthetics with comfort. Our products are crafted to suit diverse 
              tastes and fit seamlessly into any home.
            </p>
            <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
            <p className="text-gray-700 mb-4">
              Our mission is to provide quality, affordable, and eco-friendly furniture that transforms 
              houses into homes. We take pride in our craftsmanship and our commitment to sustainability 
              in every piece we create.
            </p>
            <p className="text-gray-700 mb-4">
              Whether you're looking for contemporary sofas, functional storage solutions, or beautifully 
              designed dining sets, Qurcee Furniture is here to help you elevate your living space.
            </p>
          </div>

          {/* Image Section */}
          <div className="flex justify-center">
            <img 
              src={image} 
              alt="Qurcee Furniture" 
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Value 1 */}
          <div className="bg-white p-6 shadow-lg rounded-lg text-center">
            <h4 className="text-xl font-semibold mb-4">Quality Craftsmanship</h4>
            <p className="text-gray-700">
              Each piece is made with precision and care, using high-quality materials to ensure longevity and durability.
            </p>
          </div>

          {/* Value 2 */}
          <div className="bg-white p-6 shadow-lg rounded-lg text-center">
            <h4 className="text-xl font-semibold mb-4">Eco-Friendly Approach</h4>
            <p className="text-gray-700">
              Sustainability is at the core of our manufacturing process. We use responsibly sourced materials and eco-conscious techniques.
            </p>
          </div>

          {/* Value 3 */}
          <div className="bg-white p-6 shadow-lg rounded-lg text-center">
            <h4 className="text-xl font-semibold mb-4">Customer Satisfaction</h4>
            <p className="text-gray-700">
              Your comfort and satisfaction are our priorities. We offer personalized services to meet your design needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutQurceeFurniture;
