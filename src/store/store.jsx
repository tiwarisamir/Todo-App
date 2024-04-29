import { createContext, useEffect, useState } from "react";
import { server } from "../main";
import axios from "axios";
import toast from "react-hot-toast";

export const Context = createContext({
  isAuthenticated: false,
  loading: false,
  user: {},
  login: () => {},
  logout: () => {},
  register: () => {},
});

const contextReducer = (currentContext, action) => {};

const ContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setloading] = useState(false);
  const [user, setuser] = useState({});
  const [refresh, setrefresh] = useState(false);

  const login = async (email, password) => {
    setloading(true);

    try {
      const { data } = await axios.post(
        `${server}users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setIsAuthenticated(true);
      setloading(false);
      setrefresh(!refresh);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setloading(false);
    }
  };

  const register = async (name, email, password) => {
    setloading(true);
    try {
      const { data } = await axios.post(
        `${server}users/new`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setIsAuthenticated(true);
      setloading(false);
      setrefresh(!refresh);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setloading(false);
    }
  };

  const logout = async () => {
    setloading(true);
    try {
      const { data } = await axios.get(`${server}users/logout`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setIsAuthenticated(false);
      setloading(false);
      setrefresh(!refresh);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setloading(false);
    }
  };

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
  }, [refresh]);

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setloading,
        user,
        setuser,
        login,
        register,
        logout,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
