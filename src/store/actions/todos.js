import types from "../types";

export const getData = () => ({
  type: types.todos.getTodos,
});

export const receivedData = (data) => ({
  type: types.todos.receivedTodos,
  payload: data,
});
