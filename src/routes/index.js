import { connect } from "react-redux";
import RoutesContainer from "./container";
import types from "../store/types";

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => {
      dispatch({ type: types.users.login });
    },
    logout: () => {
      dispatch({ type: types.users.logout });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoutesContainer);
