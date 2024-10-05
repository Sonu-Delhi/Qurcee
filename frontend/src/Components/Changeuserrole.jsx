import React, { useState } from 'react';
import Role from '../common/role';
import { IoMdClose } from "react-icons/io";
import summryApi from '../common';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Changeuserrole = ({
    name,
    email,
    userId,
    role,
    onClose,
    callFun,
}) => {

    const [userRole, setUserRole] = useState(role);
    const [loading, setLoading] = useState(false); // Loading state to disable button during API call

    // Handle role selection change
    const handleOnChange = (e) => {
        setUserRole(e.target.value);
    };

    // Update user role function
    const updateUser = async () => {
        if (userRole === role) {
            toast.info("No changes detected"); // Prevent submission if role is not changed
            return;
        }

        setLoading(true); // Set loading to true when API call starts
        try {
            const response = await fetch(summryApi.update_user.url, {
                method: summryApi.update_user.method,
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    role: userRole,
                }),
            });

            const responseData = await response.json();
            if (response.ok && responseData.success) {
                toast.success(responseData.message);
                onClose();  // Close the modal on success
                callFun();  // Call parent function to refresh user list
            } else {
                toast.error(responseData.message || "Failed to update user role");
            }
        } catch (error) {
            console.error("Error updating user role:", error);
            toast.error("An error occurred while updating the role");
        } finally {
            setLoading(false); // Set loading to false when API call ends
        }
    };

    return (
        <div className='fixed top-0 bottom-0 right-0 left-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-50'>
            <ToastContainer />
            <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm '>
                <button className='block ml-auto' onClick={onClose}>
                    <IoMdClose />
                </button>
                <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>
                <p>Name: {name}</p>
                <p>Email: {email}</p>
                <div className='flex items-center justify-between my-4'>
                    <p>Role: </p>
                    <select className='border px-4 py-1' value={userRole} onChange={handleOnChange}>
                        {Object.values(Role).map((el) => (
                            <option value={el} key={el}>{el}</option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={updateUser}
                    className={`w-fit mx-auto block p-2 rounded-full py-1 px-3 bg-orange-600 text-white hover:bg-orange-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}  // Disable button during loading
                >
                    {loading ? "Updating..." : "Change Role"}
                </button>
            </div>
        </div>
    );
};

export default Changeuserrole;
