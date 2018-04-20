import React from "react";
import styled from "styled-components";
import MetaMask from "./MetaMask";

const metaMaskStatusColors = {
  loading: "gray",
  notAvailable: "red",
  onTestNetwork: "brown",
  logged: "green",
  locked: "yellow"
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
    <Logo>Abitcolor</Logo>
    <div className="rightBox">
      {metaMask === "notAvailable" && (
        <p>
          Install <a href="https://metamask.io/">metamask</a>
        </p>
      )}
      {metaMask === "onTestNetwork" && <p>You are on a test net</p>}
      {metaMask === "locked" && <p>Your account is locked</p>}
      {metaMask === "logged" && <p>{userAddress}</p>}
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

const Logo = styled.h1``;

const UserAddress = styled.p``;
