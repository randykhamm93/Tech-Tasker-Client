import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { WorkOrderList } from "../components/work_orders/WorkOrderList";
import { WorkOrderDetails } from "../components/work_orders/WorkOrderDetails";


export const ApplicationViews = ({ token, setToken }) => {
    return (
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route element={<Authorized token={token} />} />

      <Route path="/work_orders">
        <Route index element={<WorkOrderList setToken={setToken} />} />
        <Route path="/work_orders/:workOrderId" element={<WorkOrderDetails setToken={setToken} isSupervisor={localStorage.getItem("is_supervisor") === "true"}/>} />
      </Route>


    </Routes>
  );
};
