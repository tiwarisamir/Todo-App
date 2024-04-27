import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { server } from "../main";
import toast from "react-hot-toast";
import TodoItems from "../components/TodoItems";
import { Context } from "../store/store";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { isAuthenticated } = useContext(Context);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setloading] = useState(false);
  const [tasks, settasks] = useState([]);
  const [refresh, setrefresh] = useState(false);

  const handleUpdate = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}tasks/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setrefresh(!refresh);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${server}tasks/${id}`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setrefresh(!refresh);
    } catch (error) {
      toast.success(error.response.data.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const { data } = await axios.post(
        `${server}tasks/new`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setDescription("");
      setTitle("");
      toast.success(data.message);
      setloading(false);
      setrefresh(!refresh);
    } catch (error) {
      toast.error(error.response.data.message);
      setloading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${server}tasks/my`, {
        withCredentials: true,
      })
      .then((res) => {
        settasks(res.data.tasks);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, [refresh]);

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={handleSubmit}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Title"
              required
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Description"
              required
            />

            <button disabled={loading} type="submit">
              Add Task
            </button>
          </form>
        </section>
      </div>

      <section className="todsContainer">
        {tasks.map((i) => (
          <TodoItems
            key={i._id}
            title={i.title}
            description={i.description}
            isCompleted={i.isCompleted}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            id={i._id}
          />
        ))}
      </section>
    </div>
  );
};

export default Home;
