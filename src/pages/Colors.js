import "normalizr";
import React, { Component } from "react";
import styled, { withTheme } from "styled-components";

class Colors extends Component {
  state = {};

  render() {
    return <Header>colors!</Header>;
  }
}

const Header = styled.header``;

export default withTheme(Colors);
