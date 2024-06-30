import React, { useContext, useState } from 'react';
import loginIcon from '../assest/signin.gif';
import { IoEye } from "react-icons/io5";
import { IoIosEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import summaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';



const ForgotPassword = () => {
  const [ShowPassword, SetshowPassword] = useState(false);
  const [ShowConfirmPassword, SetshowConfirmPassword] = useState(false);
  const [data, setdata] = useState({
    email: '',
    password: '',
    Confirmpassword: '',
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
  
  // console.log("Data Login", data);

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(data.password === data.Confirmpassword){
      const dataresponse = await fetch(summaryApi.UpdatePassword.url, {
        method: summaryApi.UpdatePassword.method,
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
    <section id='Forget'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-4 py-4 w-full max-w-md mx-auto'>
          <h1 className='text-2xl font-bold text-red-600 text-center'>Forget-Password</h1>
        <form className='pt-6 flex flex-col gap-3' onSubmit={handleSubmit}>
            
            <div className='grid'>
              <label>Email:</label>
              <div className='bg-slate-100 p-2'>
                <input type='email' name='email' value={data.email} onChange={handleOnchange} className='w-full h-full outline-none bg-transparent' placeholder='Enter Email' required />
              </div>
            </div>

            <div>
              <label>New Password:</label>
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
              <label>Re-enter Password:</label>
              <div className='bg-slate-100 p-2 flex'>
                <input type={ShowConfirmPassword ? "text" : "password"} name='Confirmpassword' value={data.Confirmpassword} onChange={handleOnchange} className='w-full h-full outline-none bg-transparent' placeholder='Re-Enter Password' required />
                <div className='flex items-center cursor-pointer' onClick={() => SetshowConfirmPassword((preve) => !preve)}>
                  {
                    ShowConfirmPassword ? (<IoEye />) : (<IoIosEyeOff />)
                  }
                </div>
              </div>
            </div>

            <button className='bg-red-600 text-white w-full  px-6 py-2 rounded-full max-w-[200px] hover:scale-110 transistion-all mx-auto block mt-3'>Update Password</button>
          </form>
          
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword
