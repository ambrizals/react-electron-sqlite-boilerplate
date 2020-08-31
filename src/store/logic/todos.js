import { createLogic } from "redux-logic";
import types from "../types";
import actions from "../actions";

const electron = window.require("electron");
const { ipcRenderer } = electron;

const dbTrx = ({ model, method, param }) =>
  ipcRenderer.sendSync("dbTrx", { model, method, param });

const getData = createLogic({
  name: types.todos.getTodos,
  type: types.todos.getTodos,
  latest: true,
  warnTimeout: 15000,

  processOptions: {
    dispatchReturn: true,
  },

  async process({ action }, dispatch, done) {
    const data = await dbTrx({
      model: "todos",
      method: "getData",
      param: null,
    });
    dispatch(actions.todos.receivedData(data));
    done();
  },
});

export default [getData];
