import types from "../types";

export const processSignIn = () => ({
  type: types.users.login,
});

export const processSignOut = () => ({
  type: types.users.logout,
});
