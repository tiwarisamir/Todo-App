import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";

import ContextProvider, { Context } from "./store/store";
import { useContext, useEffect } from "react";
import axios from "axios";
import { server } from "./main";

function App() {
  const { setIsAuthenticated, setloading, setuser } = useContext(Context);

  useEffect(() => {
    setloading(true);
    axios
      .get(`${server}users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setuser(res.data.user);
        setIsAuthenticated(true);
        setloading(false);
      })
      .catch((error) => {
        setuser({});
        setIsAuthenticated(false);
        setloading(false);
      });
  }, []);

  return (
    <>
      <Header />
      <Outlet />
      <Toaster />
    </>
  );
}

function AppWrapper() {
  return (
    <ContextProvider>
      <App />
    </ContextProvider>
  );
}

export default AppWrapper;
