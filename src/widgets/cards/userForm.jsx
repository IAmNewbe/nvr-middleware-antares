
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option
} from "@material-tailwind/react";

import { useEffect, useState } from "react";

export function UserForm() {
  const baseUrl = "localhost";
  const baseport = 3000;
  const addUserPath = '/postUserById';
  const [newUserData, setNewUserData] = useState({
    username: "",
    email: "",
    password: "",
    role: "", 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUserData({
     ...newUserData,
      [name]: value
    });
  }

  const postData = async (e) => {
    e.preventDefault();

    const postUrl = `http://${baseUrl}:${baseport}${addUserPath}`;

    
  }


  return (
    <Card color="white" shadow={false} className="p-4 md:p-8 w-full md:w-1/2">
      <Typography variant="h4" color="blue-gray" className="text-center">
       Add New User
      </Typography>
      <Typography color="gray" className="mt-1 font-normal text-center">
        Nice to meet you! Enter your details to register.
      </Typography>
      <form className="mt-8 mb-2 w-full">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Name
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <Input
            type="password"
            size="lg"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />

          
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Role
          </Typography>
          <Select color="black" size="lg" label="Select Role">
            <Option value="admin">Admin</Option>
            <Option value="user">User</Option>
          </Select>
        </div>
        <Button className="mt-6" fullWidth>
          Add New User
        </Button>
      </form>
    </Card>
  )
}

export default UserForm;