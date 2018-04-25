import React from "react";
import styled from "styled-components";
import MetaMask from "./MetaMask";

const metaMaskStatusColors = {
  loading: "#B0A8B9",
  notAvailable: "#FF6F91",
  onTestNetwork: "#926C00",
  logged: "#00C9A7",
  locked: "#FF9671"
};

export default () => (
  <MetaMask.Consumer>
    {({ userAddress, metaMask }) => (
      <NavBar metaMask={metaMask} userAddress={userAddress} />
    )}
  </MetaMask.Consumer>
);

const MetaMaskStatus = styled.div`
  background-color: ${({ value }) => metaMaskStatusColors[value]};
  height: 14px;
  width: 14px;
  border-radius: 7px;
  border: 2px solid;
  border-color: ${({ value }) => metaMaskStatusColors[value]};
  box-sizing: border-box;
`;

const NavBar = ({ metaMask, userAddress }) => (
  <Nav>
    <Logo>
      abit<span style={{ color: "#845EC2" }}>c</span>
      <span style={{ color: "#D65DB1" }}>o</span>
      <span style={{ color: "#FF6F91" }}>l</span>
      <span style={{ color: "#FF9671" }}>o</span>
      <span style={{ color: "#FFC75F" }}>r</span>
    </Logo>
    <div className="rightBox">
      {metaMask === "notAvailable" && (
        <p>
          Install <a href="https://metamask.io/">metamask</a>
        </p>
      )}
      {metaMask === "onTestNetwork" && <p>You are on a test net</p>}
      {metaMask === "locked" && <p>Your account is locked</p>}
      {metaMask === "logged" && <UserAddress>{userAddress}</UserAddress>}
      <MetaMaskStatus value={metaMask} />
    </div>
  </Nav>
);

const Nav = styled.nav`
  padding: 20px 20px;
  display: flex;
  justify-content: space-between;
  .rightBox {
    align-items: center;
    display: flex;
  }
  ${MetaMaskStatus} {
    margin-left: 10px;
  }
`;

const Logo = styled.h1`
  letter-spacing: 0.1em;
`;

const UserAddress = styled.p``;
