import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Chip,
  Progress,
  iconButton,
} from "@material-tailwind/react";

import team1 from "/img/team-1.jpeg";
import { TaskApi } from "@/data";
import { data } from "autoprefixer";

const ListTask = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    TaskApi().then((result) => {
      setData(result);
      setLoading(false);
    })
  }, []);
  
  return (
    <>
      <Card className=" xl:col-span-2 border border-blue-gray-100 shadow-sm">
          <CardHeader variant="gradient" className="mb-8 p-6 bg-orange-700">
            <Typography variant="h6" color="white">
              Task List
            </Typography>
          </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Task Name", "Interval", "Status", "Employed", "Action"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map(
                ({ id, name, user, server, online, created_at }, key) => {
                  const className = `py-3 px-5 ${
                    key === data.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={team1} alt={name} size="sm" variant="rounded" />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {name}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {server}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          idk
                        </Typography>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          hadeuh
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={online ? "green" : "blue-gray"}
                          value={online ? "online" : "offline"}
                          className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        />
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {created_at}
                        </Typography>
                      </td>
                      <td className= {" " + className}>
                        <div className="flex">
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold mx-1 text-green-700"
                        >
                          Edit
                        </Typography>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold mx-1 text-blue-gray-600"
                        >
                          Stop
                        </Typography>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold mx-1 text-red-600"
                        >
                          Delete
                        </Typography>
                        </div>
                        
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </>
  )
}

export default ListTask;