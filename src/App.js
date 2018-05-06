import "normalizr";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { injectGlobal, ThemeProvider } from "styled-components";
import MetaMask from "./components/MetaMask";
import Home from "./pages/Home";
import Colors from "./pages/Colors";

const theme = {
  colorPalette: ["#845EC2", "#D65DB1", "#FF6F91", "#FF9671", "#FFC75F"]
};

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Do+Hyeon');

  body {
    font-family: 'Do Hyeon', sans-serif;
    color: #2A272A;
  }

  * {
    padding: 0;
    margin: 0;
  }

  a {
    color: #0081CF;
  }
`;

class App extends Component {
  state = {};

  render() {
    return (
      <MetaMask.Provider>
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/colors" component={Colors} />
            </Switch>
          </Router>
        </ThemeProvider>
      </MetaMask.Provider>
    );
  }
}

export default App;
