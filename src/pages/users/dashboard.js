import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../store/actions";
import TodoTable from "../../components/users/dashboard/todoTable";

const electron = window.require("electron");
const { ipcRenderer } = electron;

const dbTrx = ({ model, method, param }) =>
  ipcRenderer.sendSync("dbTrx", { model, method, param });

const DashboardPages = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.users);
  // const todoState = useSelector((state) => state.todos);

  const [todos, setTodos] = useState();
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    todosData();
  }, []);

  const todosData = () => {
    // setTodos(null);
    const data = dbTrx({
      model: "todos",
      method: "getData",
      param: null,
    });
    if (data.length > 0) {
      setTodos(data);
    } else {
      setTodos();
    }
  };

  const tambahSetting = async (e) => {
    e.preventDefault();
    if (name.length > 0 && value.length > 0) {
      await dbTrx({
        model: "todos",
        method: "insertData",
        param: {
          name,
          value,
        },
      });
    }
    todosData();
    setName("");
    setValue("");
  };

  const deleteData = async (id) => {
    await dbTrx({
      model: "todos",
      method: "deleteData",
      param: {
        id,
      },
    });

    todosData();
  };

  return (
    <div id="DashboardPages">
      <p>Halo {userState.users.username}</p>
      <button onClick={() => dispatch(actions.users.processSignOut())}>
        Logout
      </button>
      <TodoTable removeData={deleteData} todos={todos} />

      <form onSubmit={tambahSetting}>
        <label>
          Nama :
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Value :
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </label>
        <input type="submit" value="Tambah" />
      </form>
    </div>
  );
};

export default DashboardPages;
