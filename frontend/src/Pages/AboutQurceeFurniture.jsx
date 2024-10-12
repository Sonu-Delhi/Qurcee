import React from "react";
import image1 from "../assets/banners/sonu-yadav.jpg"
const AboutOwnerQurceeFurniture = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center mb-8">About the Founder</h2>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Meet the Founder</h3>
            <p className="text-gray-700 mb-6">
              Qurcee Furniture was founded by Sonu Yadav, a passionate designer with a vision to transform
              homes through beautifully crafted furniture. With over a decade of experience in furniture design 
              and interior decoration, Sonu Yadav believes in creating pieces that not only elevate spaces 
              but also make them more functional and comfortable for everyday life.
            </p>
            <p className="text-gray-700 mb-6">
              Growing up with a love for design, Sonu Yadav pursued formal education in interior design 
              and furniture craftsmanship. This passion led to the creation of Qurcee Furniture, where each 
              piece is made with attention to detail, quality materials, and a deep understanding of modern aesthetics.
            </p>
            <h3 className="text-2xl font-semibold mb-4">Our Philosophy</h3>
            <p className="text-gray-700">
              [Owner's Name] believes that furniture should be more than just functional—it should be an expression 
              of who we are. By blending contemporary styles with traditional craftsmanship, Qurcee Furniture 
              offers unique and customizable pieces that can transform any space into a personal sanctuary.
            </p>
          </div>

          {/* Image Section */}
          <div className="flex justify-center">
            <img
              src={image1}
              alt="Owner's Photo"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="mt-12 bg-white p-6 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-center">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="text-center">
              <h4 className="font-semibold text-gray-800 mb-2">Passion for Design</h4>
              <p className="text-gray-700">
                We create furniture with love for design, making every piece unique and full of personality.
              </p>
            </div>

            {/* Value 2 */}
            <div className="text-center">
              <h4 className="font-semibold text-gray-800 mb-2">Sustainability</h4>
              <p className="text-gray-700">
                Sustainability is at the core of everything we do. We use eco-friendly materials to reduce our carbon footprint.
              </p>
            </div>

            {/* Value 3 */}
            <div className="text-center">
              <h4 className="font-semibold text-gray-800 mb-2">Customer-Centric</h4>
              <p className="text-gray-700">
                Every piece is designed with the customer in mind, ensuring comfort, functionality, and style.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutOwnerQurceeFurniture;
