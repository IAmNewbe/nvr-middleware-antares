import { MessageCard } from "@/widgets/cards";
import {
  Button,
  Typography,
} from "@material-tailwind/react";

import { UserApi } from "@/data";
import { useEffect, useState } from "react";
import UserForm from "@/widgets/cards/userForm";
 
export function AddUser() {
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    UserApi().then((result) => {
      setListUsers(result);
      console.log(listUsers);
    })
  }, []);

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
                <Button variant="text" size="sm">
                  Delete
                </Button>
              }
            />
          ))}
        </ul>
      </div>
    </div>
      
  );
}

export default AddUser;