import React, { useEffect, useState } from 'react';
import summryApi from '../common'; // Ensure this import is correct
import { MdModeEdit } from "react-icons/md";
import Changeuserrole from '../Components/Changeuserrole';
import moment from 'moment'
const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: ""
  });

  // Fetch all users from API
  const fetchAllUsers = async () => {
    try {
      const response = await fetch(summryApi.all_user.url, {
        method: summryApi.all_user.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch users');
      }

      const dataResponse = await response.json();

      if (dataResponse.success) {
        setAllUsers(dataResponse.data); // Ensure 'data.data' structure matches your API response
      console.log(allUsers);
      
      } else {
        throw new Error(dataResponse.message || 'Failed to fetch users');
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // UseEffect to fetch users on component mount
  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return (
      <div style={{ color: 'red' }}>
        Error: {error}
        <button onClick={fetchAllUsers} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className='pb-4 bg-white'>
      <table className='w-full userTable'>
        <thead>
          <tr className='bg-black text-white'>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Create Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user, index) => (
            <tr key={user._id}> {/* Use _id instead of id */}
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{moment(user?.createdAt).format("ll")}</td>
              <td>
                <button
                  className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'
                  onClick={() => {
                    setUpdateUserDetails(user); // Set selected user details
                    setOpenUpdate(true); // Open the update modal
                  }}
                >
                  <MdModeEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for updating user roles */}
      {openUpdate && (
        <Changeuserrole
          onClose={() => setOpenUpdate(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFun={fetchAllUsers} // Pass the refetch function to the component
        />
      )}
    </div>
  );
};

export default AllUsers;
