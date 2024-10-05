import React from 'react';
import { Link } from 'react-router-dom';
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
            </p>
            {/* Social Media */}
          <div className='mt-3'>
            <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-2">
              <Link to="https://chatgpt.com/" className="hover:text-blue-700 text-blue-600 text-2xl"><FaSquareFacebook/></Link>
              <Link href="#" className="hover:text-blue-700 text-blue-600 text-2xl"><FaSquareTwitter/></Link>
              <Link href="#" className="hover:text-blue-700 text-blue-600 text-2xl"><FaSquareInstagram/></Link>
              <Link href="#" className="hover:text-blue-700 text-blue-600 text-2xl"><FaLinkedin/></Link>
            </div>
          </div>
          </div>


          {/* Help */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Help</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-gray-400">Sipping and Delivery</Link></li>
              <li><Link href="#" className="hover:text-gray-400">Payment and Security</Link></li>
              <li><Link href="#" className="hover:text-gray-400">furniture Care</Link></li>
              <li><Link href="#" className="hover:text-gray-400">Qurcee Warranty</Link></li>
              <li><Link to={"/terms&conditions"} className="hover:text-gray-400">Term of use</Link></li>
              <li><Link href="#" className="hover:text-gray-400">Free Furniture</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-gray-400">Home</Link></li>
              <li><Link href="#" className="hover:text-gray-400">Shop</Link></li>
              <li><Link href="#" className="hover:text-gray-400">About Us</Link></li>
              <li><Link href="#" className="hover:text-gray-400">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-gray-400">Help Center</Link></li>
              <li><Link href="#" className="hover:text-gray-400">FAQs</Link></li>
              <li><Link href="#" className="hover:text-gray-400">Shipping & Returns</Link></li>
              <li><Link href="#" className="hover:text-gray-400">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

        <div className="mt-10 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
