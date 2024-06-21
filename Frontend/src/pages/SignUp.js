import React, { useState } from 'react'
import loginIcon from '../assest/signin.gif'
import { IoEye } from "react-icons/io5";
import { IoIosEyeOff } from "react-icons/io";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import imageTobase64 from '../Helpers/imagetobase64';
import summaryApi from '../common/index';
import { toast } from 'react-toastify';


const SignUp = () => {

  const [ShowPassword, SetshowPassword] = useState(false);
  const [ShowConfirmPassword, SetshowConfirmPassword] = useState(false);
  const [data, setdata] = useState({
    name: '',
    email: '',
    password: '',
    Confirmpassword: '',
    profilePic: ''
  })
  const navigate=useNavigate();

  const handleOnchange = (e) => {
    const { name, value } = e.target

    setdata((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }
  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file)
    // console.log("imagePic",imagePic)

    setdata((preve) => {
      return {
        ...preve,
        profilePic: imagePic
      }
    })
  }
  // console.log("Data Login", data);

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(data.password === data.Confirmpassword){
      const dataresponse = await fetch(summaryApi.SignUp.url, {
        method: summaryApi.SignUp.method,
        headers: {
          "content-type": "application/json",
  
        },
        body: JSON.stringify(data)
      });
  
      const dataApi = await dataresponse.json();
      if(dataApi.success){
        toast.success(dataApi.message);
        navigate('/login');
      }
      else{
        toast.error(dataApi.message);
      }
    }else{
      toast.error("please check confirm password")
    }

    
  }

  return (
    <section id='SignUp'>
      <div className='mx-auto container p-4'>

        <div className='bg-white p-4 py-4 w-full max-w-md mx-auto'>
          <div className='w-20 h-20 mx-auto bg-white relative overflow-hidden rounded-full'>
            <div>
              <img className='' src={data.profilePic || loginIcon} alt='login-icon' />
            </div>
            <form>
              <label>
                <div className='text-xs bg-opacity-80 bg-slate-200 py-4 cursor-pointer text-center absolute bottom-0 w-full '>
                  Upload Photo
                </div>
                <input type='file' className='hidden' onChange={handleUploadPic} />
              </label>
            </form>
          </div>
          <form className='pt-6 flex flex-col gap-3' onSubmit={handleSubmit}>
            <div className='grid'>
              <label>Name:</label>
              <div className='bg-slate-100 p-2'>
                <input type='text' name='name' value={data.name} onChange={handleOnchange} className='w-full h-full outline-none bg-transparent' placeholder='Enter Name' required />
              </div>
            </div>
            <div className='grid'>
              <label>Email:</label>
              <div className='bg-slate-100 p-2'>
                <input type='email' name='email' value={data.email} onChange={handleOnchange} className='w-full h-full outline-none bg-transparent' placeholder='Enter Email' required />
              </div>
            </div>

            <div>
              <label>Password:</label>
              <div className='bg-slate-100 p-2 flex'>
                <input type={ShowPassword ? "text" : "password"} name='password' value={data.password} onChange={handleOnchange} className='w-full h-full outline-none bg-transparent' placeholder='Enter Password' required />
                <div className='flex items-center cursor-pointer' onClick={() => SetshowPassword((preve) => !preve)}>
                  {
                    ShowPassword ? (<IoEye />) : (<IoIosEyeOff />)
                  }
                </div>
              </div>
            </div>
            <div >
              <label>Confirm Password:</label>
              <div className='bg-slate-100 p-2 flex'>
                <input type={ShowConfirmPassword ? "text" : "password"} name='Confirmpassword' value={data.Confirmpassword} onChange={handleOnchange} className='w-full h-full outline-none bg-transparent' placeholder='Re-Enter Password' required />
                <div className='flex items-center cursor-pointer' onClick={() => SetshowConfirmPassword((preve) => !preve)}>
                  {
                    ShowConfirmPassword ? (<IoEye />) : (<IoIosEyeOff />)
                  }
                </div>
              </div>
            </div>

            <button className='bg-red-600 text-white w-full  px-6 py-2 rounded-full max-w-[120px] hover:scale-110 transistion-all mx-auto block mt-3'>Sign Up</button>
          </form>
          <p className='my-5'>Already have account? <Link to={'/login'} className='text-red-600 hover:underline hover:text-red-700'>Login</Link></p>
        </div>


      </div>
    </section>
  )
}

export default SignUp