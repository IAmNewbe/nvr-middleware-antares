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

import team1 from "/img/logo-atlassian.svg";
import { TaskApi } from "@/data";
import { data } from "autoprefixer";
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; 

const ListTask = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const baseUrl = "localhost";
  const baseport = 3000;
  const deleteTaskPath = "/deleteTaskById";
  const runTaskPath = "/runTaskById";
  useEffect(() => {
    TaskApi().then((result) => {
      setData(result);
      setLoading(false);
    })
  }, []);

  const handleRunTask = async (taskId) => {
    try {
      const response = await fetch(`http://${baseUrl}:${baseport}${runTaskPath}/${taskId}`, {
        method: 'POST',
      });
      const result = await response.json();
      if (response.ok) {
        // Optionally update the UI with the task status
        console.log('Task started successfully:', result);
      } else {
        console.error('Error starting task:', result);
      }
    } catch (error) {
      console.error('Error in run task:', error);
    }
  };

  const handleDeleteTask = async (taskId, name) => {
    try {
      const response = await fetch(`http://${baseUrl}:${baseport}${deleteTaskPath}/${taskId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        // Remove the deleted task from the state
        setData(data.filter((task) => task.id !== taskId));
        console.log(`Task ${name}  deleted successfully`);
        toast.success(`Task ${name} deleted successfully!`);
      } else {
        console.error('Error deleting task:');
      }
    } catch (error) {
      console.error('Error in delete task:', error);
    }
  };
  
  return (
    <>
      <Card className=" xl:col-span-2 shadow-sm">
          <CardHeader variant="gradient" className="mb-8 p-6 bg-orange-700">
            <Typography variant="h6" color="white">
              Task List
            </Typography>
          </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Task Name", "Interval Port", "Status", "Employed", "Action"].map((el) => (
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
                ({ id, name, server, port, online, updated_at, send_interval }, key) => {
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
                          {send_interval} sec
                        </Typography>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {port}
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
                        {
                          new Date(updated_at).toLocaleString('en-ID', {
                            month: 'long',   // Full month name
                            day: '2-digit',  // Day with leading zero
                            year: 'numeric', // Full year
                            hour: '2-digit', // Hour (12-hour clock)
                            minute: '2-digit', // Minute with leading zero
                            second: '2-digit', // Second with leading zero
                            hour12: false    // Use 12-hour AM/PM format
                          })
                        }
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
                          onClick={() => handleRunTask(id)}
                        >
                          Run
                        </Typography>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold mx-1 text-red-600"
                          onClick={() => handleDeleteTask(id, name)}
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