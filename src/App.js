import "normalizr";
import React from "react";
import { injectGlobal } from "styled-components";
import MetaMask from "./components/MetaMask";
import NavigationBar from "./components/NavigationBar";

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Do+Hyeon');

  body {
      font-family: 'Do Hyeon', sans-serif;
  }

  * {
    padding: 0;
    margin: 0;
  }
`;

const App = () => (
  <MetaMask.Provider>
    <div>
      <NavigationBar />
    </div>
  </MetaMask.Provider>
);

export default App;
