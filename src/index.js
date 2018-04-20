import "normalizr";
import React from "react";
import { render } from "react-dom";
import { injectGlobal } from "styled-components";
import MetaMask from "./MetaMask";
import NavigationBar from "./NavigationBar";

injectGlobal`
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

render(<App />, document.getElementById("root"));
