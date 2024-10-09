import React, { useContext, useState } from "react";
import loginIcon from '../assets/banners/signin.gif';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import summryApi from "../common";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Context from "../context";
import '../App.css'
// import loginIcon from '../assets/banners/signin.gif'
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { fetchUserDetails,fetchUserAddToCart } = useContext(Context); // Access fetchUserDetails directly

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevs) => ({
      ...prevs,
      [name]: value,
    }));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(summryApi.signin.url, {
      method: summryApi.signin.method,
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/");
      fetchUserDetails();
      fetchUserAddToCart() // Fetch user details after successful login
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  return (
    <section id="login" className="mt-3">
      <ToastContainer />
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto shadow rounded">
          <div className="w-20 h-20 mx-auto">
            <img className="rounded-full" src={loginIcon} alt="Sign logo" />
          </div>

          <form className="mt-6 flex flex-col gap-2" onSubmit={handelSubmit}>
            <div className="grid">
              <label>Email : </label>
              <div className="border-b-2 rounded bg-slate-100 p-2 flex">
                <input
                  type="email"
                  placeholder="enter email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div>
              <label>Password : </label>
              <div className="border-b-2 rounded bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="enter password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to={"/forget-password"}
                className="block w-fit ml-auto hover:text-blue-600 hover:underline"
              >
                Forget password?
              </Link>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:bg-blue-700 transition-all mx-auto block mt-6"
            >
              Login
            </button>
          </form>
          <p className="my-5">
            Don't have an account?{" "}
            <Link
              to={"/sign-up"}
              className="text-blue-600 hover:underline hover:text-blue-700"
            >
              Sign-up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
