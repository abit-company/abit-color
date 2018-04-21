import React from "react";
import { render } from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import App from "./App";

const rootElement = document.getElementById("root");

if (rootElement) {
  render(<App />, rootElement);

  if (module.hot) {
    // $FlowFixMe
    module.hot.accept("./App", () => {
      render(<App />, rootElement);
    });
  }
  registerServiceWorker();
} else {
  throw new Error("Missing React App root element");
}
