import types from "../types";

const initState = {
  data: null,
  isLoad: false,
};

const todos = (state = initState, action) => {
  switch (action.type) {
    case types.todos.getTodos:
      return {
        ...state,
        isLoad: true,
      };

    case types.todos.receivedTodos:
      return {
        ...state,
        data: action.payload,
        isLoad: false,
      };

    case "CLEAN_UP":
      return {
        ...state,
        data: null,
        isLoad: false,
      };

    default:
      return state;
  }
};

export default todos;
