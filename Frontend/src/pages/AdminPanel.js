import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPanel = () => {
    const user = useSelector((state) => state?.user?.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user||user?.role !== ROLE.ADMIN) {
            navigate("/");
        }
    }, [user]);

    return (
        <div className='min-h-[calc(100vh-120px)] flex '>
            <aside className='bg-white min-h-full w-full max-w-60 customShadow'>
                <div className='h-36 flex justify-center flex-col items-center'>
                    <div className='cursor-pointer flex justify-center text-5xl'>
                        {user?.profilePic ? (
                            <img src={user?.profilePic} className='w-12 h-12 rounded-full' alt={user?.name} />
                        ) : (
                            <FaRegUserCircle />
                        )}
                    </div>
                    <p className='capitalize text-lg font-semibold'>{user?.name}</p>
                    <p className='capitalize text-sm'>{user?.role}</p>
                </div>
                <nav className='grid p-4'>
                    <Link to={"allUsers"} className="px-4 py-1 hover:bg-slate-100">All Users</Link>
                    <Link to={"allproducts"} className="px-4 py-1 hover:bg-slate-100">Products</Link>
                </nav>
            </aside>
            <main className='w-full h-full p-2 '>
                <Outlet />
            </main>
        </div>
    );
}

export default AdminPanel;
