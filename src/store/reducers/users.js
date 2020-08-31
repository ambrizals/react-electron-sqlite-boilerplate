import types from "../types";

const initState = {
  isLogin: false,
  token: null,
  users: null,
};

const users = (state = initState, action) => {
  switch (action.type) {
    case types.users.login:
      return {
        ...state,
        isLogin: true,
        token: "wkkwkwkwk",
        users: {
          id: 1,
          username: "coba",
        },
      };

    case types.users.logout:
      return {
        ...state,
        isLogin: false,
        token: null,
        users: null,
      };

    default:
      return state;
  }
};

export default users;
