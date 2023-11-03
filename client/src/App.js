import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Component/Auth/Login';
import Signup from './Component/Auth/Signup';
import DepartmentForm from './Component/Department/DepartmentForm';
import DepartmentList from './Component/Department/DepartmentList';
import EmployeeList from './Component/Employee/EmployeeList';
import EmployeeDetails from './Component/Employee/EmployeeDetail';
import EmployeeFilter from './Component/Employee/EmployeeFiter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Pages/user/Dashboard';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import PrivateRoute from './Component/ProtectedRoute/Route';
import AdminRoutes from './Component/ProtectedRoute/AdminRoutes';
import Createdepartment from './Pages/Admin/CreateDepartment';
import AllEmployees from './Pages/Admin/AllEmployees';
import Search from './Pages/Search';
import DepartmentwiseEmployee from './Pages/DepartmentEmployees';

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<Search />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/dashboard" element={<PrivateRoute />} >
          <Route path="user" element={<Dashboard />} />
          {/* <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/order" element={<Orders />} /> */}
        </Route>
        <Route path="/dashboard" element={<AdminRoutes />} >
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-department" element={<Createdepartment />} />
          <Route path="admin/employee" element={<AllEmployees />} />
          {/* <Route path="admin/create-products" element={<CreateProdusts />} /> */}
          {/*<Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/products" element={<AllProducts />} />
          <Route path="admin/orders" element={<AdminOrders />} /> */}
        </Route>
        <Route path="/employee/:id" element={<EmployeeDetails />} />
        <Route path="/filter" element={<EmployeeFilter />} />
        <Route path="/department/:slug" element={<DepartmentwiseEmployee />} />
        <Route path="/create-department" element={<DepartmentForm />} />
        <Route path="/edit-department/:id" element={<DepartmentForm />} />
      </Routes>
    </>
  );
}

export default App;
