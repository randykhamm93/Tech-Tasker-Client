import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { WorkOrderList } from "../components/work_orders/WorkOrderList";
import { WorkOrderDetails } from "../components/work_orders/WorkOrderDetails";
import { EditWorkOrderForm } from "../components/work_orders/EditWorkOrderForm";
import { CreateWorkOrderForm } from "../components/work_orders/CreateWorkOrderForm";
import { EmployeeList } from "../components/employees/EmployeeList";
import { EmployeeProfile } from "../components/employees/EmployeeProfile";
import { MyProfile } from "../components/profiles/MyProfile";

export const ApplicationViews = ({ token, setToken, isSupervisor }) => {
  return (
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route element={<Authorized token={token} />} />

      <Route path="/employees" element={<EmployeeList setToken={setToken} />} />

      <Route
        path="/employees/:employeeId"
        element={<EmployeeProfile setToken={setToken} />}
      />

      <Route
        path="/work_orders"
        element={<Authorized token={token} />}
      >
        <Route index element={<WorkOrderList setToken={setToken} isSupervisor={isSupervisor} />} />
        <Route
          path="/work_orders/:workOrderId"
          element={<WorkOrderDetails setToken={setToken} isSupervisor={isSupervisor} />}
        />
        <Route
          path="/work_orders/create"
          element={<CreateWorkOrderForm setToken={setToken} />}
        />
        <Route
          path="/work_orders/edit/:workOrderId"
          element={<EditWorkOrderForm setToken={setToken} />}
        />
        
      </Route>
        <Route path="/my_profile" element={<MyProfile token={token} isSupervisor={isSupervisor} />} />
    </Routes>
  );
};
