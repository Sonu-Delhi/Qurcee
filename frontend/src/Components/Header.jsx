import React, { useState, useEffect, useRef, useContext } from 'react';
// import logo from './logo.png';
import './Header.css';
// import { CiSearch } from "react-icons/ci";
// import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa"; // Import icons for the hamburger menu
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import summryApi from '../common';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setuserDetails } from '../store/userSlice';
import Role from '../common/role';
import Context from '../context';

const Header = () => {
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const nevigate = useNavigate()
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef();

  const handleLogout = async () => {
    const fetchData = await fetch(summryApi.logout.url, {
      method: summryApi.logout.method,
      credentials: "include"
    });

    const data = await fetchData.json();
    if (data.success) {
      dispatch(setuserDetails(null));
      toast.success(data.message);
      nevigate("/")
    } else if (data.error) {
      toast.error(data.message);
    }
  };
  // console.log("Count",context)

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuDisplay(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-slate-400 border-b border-gray-200 shadow-sm fixed w-full z-40">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        {/* Left Side - Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="text-xl font-bold text-gray-800">Qurcce</Link>
        </div>
        
        {/* Center - Navigation Links */}
        <div className={`absolute font-medium top-11 left-0 w-full lg:w-fit bg-slate-400 md:static md:flex items-center justify-center md:space-x-1 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <Link to={"/"} className="block md:inline-block px-4 py-2 text-gray-700 hover:text-gray-900">Home</Link>
          <Link to={"/about"} className="block md:inline-block px-4 py-2 text-gray-700 hover:text-gray-900">About</Link>
          <Link to="/buy" className="block md:inline-block px-4 py-2 text-gray-700 hover:text-gray-900">Buy</Link>
          <Link to={"/service"} className="block md:inline-block px-4 py-2 text-gray-700 hover:text-gray-900">Services</Link>
          <Link to={"/contact-us"} className="block md:inline-block px-4 py-2 text-gray-700 hover:text-gray-900">Contact</Link>
        </div>

        {/* Right Side - Profile, Cart, and Login */}
        <div className="flex items-center gap-4">
          {/* Profile Icon */}
          <div className="relative flex justify-center">
            {user?._id && (
              <div className="text-3xl cursor-pointer" onClick={() => setMenuDisplay(prev => !prev)}>
                {user?.profilPic ? (
                  <img src={user?.profilPic} alt={user?.name} className="w-10 h-10 rounded-full" />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {menuDisplay && (
              <div ref={menuRef} className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav>
                  {user?.role === Role.ADMIN && (
                    <Link to="/admin-panel/product" className="whitespace-nowrap hidden lg:block hover:bg-slate-100 p-2 z-50" onClick={() => setMenuDisplay(false)}>Admin Panel</Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          {/* Shopping Cart */}
          {
            user?._id &&(
              <Link to={"/cart"} className="text-2xl relative">
            <span><FaShoppingCart /></span>
            <div className="bg-blue-600 absolute -top-2 -right-3 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center">
              <p className="text-sm">{context.cartCountProduct}</p>
            </div>
          </Link>
            )
          }
          

          {/* Login/Logout Button */}
          <div>
            {user?._id ? (
              <button onClick={handleLogout} className="bg-blue-600 px-3 py-1 rounded-full text-white hover:bg-blue-700">Logout</button>
            ) : (
              <Link to="/login" className="bg-blue-600 px-3 py-1 rounded-full text-white hover:bg-blue-700">Login</Link>
            )}
          </div>
          {/* Hamburger Menu Icon for Mobile */}
        <div className="md:hidden text-2xl" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
