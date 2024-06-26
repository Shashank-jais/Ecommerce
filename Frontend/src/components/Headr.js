import React, { useContext, useState } from 'react'
import Logo from './logo'
import { IoSearch } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import summaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userslice';
import ROLE from '../common/role';
import Context from '../context';
import image from '../assest/new_logo.jpeg'


const Headr = () => {
  const user = useSelector((state) => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay, setmenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search ,setSearch] = useState(searchQuery)



  // console.log('user', user);
  const handlelogout = async () => {
    const fetchdata = await fetch(summaryApi.logout_user.url, {
      method: summaryApi.logout_user.method,
      credentials: 'include'
    })
    const data = await fetchdata.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/")
    }
    if (data.error) {
      toast.error(data.message);
    }
    navigate('/')

  }


  const handleSearch = async (e) => {
    const { value } = e.target 
    setSearch(value)
    if(value){
      navigate(`/search?q=${value}`)  
    }
    else{
      navigate('/search')
    }
  }

  return (
    <div>
      <header className='h-16 shadow-md header-bg fixed w-full z-40'>
        <div className="p-5 h-full container mx-auto flex items-center justify-between">
          <div className="">
            <Link to={'/'}>
              {/* <Logo w={100} h={50} /> */}
              <img src={image} width={140}  />
            </Link>
          </div>
          <div className="hidden lg:flex items-center w-full justify-between  max-w-sm border rounded-full focus-within:shadow">
            <input type='text' className='w-full  h-[1.7rem] pl-2 outline-none ' placeholder='search product here ...'  onChange={handleSearch} value={search}/>
            <div className='text-lg min-w-[50px] h-[1.7rem] bg-red-500 flex items-center justify-center rounded-r-full text-white' ><IoSearch /></div>
          </div>
          <div className="flex item-center justify-center gap-3 lg:gap-7 ">
            <div className='relative group flex justify-center'>

              {
                user?._id && (
                  <div className='cursor-pointer flex justify-center text-3xl lg:text-3xl' onClick={() => setmenuDisplay(preve => !preve)} >
                    {
                      user?.profilePic ? (
                        <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                      ) : (<FaRegUserCircle />)
                    }

                  </div>
                )
              }

              {
                menuDisplay && (
                  <div
                    div className='absolute bg-white bottom-0 top-8 h-fit p-2 shadow-lg rounded hidden group-hover:block'>
                    <nav>

                      {
                        user?.role === ROLE.ADMIN && (

                          <Link to={'admin-panel/allproducts'} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setmenuDisplay(preve => !preve)}>Admin Panel</Link>
                        )
                      }
                    </nav>
                  </div>)
              }

            </div>
            {
              user?._id && (
                <Link to={'/cart'} className=' cursor-pointer flex items-center relative text-3xl lg:text-3xl '>
                  <span><HiMiniShoppingCart /></span>
                  <div className='bg-red-500 text-white flex items-center justify-center w-5 h-5 rounded-full p-1 absolute -top-2 -right-3'><p className='text-xs'>{context?.cartproductcount}</p></div>
                </Link>
              )
            }


            <div className='text-md lg:text-l'>
              {
                user?._id ? (

                  <button onClick={handlelogout} className='px-3 py-1 rounded-full text-white bg-red-500 hover:bg-red-700'>Logout</button>

                ) : (
                  <Link to={'/login'}>
                    <button className='px-3 py-1 rounded-full text-white bg-red-500 hover:bg-red-700'>Login</button>
                  </Link>)

              }
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Headr
