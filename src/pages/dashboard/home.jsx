import React, { useState, useEffect } from "react";
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
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
  CloudArrowUpIcon,
  CloudIcon,
  ArrowUpCircleIcon
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";
import { ArrowDownCircleIcon, ArrowDownIcon, ArrowUpOnSquareStackIcon, CheckCircleIcon, ClockIcon, CloudArrowDownIcon, } from "@heroicons/react/24/solid";
import { TaskApi } from "@/data";
import ListTask from "./listTask";
import ListUser from "@/widgets/cards/listUser";

export function Home() {
  const [data, setData] = React.useState([]);
  const [totalRequest, setTotalRequest] = useState(2680);
  const [totalFailed, setTotalFailed] = useState(100);
  const [totalTask, setTotalTask] = useState(0);
  const [totalInActiveTask, setTotalInActiveTask] = useState(0);
  const [totalActiveTask, setTotalActiveTask] = useState(0);
  const [loading, setLoading] = useState(true); // State to track loading
  const [serverCount, setServerCount] = useState();

  useEffect(() => {
    TaskApi().then((result) => {
      setData(result);
      setLoading(false);
      setTotalRequest(result.reduce((sum, task) => sum + task.success, 0));
      setTotalFailed(result.reduce((sum, task) => sum + task.failed, 0));
      setTotalTask(result.length);
      setTotalInActiveTask(result.reduce((sum, task) => sum + (task.status == 0), 0));
      setTotalActiveTask(result.reduce((sum, task) => sum + (task.status == 1), 0));

      // Count occurrences of each server
      const serverCount = result.reduce((acc, task) => {
        acc[task.server] = (acc[task.server] || 0) + 1;
        return acc;
      }, {});

      // Find the most common server count
      const mostCommonServerCount = Math.max(...Object.values(serverCount));

      setServerCount(mostCommonServerCount);
      })

      
  }, []);
  
  return (
    <div className="mt-12">
      <div className="mb-8 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        
        <StatisticsCard
          key="Total Request"
          value={totalRequest}
          title="Total Requests"
          icon={React.createElement(CloudArrowUpIcon, {
            className: "w-6 h-6 text-white",
          })}
          footer={ 
            <Typography className="font-normal text-blue-gray-600">
              <strong className="text-green-600">{Math.round((totalRequest-totalFailed)*100/totalRequest)}%</strong>
              &nbsp;success rate requests
            </Typography>
          }
        />
        <StatisticsCard
          key="Total Tasks"
          value={totalTask}
          title="Total Tasks"
          icon={React.createElement(ChartBarIcon, {
            className: "w-6 h-6 text-white",
          })}
          footer={ 
            <Typography className="font-normal text-blue-gray-600">
              <strong className="text-green-500">{serverCount}</strong>
              &nbsp;tasks have the same server
            </Typography>
          }
        />
        <StatisticsCard
          key="Active Tasks"
          value={totalActiveTask}
          title="Active Tasks"
          icon={React.createElement(ArrowUpIcon, {
            className: "w-6 h-6 text-white",
          })}
          footer={ 
            <Typography className="font-normal text-blue-gray-600">
              <strong className="text-red-500">{totalInActiveTask}</strong>
              &nbsp;tasks is stopped
            </Typography>
          }
        />

        <StatisticsCard
          key="Success Requests"
          value={totalRequest-totalFailed}
          title="Success Requests"
          icon={React.createElement(ArrowUpCircleIcon , {
            className: "w-6 h-6 text-white",
          })}
          footer={ 
            <Typography className="font-normal text-blue-gray-600">
              <strong className="text-red-500">{totalFailed}</strong>
              &nbsp;failed Requests
            </Typography>
          }
        />
       
      </div>
      {/* <div className="mb-6 md:mb-10 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div> */}
      <div className="mb-4 mt-10 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Projects
              </Typography>
              <Typography
                variant="small"
                className="flex items-center gap-1 font-normal text-blue-gray-600"
              >
                <CheckCircleIcon strokeWidth={3} className="h-4 w-4 text-blue-gray-200" />
                <strong>30 done</strong> this month
              </Typography>
            </div>
            <Menu placement="left-start">
              <MenuHandler>
                <IconButton size="sm" variant="text" color="blue-gray">
                  <EllipsisVerticalIcon
                    strokeWidth={3}
                    fill="currenColor"
                    className="h-6 w-6"
                  />
                </IconButton>
              </MenuHandler>
              <MenuList>
                <MenuItem>Action</MenuItem>
                <MenuItem>Another Action</MenuItem>
                <MenuItem>Something else here</MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["companies", "members", "budget", "completion"].map(
                    (el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-6 text-left"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {projectsTableData.map(
                  ({ img, name, members, budget, completion }, key) => {
                    const className = `py-3 px-5 ${
                      key === projectsTableData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={name}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Avatar src={img} alt={name} size="sm" />
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {name}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          {members.map(({ img, name }, key) => (
                            <Tooltip key={name} content={name}>
                              <Avatar
                                src={img}
                                alt={name}
                                size="xs"
                                variant="circular"
                                className={`cursor-pointer border-2 border-white ${
                                  key === 0 ? "" : "-ml-2.5"
                                }`}
                              />
                            </Tooltip>
                          ))}
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {budget}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="w-10/12">
                            <Typography
                              variant="small"
                              className="mb-1 block text-xs font-medium text-blue-gray-600"
                            >
                              {completion}%
                            </Typography>
                            <Progress
                              value={completion}
                              variant="gradient"
                              color={completion === 100 ? "green" : "blue"}
                              className="h-1"
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
        </Card> */}

        <ListTask />

        <div className="px-4 py-6 bg-white rounded-xl shadow-sm">
          <ListUser size="h5"/>
        </div>
        
        
        {/* <Card className="shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6"
          >
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Activities Overview
            </Typography>
            <Typography
              variant="small"
              className="flex items-center gap-1 font-normal text-blue-gray-600"
            >
              <ArrowUpIcon
                strokeWidth={3}
                className="h-3.5 w-3.5 text-green-500"
              />
              <strong>24%</strong> this month
            </Typography>
          </CardHeader>
          <CardBody className="pt-0">
            {ordersOverviewData.map(
              ({ icon, color, title, description }, key) => (
                <div key={title} className="flex items-start gap-4 py-3">
                  <div
                    className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${
                      key === ordersOverviewData.length - 1
                        ? "after:h-0"
                        : "after:h-4/6"
                    }`}
                  >
                    {React.createElement(icon, {
                      className: `!w-5 !h-5 ${color}`,
                    })}
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-medium"
                    >
                      {title}
                    </Typography>
                    <Typography
                      as="span"
                      variant="small"
                      className="text-xs font-medium text-blue-gray-500"
                    >
                      {description}
                    </Typography>
                  </div>
                </div>
              )
            )}
          </CardBody>
        </Card> */}
      </div>
    </div>
  );
}

export default Home;
