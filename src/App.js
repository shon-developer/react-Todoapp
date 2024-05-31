import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";

function App() {
  const [newTask, setNewTask] = useState("");
  const [todoList, setTodoList] = useState([]);
  // addTask
  const addTask = (e) => {
    e.preventDefault();
    if (!newTask) {
      alert("Enter a task");
    } else {
      let task = {
        id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
        taskName: newTask,
        completed: false,
      };
      let newTodoList = [...todoList, task];
      setTodoList(newTodoList);
      setNewTask("");
    }
  };
  // clearTask
  const clearTask = (id) => {
    let newTodoList = todoList.filter((item) => {
      return item.id !== id;
    });
    setTodoList(newTodoList);
  };

  //editTask
  const editTask = (id) => {
    let changeTask = todoList.find((item) => {
      return item.id === id;
    });
    let newTodoList = todoList.filter((item) => {
      return item.id !== id;
    });
    setNewTask(changeTask.taskName);
    setTodoList(newTodoList);
  };

  // isComplete
  const isComplete = (id) => {
    setTodoList(todoList.map((item) => {
      if (item.id === id) {
        return { ...item, completed: true };
      } else {
        return item;
      }
    }))
  };

  return (
    <div className="bg-[#111111] text-gray-300 min-h-screen flex flex-col gap-6 pt-24 items-center justify-start">
      <h1 className="text-5xl text-cyan-500 pb-10">Todo App</h1>
      <form className="flex gap-4">
        <input
          type="text"
          placeholder="enter your task"
          value={newTask}
          onChange={(e) => {
            setNewTask(e.target.value);
          }}
          className="bg-gray-700 text-white px-4 py-2 w-[300px] rounded-md border-none outline-none tracking-wider"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-cyan-500 rounded-md text-black"
        >
          Add
        </button>
      </form>
      <div>
        {todoList &&
          todoList.map((item, index) => {
            return (
              <div className="flex w-[400px] justify-between">
                <h1
                  className={`text-xl ${
                    item.completed
                      ? "line-through text-green-500"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {index + 1} {item.taskName}
                </h1>
                <div className="flex gap-2">
                  <DoneIcon
                    onClick={() => {
                      isComplete(item.id);
                    }}
                    className="text-green-500 hover:text-green-300 cursor-pointer"
                  />
                  <EditIcon
                    onClick={() => {
                      editTask(item.id);
                    }}
                    className="text-blue-500 hover:text-blue-300 cursor-pointer"
                  />
                  <ClearIcon
                    onClick={() => {
                      clearTask(item.id);
                    }}
                    className="text-red-500 hover:text-red-300 cursor-pointer"
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
