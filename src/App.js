import "normalizr";
import React, { Component } from "react";
import styled, { injectGlobal, ThemeProvider } from "styled-components";
import MetaMask from "./components/MetaMask";
import NavigationBar from "./components/NavigationBar";
import TextColorAnimation from "./components/TextColorAnimation";
import TextParticles from "./components/TextParticles";

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

// const pickRandomColor = () =>
// theme.colorPalette[Math.floor(Math.random() * theme.colorPalette.length)];

class App extends Component {
  state = {};

  render() {
    return (
      <MetaMask.Provider>
        <ThemeProvider theme={theme}>
          <Header>
            <NavigationBar />
            <Wrapper>
              <Hero>
                <TextParticles colors={theme.colorPalette} fontSize={120}>
                  Your
                </TextParticles>
                <br />
                <TextParticles colors={theme.colorPalette} fontSize={160}>
                  Blockchain
                </TextParticles>
                <br />
                <TextParticles colors={theme.colorPalette} fontSize={140}>
                  Colors
                </TextParticles>
              </Hero>
            </Wrapper>
          </Header>
        </ThemeProvider>
      </MetaMask.Provider>
    );
  }
}

const Header = styled.header``;

const Wrapper = styled.div`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
`;

const Hero = styled.div`
  margin-top: 100px;
`;

const Claim = styled.h2`
  font-size: 70px;
  margin-top: 100px;
  margin-bottom: 30px;
  letter-spacing: 0.02em;
`;

export default App;
