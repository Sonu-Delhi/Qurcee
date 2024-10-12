import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Role from "../common/role";
const AdminPanel = () => {

    const user = useSelector(state =>state?.user?.user)
    const nevigate = useNavigate()
    
    useEffect(() => {
        if (!user || user.role!== Role.ADMIN) {
            nevigate("/login")
        }
    }, [user,nevigate])

  return (
    <div className=" my-3 min-h-[calc(100vh-120px)] lg:flex hidden">
      <aside className="bg-white min-h-full w-full max-w-60 p-3">
        <div className="h-32 flex items-center justify-center flex-col">
        <div className='text-5xl cursor-pointer relative flex justify-center'>
        {
          user?.profilPic?(
            <img src={user?.profilPic} alt={user?.name} className='w-20 h-20 rounded-full'/>
          ):<FaRegCircleUser />
        }
        </div>
        <p className="capitalize text-lg font-semibold">{user?.name}</p>
        <p className="text-sm">{user?.role}</p>
        </div>

        {/* navigation */}
        <div className="">
        <nav className="grid p-4">
          <Link to={"all-users"} className="px-2 py-1 hover:bg-slate-100" >All users</Link>
          <Link to={"product"} className="px-2 py-1 hover:bg-slate-100" >Product</Link>
        </nav>
        </div>
      </aside>

      <main className="h-full bg-slate-100 w-full p-2">
        <Outlet/>
      </main>
    </div>
  );
};

export default AdminPanel;
