import React from "react";
import UserRoute from "./users";
import GuestRoute from "./guest";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  Box,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import MinimizeIcon from "@material-ui/icons/Minimize";
import "../App.css";

const electron = window.require("electron");
const { remote } = electron;

class RoutesContainer extends React.Component {
  constructor() {
    super();
    this.classes = makeStyles((theme) => ({
      menuButton: {
        menuButton: theme.mixins.menuButton,
      },
    }));
    this.state = {
      windowHeight: 300,
    };
  }

  minimizeWindow() {
    remote.getCurrentWindow().minimize();
  }

  resizeWindow() {
    let window = remote.getCurrentWindow();
    if (!window.isMaximized()) {
      window.maximize();
    } else {
      window.unmaximize();
    }
  }

  exitWindow() {
    remote.getCurrentWindow().close();
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      windowHeight: window.innerHeight - 32,
    });
    window.addEventListener("resize", () => {
      this.setState({
        ...this.state,
        windowHeight: window.innerHeight - 32,
      });
    });
  }

  render() {
    return (
      <div id="Routes">
        <AppBar position="sticky" color="primary" className="menu-draggable">
          <Toolbar variant="dense" disableGutters={true}>
            <Box display="flex" width="100%" justifyContent="space-between">
              {this.props.users.isLogin === true && (
                <Button
                  edge="start"
                  className={
                    this.classes.menuButton +
                    " menu-undraggable menu-app-button"
                  }
                  color="inherit"
                  aria-label="menu"
                >
                  <MenuIcon style={{ fontSize: 18 }} />
                </Button>
              )}
              <Box p={1.5}>
                <Typography variant="body2" color="inherit">
                  Electron Apps
                </Typography>
              </Box>
              <Box p={0} className="menu-undraggable">
                <Button
                  size="small"
                  onClick={this.minimizeWindow}
                  className="control-app-button"
                >
                  <MinimizeIcon
                    style={{ color: "white", fontSize: 16, padding: "7 0" }}
                  />
                </Button>
                <Button
                  size="small"
                  onClick={this.resizeWindow}
                  className="control-app-button"
                >
                  <AspectRatioIcon
                    style={{ color: "white", fontSize: 16, padding: "7 0" }}
                  />
                </Button>
                <Button
                  size="small"
                  onClick={this.exitWindow}
                  className="close-app-button"
                >
                  <CloseIcon
                    style={{ color: "white", fontSize: 16, padding: "7 0" }}
                  />
                </Button>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>

        <div
          id="content"
          style={{
            height: this.state.windowHeight,
            overflowY: "auto",
          }}
        >
          {this.props.users.isLogin === true && <UserRoute />}
          {this.props.users.isLogin === false && <GuestRoute />}
        </div>
      </div>
    );
  }
}

export default RoutesContainer;
