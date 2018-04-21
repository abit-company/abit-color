import React, { Component, createContext } from "react";
import { Machine } from "xstate";
import statechart from "./statechart";

const UserContext = createContext();

class Provider extends Component {
  metaMaskMachine = Machine(statechart);
  metaMaskState = this.metaMaskMachine.initialState;

  constructor(props) {
    super(props);
    this.state = {
      context: {
        metaMask: this.metaMaskState.value,
        userAddress: undefined
      }
    };
  }

  componentDidMount() {
    this.checkMeta();
    this.setState({
      loading: false
    });
    this.intervalId = setInterval(this.checkMeta, 500);
  }

  checkMeta = () => {
    const extendedState = {
      web3Available: !!window.web3,
      accounts: window.web3 ? window.web3.eth.accounts : [],
      network: window.web3 ? window.web3.version.network : undefined
    };
    this.metaMaskState = this.metaMaskMachine.transition(
      this.metaMaskState,
      "CHECK_METAMASK",
      extendedState
    );
    this.setState(prevState => ({
      context: {
        metaMask: this.metaMaskState.value,
        userAddress: extendedState.accounts[0]
      }
    }));
  };

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <UserContext.Provider value={this.state.context}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default {
  Provider,
  Consumer: UserContext.Consumer
};
