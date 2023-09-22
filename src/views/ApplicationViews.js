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
import { MyWorkOrders } from "../components/work_orders/MyWorkOrders";
import { EditMyProfile } from "../components/profiles/EditMyProfile";

export const ApplicationViews = ({ token, setToken }) => {
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
        path="/employees/edit/:employeeId"
        element={<EditMyProfile setToken={setToken} />}
      />

      <Route
        path="/work_orders"
        element={<Authorized token={token} />}
      >
        <Route index element={<WorkOrderList setToken={setToken} />} />
        <Route
          path="/work_orders/:workOrderId"
          element={<WorkOrderDetails setToken={setToken} />}
        />
        <Route
          path="/work_orders/create"
          element={<CreateWorkOrderForm setToken={setToken} />}
        />
        <Route
          path="/work_orders/edit/:workOrderId"
          element={<EditWorkOrderForm setToken={setToken} />}
        />
        <Route
        path="/work_orders/my_work_orders"
        element={<MyWorkOrders setToken={setToken} />}
      />
      </Route>

      <Route path="/my_profile/:employeeId" element={<MyProfile token={token} />} />

      <Route path="/my_profile/edit/:employeeId" element={<EditMyProfile />} />

    </Routes>
  );
};
