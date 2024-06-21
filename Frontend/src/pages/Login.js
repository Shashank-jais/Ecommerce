import React, { useContext, useState } from 'react';
import loginIcon from '../assest/signin.gif';
import { IoEye } from "react-icons/io5";
import { IoIosEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import summaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const { fetchuserdetails, fetchUserAddCart } = useContext(Context)

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(summaryApi.SignIn.url, {
            method: summaryApi.SignIn.method,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        const dataApi = await response.json();

        if (dataApi.success) {
            toast.success(dataApi.message);
            fetchuserdetails()
            fetchUserAddCart()
            navigate('/');
        } else {
            toast.error(dataApi.message);
        }

    };

    return (
        <section id='login'>
            <div className='mx-auto container p-4'>
                <div className='bg-white p-4 py-4 w-full max-w-md mx-auto'>
                    <div className='w-20 h-20 mx-auto bg-white'>
                        <img className='' src={loginIcon} alt='login-icon' />
                    </div>
                    <form className='pt-6 flex flex-col gap-3' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Email:</label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='email'
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'
                                    placeholder='Enter Email'
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label>Password:</label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name='password'
                                    value={data.password}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'
                                    placeholder='Enter Password'
                                    required
                                />
                                <div className='flex items-center cursor-pointer' onClick={() => setShowPassword((prev) => !prev)}>
                                    {showPassword ? <IoEye /> : <IoIosEyeOff />}
                                </div>
                            </div>
                            <Link to='/forgot-password' className='block w-fit ml-auto hover:underline hover:text-red-600'>
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            type='submit'
                            className='bg-red-600 text-white w-full px-6 py-2 rounded-full max-w-[120px] hover:scale-110 transition-all mx-auto block mt-3'
                        >
                            Login
                        </button>
                    </form>
                    <p className='my-5'>
                        Don't have an account? <Link to='/sign-up' className='text-red-600 hover:underline hover:text-red-700'>Sign Up</Link>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Login;
