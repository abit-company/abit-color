const isAvailable = extendedState => extendedState.web3Available;
const isLogged = extendedState =>
  isAvailable(extendedState) &&
  extendedState.accounts.length > 0 &&
  !isOnTestNetwork(extendedState);
const isLocked = extendedState =>
  isAvailable(extendedState) &&
  extendedState.accounts.length === 0 &&
  !isOnTestNetwork(extendedState);
const isOnTestNetwork = extendedState =>
  isAvailable(extendedState) && extendedState.network !== "1";

export default {
  key: "metamask",
  strict: true,
  initial: "loading",
  states: {
    loading: {
      on: {
        CHECK_METAMASK: {
          notAvailable: {
            cond: extendedState => !isAvailable(extendedState)
          },
          locked: {
            cond: isLocked
          },
          logged: {
            cond: isLogged
          },
          onTestNetwork: {
            cond: isOnTestNetwork
          }
        }
      }
    },
    notAvailable: {
      on: {
        CHECK_METAMASK: {
          locked: {
            cond: isLocked
          },
          logged: {
            cond: isLogged
          },
          onTestNetwork: {
            cond: isOnTestNetwork
          }
        }
      }
    },
    onTestNetwork: {
      on: {
        CHECK_METAMASK: {
          notAvailable: {
            cond: extendedState => !isAvailable(extendedState)
          },
          locked: {
            cond: isLocked
          },
          logged: {
            cond: isLogged
          }
        }
      }
    },
    locked: {
      on: {
        CHECK_METAMASK: {
          notAvailable: {
            cond: extendedState => !isAvailable(extendedState)
          },
          logged: {
            cond: isLogged
          },
          onTestNetwork: {
            cond: isOnTestNetwork
          }
        }
      }
    },
    logged: {
      on: {
        CHECK_METAMASK: {
          notAvailable: {
            cond: extendedState => !isAvailable(extendedState)
          },
          locked: {
            cond: isLocked
          },
          onTestNetwork: {
            cond: isOnTestNetwork
          }
        }
      }
    }
  }
};
