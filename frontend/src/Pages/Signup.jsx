import React, {useState} from 'react'
import '../App.css'
import loginIcon from "../assets/banners/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ImageTobase64 from '../helper/ImageTobase64';
import summryApi from '../common';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import loginIcon from '../assets/banners/signin.gif'
const Signup = () => {
  const [showPassword, setShowPassword]=useState(false)
  const [conshowPassword, setconShowPassword]=useState(false)
  const [data, setData]=useState({
    email:"",
    name:"",
    password:"",
    confirm_password:"",
    profilPic:"",
  })

  const navigate = useNavigate()

  const handleChange=(e)=>{
    const {name, value} = e.target
    setData((prevs)=>{
      return {
       ...prevs,
        [name]: value
      }
    })
  }

  const handelUploadPic = async (e)=>{
    const file = e.target.files[0];
    const imagePic =  await ImageTobase64(file)
    // console.log("Imagepic",imagePic);
    setData((prev)=>{
      return{
        ...prev,
        profilPic: imagePic,
      }
    })
    
  }

  const handelSubmit= async (e)=>{
    e.preventDefault();
    if(data.password===data.confirm_password){
      const dataResponse = await fetch(summryApi.signUp.url,{
        method: summryApi.signUp.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      const dataApi = await dataResponse.json()
      console.log("Usersignup",dataApi)
      if(dataApi.success){
        toast.success(dataApi.message)
        navigate("/login")
      }
      if(dataApi.error){
        toast.error(dataApi.message)
      }
    }else{
      toast.error("Please check the passwrod and confirm password")
    }
  }

  
  return (
    <section id="signup" className='mt-3'>
    <ToastContainer />
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto shadow rounded">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
            <img className="rounded-full" src={data.profilPic || loginIcon} alt="Sign logo" />
            </div>
            <form>
            <label>
            <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full '>
              Upload Photo
            </div>
              <input type='file' className='hidden' onChange={handelUploadPic} />
            </label>
            </form>
          </div>

          <form className="mt-6 flex flex-col gap-2" onSubmit={handelSubmit}>
            <div className="grid pb-2">
              <label>Name : </label>
              <div className="border-b-2 rounded bg-slate-100 p-2">
                <input
                 type="text" 
                 placeholder="Enter name"
                 name="name"
                 value={data.name}
                 onChange={handleChange}  
                 required
                 className="w-full h-full outline-none bg-transparent "

                 />
              </div>
            </div>

            <div>
              <label>Email : </label>
              <div className="border-b-2 rounded bg-slate-100 p-2">
                <input
                 type="email" 
                 placeholder="Enter email"
                 name="email"
                 value={data.email}
                 onChange={handleChange}
                 required  
                 className="w-full h-full outline-none bg-transparent "

                 />
              </div>
            </div>


            <div>
              <label> Password : </label>
              <div className="border-b-2 rounded bg-slate-100 p-2 flex">
                <input
                 type={showPassword ? "text" : "password"} 
                 placeholder="Enter password"
                 name="password"
                 value={data.password}
                 onChange={handleChange}
                 required 
                 className="w-full h-full outline-none bg-transparent "
                 />
                <div className="cursor-pointer text-xl" onClick={()=>setShowPassword((prev)=>!prev)}>
                  <span>
                  {
                    showPassword ?(
                    <FaEyeSlash />
                    )
                    :
                    (
                    <FaEye />
                    )
                  }
                  </span>
                </div>
              </div>
              
            </div>
            <div>
              <label>Confirm Password : </label>
              <div className="p-2 flex border-b-2 rounded bg-slate-100">
                <input
                 type={conshowPassword ? "text" : "password"} 
                 placeholder="Enter confirm password"
                 name="confirm_password"
                 value={data.confirm_password}
                 onChange={handleChange}
                 required 
                 className="w-full h-full outline-none bg-transparent"
                 />
                <div className="cursor-pointer text-xl" onClick={()=>setconShowPassword((prev)=>!prev)}>
                  <span>
                  {
                    conshowPassword ?(
                    <FaEyeSlash />
                    )
                    :
                    (
                    <FaEye />
                    )
                  }
                  </span>
                </div>
              </div>
              
            </div>

            <button type="submit" className="bg-blue-600 text-white  px-6 py-2 w-full max-w-[150px] rounded-full hover:bg-blue-700 transition-all mx-auto block mt-6">Sign Up</button>
          </form>
          <p className="my-5">Already have account ? <Link to={"/login"} className="text-blue-600 hover:underline hover:text-blue-700">Login</Link></p>
        </div>
      </div>
    </section>
  );
}

export default Signup
