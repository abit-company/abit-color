import "normalizr";
import React, { Component, createRef } from "react";
import styled, { withTheme } from "styled-components";
import { times } from "lodash";
import { Canvas, Rect } from "components/Canvas";

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function hexAtIndex(index) {
  const r = componentToHex((index >> 16) & 0xff);
  const g = componentToHex((index >> 8) & 0xff);
  const b = componentToHex(index & 0xff);
  return `#${r}${g}${b}`;
}

class Colors extends Component {
  headerRef = createRef();

  state = {
    colors: times(1000, i => ({ hex: hexAtIndex(i) })),
    width: window ? window.innerWidth : 300,
    height: window ? window.innerHeight : 150
  };

  componentDidMount() {
    const { current } = this.headerRef;
    const { height } = current.getBoundingClientRect();
    this.setState({ height: window.innerHeight - height });
  }

  get numberOfColorsPerRow() {
    return 20;
  }

  get colorSize() {
    return {
      width: this.state.width / this.numberOfColorsPerRow,
      height: this.state.width / this.numberOfColorsPerRow
    };
  }

  getPosition = index => {
    const row = Math.floor(index / this.numberOfColorsPerRow);
    const column = index % this.numberOfColorsPerRow;
    const { width, height } = this.colorSize;
    return {
      x: column * width,
      y: row * height
    };
  };

  render() {
    return (
      <Page>
        <Header innerRef={this.headerRef}>
          <Search placeholder="Search color (e.g. #fefefe)" />
        </Header>
        <Canvas height={this.state.height} width={this.state.width}>
          {this.state.colors.map((color, index) => {
            const { x, y } = this.getPosition(index);
            return (
              <Rect
                key={color.hex}
                color={color.hex}
                x={x}
                y={y}
                height={this.colorSize.height}
                width={this.colorSize.width}
              />
            );
          })}
        </Canvas>
      </Page>
    );
  }
}

const Page = styled.div``;

const Header = styled.header``;

const Search = styled.input.attrs({
  type: "text"
})`
  background-color: #eee;
  border: none;
  border-radius: 15px;
  box-sizing: border-box;
  height: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 50%;
  padding-left: 15px;
  width: 300px;
  transform: translateX(-50%);
`;

export default withTheme(Colors);
