import { Outlet } from 'react-router-dom';
import './App.css'
import Header from './Components/Header';
// import Navbar from './Components/Navbar'
import Footer from './Components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useCallback, useState } from 'react';
import summryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setuserDetails } from './store/userSlice';

function App() {
  const dispatch = useDispatch();
  const [cartCountProduct,setCartCountProduct]=useState(0)

  // Wrap fetchUserDetails in useCallback to memoize the function
  const fetchUserDetails = useCallback(async () => {
    try {
      const dataResponse = await fetch(summryApi.current_user.url, {
        method: summryApi.current_user.method,
        credentials: "include",
      });

      if (!dataResponse.ok) {
        throw new Error(`HTTP error! status: ${dataResponse.status}`);
      }

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        dispatch(setuserDetails(dataApi.data));
      } else {
        console.error("Failed to fetch user details:", dataApi.message);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }, [dispatch]); // Add dispatch as a dependency


  // Fetch UserCartDetails
  const fetchUserAddToCart = useCallback(async () => {
    try {
      const dataResponse = await fetch(summryApi.addtoCartProductCount.url, {
        method: summryApi.addtoCartProductCount.method,
        credentials: "include",
      });

      if (!dataResponse.ok) {
        throw new Error(`HTTP error! status: ${dataResponse.status}`);
      }

      const dataApi = await dataResponse.json();
      // console.log('data',dataApi);
      
      if (dataApi.success) {
        dispatch(setCartCountProduct(dataApi?.data?.count));
      } else {
        console.error("Failed to fetch user details:", dataApi.message);
      }
    } catch (error) {
      // console.error("Error fetching user details:", error);
    }
  }, [dispatch]); // Add dispatch as a dependency


  // useEffect with fetchUserDetails as a dependency
  useEffect(() => {
    fetchUserDetails();
    // User Cart product Details
    fetchUserAddToCart(); // Call this function when the component mounts to fetch the user's cart count immediately. This will prevent unnecessary re-renders when the user's details change.
  }, [fetchUserDetails,fetchUserAddToCart]); // Now this will not cause re-renders

  return (
    <>
      <Context.Provider value={{ fetchUserDetails,cartCountProduct, fetchUserAddToCart }}>
        <ToastContainer />
        <Header />
        {/* <Navbar/> */}
        <main className="min-h-[calc(100vh-120px)] pt-11 bg-slate-100">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
