import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]); // tasks ka state banaya
  const [taskName, setTaskName] = useState(""); // task ka naam input ke liye state
  const [taskDesc, setTaskDesc] = useState(""); // task ka description input ke liye state
  const [editingTaskId, setEditingTaskId] = useState(null); // kis task ko edit kar rahe hain, uska id
  const navigate = useNavigate(); // redirect ke liye useNavigate hook ka use kiya

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token"); // token ko localStorage se fetch kiya

      try {
        const response = await fetch(
          "https://w3villa-taskmanager-backend.onrender.com/api/tasks",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // token ko request headers me bheja
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setTasks(data); // tasks ko state me set kiya
        } else {
          console.error(
            "Tasks fetch karne me samasya hui:",
            await response.text()
          );
        }
      } catch (err) {
        console.error("Tasks fetch karne me error aaya:", err);
      }
    };

    fetchTasks(); // component mount hone par tasks ko fetch kiya
  }, []);

  const handleAddTask = async () => {
    if (taskName && taskDesc) {
      const token = localStorage.getItem("token"); // token ko localStorage se nikala
      try {
        const response = await fetch(
          "https://w3villa-taskmanager-backend.onrender.com/api/tasks",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`, // token ko request headers me include kiya
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: taskName, // task ka naam
              description: taskDesc, // task ka description
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setTasks([...tasks, data]); // naye task ko list me add kiya
          setTaskName(""); // form ko clear kiya
          setTaskDesc("");
          alert("Task safalta se add kiya gaya!");
        } else {
          console.error(
            "Task add karne me samasya hui:",
            await response.text()
          );
        }
      } catch (err) {
        console.error("Task add karne me error aaya:", err);
      }
    } else {
      alert("Kripya task ka naam aur description bharen.");
    }
  };

  const handleDelete = async (taskId) => {
    const token = localStorage.getItem("token"); // token ko localStorage se fetch kiya

    try {
      const response = await fetch(
        `https://w3villa-taskmanager-backend.onrender.com/api/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // request headers me token diya
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setTasks(tasks.filter((task) => task._id !== taskId)); // task ko list se hataya
      } else {
        console.error(
          "Task delete karne me samasya hui:",
          await response.text()
        );
      }
    } catch (err) {
      console.error("Task delete karne me error aaya:", err);
    }
  };

  const handleEdit = async () => {
    if (editingTaskId && taskName && taskDesc) {
      const token = localStorage.getItem("token"); // token ko localStorage se nikala

      try {
        const response = await fetch(
          `https://w3villa-taskmanager-backend.onrender.com/api/tasks/${editingTaskId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`, // request me token include kiya
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: taskName, // naye task ka naam
              description: taskDesc, // naye task ka description
            }),
          }
        );

        if (response.ok) {
          const updatedTask = await response.json();
          setTasks(
            tasks.map((task) =>
              task._id === editingTaskId ? updatedTask : task
            )
          );
          setEditingTaskId(null); // edit mode se bahar nikle
          setTaskName(""); // form ko clear kiya
          setTaskDesc("");
          alert("Task safalta se update kiya gaya!");
        } else {
          console.error(
            "Task update karne me samasya hui:",
            await response.text()
          );
        }
      } catch (err) {
        console.error("Task update karne me error aaya:", err);
      }
    } else {
      alert("Kripya task ka naam aur description bharen.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // localStorage se token hataya
    navigate("/login"); // login page par redirect kiya
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-purple-500 via-blue-600 to-teal-700 overflow-hidden">
      {/* Background glowing shapes */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-400 opacity-30 blur-2xl rounded-full z-0"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-fuchsia-400 opacity-30 blur-2xl rounded-full z-0"></div>

      {/* Logout Button */}
      <div className="fixed top-6 right-6 z-20">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300"
          onClick={handleLogout} // button par click hone par handleLogout call kiya
        >
          Logout
        </button>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto py-12 px-8">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-6xl font-extrabold text-white tracking-wide glow-on-hover drop-shadow-lg">
            Manage Your Tasks
          </h1>
        </div>

        {/* Form Section */}
        <div className="bg-white/10 backdrop-blur-md shadow-lg rounded-2xl p-8 border border-white/20 z-10">
          <h2 className="text-3xl font-bold text-white mb-6">
            {editingTaskId ? "Edit Task" : "Add New Task"}
          </h2>
          <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
            <input
              type="text"
              className="w-full px-6 py-4 rounded-lg bg-white/40 text-white placeholder-gray-200 border-none shadow-inner focus:ring-4 focus:ring-purple-300 transition-transform transform hover:scale-105 focus:outline-none"
              placeholder="Task Name"
              value={taskName} // task name ko input me set kiya
              onChange={(e) => setTaskName(e.target.value)} // input ke value ko state me set kiya
            />
            <input
              type="text"
              className="w-full px-6 py-4 rounded-lg bg-white/40 text-white placeholder-gray-200 border-none shadow-inner focus:ring-4 focus:ring-purple-300 transition-transform transform hover:scale-105 focus:outline-none"
              placeholder="Task Description"
              value={taskDesc} // task description ko input me set kiya
              onChange={(e) => setTaskDesc(e.target.value)} // input ke value ko state me set kiya
            />
            <button
              className="px-6 py-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300"
              onClick={editingTaskId ? handleEdit : handleAddTask} // edit ya add task function ko call kiya
            >
              {editingTaskId ? "Update Task" : "Add Task"}
            </button>
          </div>
        </div>

        {/* Task Table */}
        <div className="mt-12 bg-white/10 backdrop-blur-md shadow-lg rounded-2xl p-8 border border-white/20 z-10">
          <h2 className="text-4xl font-bold text-white mb-8">Your Tasks</h2>
          {tasks.length === 0 ? (
            <p className="text-xl text-gray-300">
              Koi task uplabdh nahi hai. Ek task add karein!
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-white divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gradient-to-r from-indigo-600 to-purple-600">
                    <th className="p-6 text-left text-lg font-semibold tracking-wider uppercase">
                      Task Name
                    </th>
                    <th className="p-6 text-left text-lg font-semibold tracking-wider uppercase">
                      Description
                    </th>
                    <th className="p-6 text-left text-lg font-semibold tracking-wider uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {tasks.map((task) => (
                    <tr key={task._id}>
                      <td className="p-6 text-white">{task.name}</td>
                      <td className="p-6 text-white">{task.description}</td>
                      <td className="p-6 space-x-4">
                        <button
                          className="bg-yellow-400 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
                          onClick={() => {
                            setEditingTaskId(task._id);
                            setTaskName(task.name); // edit ke time par form me task ka naam set kiya
                            setTaskDesc(task.description); // description set kiya
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
                          onClick={() => handleDelete(task._id)} // delete button click hone par task delete kiya
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
