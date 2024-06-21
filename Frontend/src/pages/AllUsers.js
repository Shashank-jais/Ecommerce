import React, { useEffect, useState } from 'react';
import summaryApi from '../common';
import { toast } from 'react-toastify';
import { MdEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateUser, setOpenUpdateUser] = useState(false);
  const [updateUserDetail, setUpdateUserDetail] = useState({
    email: "",
    name: "",
    role: "",
    _id: ""
  });

  const fetchAllUsers = async () => {
    try {
      const fetchdata = await fetch(summaryApi.AllUser.url, {
        method: summaryApi.AllUser.method,
        credentials: "include"
      });
      const dataresponse = await fetchdata.json();
      if (dataresponse.success) {
        setAllUsers(dataresponse.data);
      }
      if (dataresponse.error) {
        toast.error(dataresponse.error);
      }
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  // const handleRoleChange = (userId, newRole) => {
  //   setAllUsers(allUsers.map(user => 
  //     user._id === userId ? { ...user, role: newRole } : user
  //   ));
  // };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div>
      <table className='w-full usertable'>
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              <td>
                <button 
                  className='bg-green-100 p-2 cursor-pointer rounded-full hover:bg-green-500 hover:text-white'
                  onClick={() => {
                    setUpdateUserDetail(user);
                    setOpenUpdateUser(true);
                  }}
                >
                  <MdEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {openUpdateUser && (
        <ChangeUserRole 
          onClose={() => setOpenUpdateUser(false)}
          name={updateUserDetail.name}
          email={updateUserDetail.email}
          role={updateUserDetail.role}
          userId={updateUserDetail._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
