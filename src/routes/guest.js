import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPages from "../pages/guest/login";

class GuestRoute extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/">
            <LoginPages />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default GuestRoute;
