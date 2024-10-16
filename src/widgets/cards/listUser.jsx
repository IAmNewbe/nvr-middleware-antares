import React, { useState, useEffect } from 'react';
import { UserApi } from "@/data";
import { Typography, Button } from '@material-tailwind/react';
import MessageCard from './message-card'; // Assuming you have MessageCard as a separate component
import Server from '@/data/conf';

const ListUser = ({size}) => {
  const [listUsers, setListUsers] = useState([]);
  const baseURL = Server.baseURL;
  const basePort = Server.basePort;
  const deleteUserPath = "/deleteUser";
  const token = localStorage.getItem('token');

  useEffect(() => {
    UserApi().then((result) => {
      setListUsers(result);
      console.log(listUsers);
    })
  }, []);

  // Function to handle deleting a user
  const deleteUser = async (username) => {
    const confirmLogout = window.confirm("Are you sure want to Delete this User?");

    if (confirmLogout) {
      try {
        const response = await fetch(`http://${baseURL}:${basePort}${deleteUserPath}/${username}`, {
          method: 'DELETE',
          Authorization: `Bearer ${token}`,
        });
  
        if (response.ok) {
          // If successful, remove user from the state
          setListUsers(listUsers.filter(user => user.username !== username));
          toast.success(`User ${username} deleted successfully!`);
        } else {
          toast.error(`Failed to delete user: ${username}`); 
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Error deleting user.');
      }
    }
  };

  return (
    <div className=''>
      <Typography variant={size} color="blue-gray" className="mb-2 text-center">
        List User
      </Typography>
      <Typography color="gray" className="mb-3 md:mb-6 font-normal text-center">
        Admin role able to add new users or delete users 
      </Typography>
      <ul className="flex flex-col gap-6">
        {listUsers.map((props) => (
          <MessageCard
            key={props.username}
            {...props}
            action={
              <Button variant="text" size="sm" onClick={() => deleteUser(props.username)}>
                Delete
              </Button>
            }
          />
        ))}
      </ul>
    </div>
  );
};

export default ListUser;
