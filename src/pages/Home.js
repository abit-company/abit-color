import "normalizr";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled, { withTheme } from "styled-components";
import NavigationBar from "components/NavigationBar";
import TextParticles from "components/TextParticles";

class Home extends Component {
  state = {};

  render() {
    const { theme } = this.props;
    return (
      <Header>
        <NavigationBar />
        <Hero>
          <TextParticles
            className="your"
            colors={theme.colorPalette}
            fontSize={100}
          >
            Your
          </TextParticles>
          <br />
          <TextParticles
            className="blockchain"
            colors={theme.colorPalette}
            fontSize={120}
          >
            Blockchain
          </TextParticles>
          <br />
          <TextParticles
            className="colors"
            colors={theme.colorPalette}
            fontSize={110}
          >
            Colors
          </TextParticles>
          <br />
          <CallToAction to="/colors">Start</CallToAction>
        </Hero>
        <Wrapper />
      </Header>
    );
  }
}

const Header = styled.header``;

const Wrapper = styled.div`
  width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const Hero = styled.div`
  margin-top: 100px;
  margin-left: 100px;
`;

const CallToAction = styled(Link)`
  background-color: ${({ theme }) => theme.colorPalette[1]};
  border: 3px solid ${({ theme }) => theme.colorPalette[0]};
  border-radius: 3px;
  box-sizing: border-box;
  color: white;
  font-size: 20px;
  padding: 10px 40px;
  text-decoration: none;
  transition: all 400ms;
  &:hover {
    background-color: ${({ theme }) => theme.colorPalette[0]};
  }
`;

export default withTheme(Home);
