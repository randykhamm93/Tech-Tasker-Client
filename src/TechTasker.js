import { useState, useEffect } from "react";
import { ApplicationViews } from "./views/ApplicationViews";
import { NavBar } from "./components/nav/NavBar";

export const TechTasker = () => {
  const [token, setTokenState] = useState(localStorage.getItem('auth_token'));
  const [isSupervisor, setIsSupervisor] = useState(localStorage.getItem('is_supervisor') === "true");

  const setToken = (newToken) => {
    localStorage.setItem('auth_token', newToken);
    setTokenState(newToken);
  };

  useEffect(() => {
    // Check if the user is a supervisor and update the state
    const userIsSupervisor = localStorage.getItem("is_supervisor") === "true";
    setIsSupervisor(userIsSupervisor);
  }, []);

  return (
    <>
      <NavBar token={token} setToken={setToken} isSupervisor={isSupervisor} />
      <ApplicationViews token={token} setToken={setToken} isSupervisor={isSupervisor} />
    </>
  );
};
