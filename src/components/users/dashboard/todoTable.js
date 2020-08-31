import React, { useState, useEffect } from "react";

const TodoTable = ({ removeData, todos }) => {
  const [table, setTable] = useState(null);

  useEffect(() => {
    listData();
  }, [todos]);

  const listData = () => {
    let view = [];
    if (todos) {
      todos.forEach((element) => {
        view.push(
          <tr key={element.id}>
            <td>{element.name}</td>
            <td>{element.value}</td>
            <td>
              <button onClick={() => removeData(element.id)}>Delete</button>
            </td>
          </tr>
        );
      });
    } else {
      view.push(
        <tr key="404">
          <td colSpan="3">Tidak ada data</td>
        </tr>
      );
    }
    setTable(view);
  };

  return (
    <table>
      <thead>
        <tr>
          <td>Nama</td>
          <td>Value</td>
          <td>Aksi</td>
        </tr>
      </thead>
      <tbody>{table}</tbody>
    </table>
  );
};

export default TodoTable;
