import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import Bank from "layouts/bank";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

import ShowChartIcon from "@mui/icons-material/ShowChart";
import Stock from "layouts/stock";
import Crypto from "layouts/crypto";

// @mui icons
import Icon from "@mui/material/Icon";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Leaderboard",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Bank",
    key: "bank",
    icon: <AccountBalanceIcon />,
    route: "/bank",
    component: <Bank />,
  },
  {
    type: "collapse",
    name: "Stock",
    key: "stock",
    icon: <ShowChartIcon />,
    route: "/stock",
    component: <Stock />,
  },
  {
    type: "collapse",
    name: "Crypto",
    key: "crypto",
    icon: <MonetizationOnIcon />,
    route: "/crypto",
    component: <Crypto />,
  },
  {
    type: "hidden",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/",
    component: <SignIn />,
  },
  {
    type: "hidden",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/sign-up",
    component: <SignUp />,
  },
];

export default routes;
