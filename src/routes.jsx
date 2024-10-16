import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  UserGroupIcon,
  ServerIcon
} from "@heroicons/react/24/solid";
import { Home, AddTask, Tables, AddUser, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import { element } from "prop-types";
import EditTask from "./widgets/cards/editTask";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    style: "",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <ServerStackIcon {...icon} />,
        name: "Add Task",
        path: "/addtask",
        element: <AddTask />,
      },
      {
        icon: <ServerIcon {...icon} />,
        name: "Edit Task",
        path: "/home/edit-task/:id",
        element: <EditTask />,
        style: 'hidden',
      },
      {
        icon: <ServerIcon {...icon} />,
        name: "Edit Task",
        path: "/tasklist/edit-task/:id",
        element: <EditTask />,
        style: 'hidden',
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Task List",
        path: "/tasklist",
        element: <Tables />,
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "Add User",
        path: "/adduser",
        element: <AddUser />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
        style: 'hidden',
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    style: "hidden",
    pages: [
      {
        icon: <UserCircleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
