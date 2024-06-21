import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Headr from './components/Headr';
import Footer from './components/footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import summaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userslice';
// import { setUserDetails } from './store/userslice';

function App() {
  const dispatch = useDispatch()
  const [cartproductcount ,setCartproductcount] = useState(0)

  const fetchuserdetails = async () => {
    const dataresponse = await fetch(summaryApi.currentUser.url, {
      method: summaryApi.currentUser.method,
      credentials: "include",
    })

    const dataApi = await dataresponse.json();
    if(dataApi.success) {
      dispatch(setUserDetails(dataApi.data))
    }
    // console.log("DataUser: " + dataresponse)

  }

  const fetchUserAddCart=async ()=>{
    const dataresponse = await fetch(summaryApi.countAddToCart.url, {
      method: summaryApi.countAddToCart.method,
      credentials: "include",
    })

    const dataApi = await dataresponse.json();
    console.log("dataApi",dataApi)
    setCartproductcount(dataApi?.data.count)
  }


  useEffect(() => {
    fetchuserdetails();
    fetchUserAddCart();
  }, [])
  return (
    <>
      <Context.Provider value={{
        fetchuserdetails,
        cartproductcount,
        fetchUserAddCart
      }}>
        <ToastContainer />
        <Headr />
        <main className=' min-h-[calc(100vh-125px)] pt-16 '>
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
