import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LoginForm from './components/login/login';
import SignUp from './components/signup/signup';
import DashBoard from './components/dashboard/dashboard';
import Createstaff from './components/staff/staff';
import Updatestaff from './components/staff/staff_upd';
import StaffDetail from './components/staff/Staff_read1';
import StaffList from './components/staff/Staff_read';
import CustomerOrders from './components/reports/report1';
import ProductSupplierList from './components/reports/report2';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Staff1 from './components/staff/staff1';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm/>,
  },
  {
    path: "/login",
    element: <LoginForm/>,
  },
  {
    path:"/signup",
    element: <SignUp/>
  },
  {
    path: "/dashboard",
    element: <DashBoard/>
  },
  {
    path: "/Staff",
    element: <Staff1/>
  },
  {
    path: "/Staff/update",
    element: <Updatestaff/>
  },
  {
    path: "/Staff/list",
    element: <StaffList/>
  },
  {
    path: '/Staff/:staffId',
    element: <StaffDetail />, // Add a route for StaffDetail
  },
  {
    path: '/staff/create',
    element: <Createstaff/>,
  },
  {
    path: '/Customerorder',
    element: <CustomerOrders/>
  },
  {
    path: '/Productsupplier',
    element: <ProductSupplierList/>
  }
  

]);



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
