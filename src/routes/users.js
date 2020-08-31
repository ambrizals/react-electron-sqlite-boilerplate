import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashboardPages from "../pages/users/dashboard";

class UserRoute extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/">
            <DashboardPages />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default UserRoute;
