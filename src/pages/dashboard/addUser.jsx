import { MessageCard } from "@/widgets/cards";
import {
  Button,
  Typography,
} from "@material-tailwind/react";

import { UserApi } from "@/data";
import { useEffect, useState } from "react";
import UserForm from "@/widgets/cards/userForm";
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import default styles
 
export function AddUser() {
  const [listUsers, setListUsers] = useState([]);
  const baseURL = "localhost";
  const basePort = 3000;
  const deleteUserPath = "/deleteUser";

  useEffect(() => {
    UserApi().then((result) => {
      setListUsers(result);
      console.log(listUsers);
    })
  }, []);

  // Function to handle deleting a user
  const deleteUser = async (username) => {
    try {
      const response = await fetch(`http://${baseURL}:${basePort}${deleteUserPath}/${username}`, {
        method: 'DELETE',
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
  };

  return (
    <div className="justify-center mx-auto mt-4 md:mt-8 block md:flex bg-white shadow-none md:shadow-sm rounded-lg">
    
      <UserForm />

      <div className="bg-white w-full my-5 md:my-0 md:w-1/2 p-4 md:p-8 rounded-lg">
        <Typography variant="h4" color="blue-gray" className="mb-2 text-center">
          List User
        </Typography>
        <Typography color="gray" className="mb-3 md:mb-6 font-normal text-center">
        Nice to meet you! Enter your details to register.
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
      {/* <ToastContainer position="top-center" theme="colored"/> */}
    </div>
      
  );
}

export default AddUser;