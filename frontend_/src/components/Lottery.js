import React, { Component } from 'react';
import Web3 from 'web3';
import contract from "truffle-contract";

class Lottery extends Component {

  async componentWillMount() {
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {

    const web3 = window.web3

    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    // Network ID
    // const networkId = await web3.eth.net.getId()
    // const networkData = SocialNetwork.networks[networkId]
    
    // if(networkData) {
      // const socialNetwork = web3.eth.Contract(SocialNetwork.abi, networkData.address)
      // this.setState({ socialNetwork })
      // const postCount = await socialNetwork.methods.postCount().call()
      // this.setState({ postCount })
      // // Load Posts
      // for (var i = 1; i <= postCount; i++) {
      //   const post = await socialNetwork.methods.posts(i).call()
      //   this.setState({
      //     posts: [...this.state.posts, post]
      //   })
      // }
      // // Sort posts. Show highest tipped posts first
      // this.setState({
      //   posts: this.state.posts.sort((a,b) => b.tipAmount - a.tipAmount )
      // })
      // this.setState({ loading: false})
    // } else {
    //   window.alert('SocialNetwork contract not deployed to detected network.')
    // }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: ''
    }
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <Content />
      </div>
    );
  }
}

export default App;


///////////////////////////

// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Import libraries we need.
import { default as Web3 } from "web3";
import { default as contract } from "truffle-contract";

// Import our contract artifacts and turn them into usable abstractions.
import lottery_artifacts from "../../build/contracts/Lottery.json";

var Lottery = contract(lottery_artifacts);

// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;
var lotteryGameContractInstance = undefined;
var registerListener = undefined;
var guessListener = undefined;
var globalRefreshInterval = setInterval(function() {
  this.App.refreshTeams();
}, 15000);

window.App = {
  start: function() {
    var self = this;

    // Bootstrap the Lottery abstraction for Use.
    Lottery.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    return self
      .getAccounts()
      .then(function(accs) {
        accounts = accs;
        account = accounts[0];
        return self.initialise();
      })
      .then(function() {
        return self.refreshTeams();
      });
  },

  resetGlobalPageRefresh: function() {
    this.globalRefreshInterval = setInterval(this.refreshTeams, 20000);
  },

  setStatus: function(message) {
    let status = document.getElementById("status");
    status.innerHTML = message;
  },

  getContractInstance: function() {
    let self = this;
    if (self.lotteryGameContractInstance !== undefined) {
      console.log(
        "Lottery Contract deployed at address: " +
          self.lotteryGameContractInstance.address
      );
      return Promise.resolve(self.lotteryGameContractInstance);
    }
    return Lottery.deployed().then(function(instance) {
      self.lotteryGameContractInstance = instance;
      return self.lotteryGameContractInstance;
    });
  },

  getAccounts: function() {
    let self = this;
    return new Promise(function(resolve, reject) {
      web3.eth.getAccounts(function(err, accs) {
        if (err !== null && err !== undefined) {
          window.alert("There was an error fetching your accounts.");
          reject(err);
        }

        if (accs.length === 0) {
          console.log(
            "Could not get any accounts! Make sure your Ethereum client is configured correctly."
          );
          self.displayAccountWarning();
        }
        resolve(accs);
      });
    });
  },

  getLotteryBalance: function() {
    let self = this;
    return new Promise(function(resolve, reject) {
      web3.eth.getBalance(self.lotteryGameContractAddress, function(
        err,
        balance
      ) {
        if (err !== null && err !== undefined) {
          window.alert("There was an error fetching Lottery balance.");
          reject(err);
        }
        resolve(balance);
      });
    });
  },

  refreshTeams: function() {
    let self;
    if (this.window != undefined) {
      self = this.App;
    } else {
      self = this;
    }

    return self.lotteryGameContractInstance.getTeamCount
      .call()
      .then(function(value) {
        let teamCount = value.valueOf();
        let teams = [];
        for (let ii = 0; ii < teamCount; ii++) {
          teams.push(self.retrieveTeamDetails(ii));
        }
        return Promise.all(teams);
      })
      .then(function(teams) {
        teams = self.sortTeamsDescScore(teams);
        self.updateTable(teams);
        return self.getLotteryBalance();
      })
      .then(function(balance) {
        self.displayLotteryBalance(web3.fromWei(balance, "ether"));
      })
      .catch(function(e) {
        console.log(e);
        self.setStatus("Error getting balance; see log.");
      });
  },

  retrieveTeamDetails: function(teamNumber) {
    return this.lotteryGameContractInstance
      .getTeamDetails(teamNumber)
      .then(teamDetails => {
        if (teamDetails === undefined || teamDetails.length < 3) {
          return {};
        }
        return {
          name: teamDetails[0],
          address: teamDetails[1],
          score: teamDetails[2].toNumber()
        };
      });
  },

  sortTeamsDescScore: function(teamDetails) {
    if (teamDetails === undefined || teamDetails.length === 0) {
      return teamDetails;
    }
    return teamDetails.sort((teamA, teamB) => {
      if (teamA.score < teamB.score) {
        return 1;
      } else if (teamA.score > teamB.score) {
        return -1;
      } else {
        return 0;
      }
    });
  },

  nonNullString: function(inputValue) {
    return (
      inputValue === undefined ||
      inputValue === null ||
      $.trim(inputValue) === ""
    );
  },

  isValidEthereumAddress: function(inputValue) {
    return web3.isAddress(inputValue);
  },

  registerTeam: function() {
    let self = this;
    console.log("Registering Team");
    let teamName = document.getElementById("registerNameInput").value;
    if (self.nonNullString(teamName)) {
      return;
    }
    let teamAddress = document.getElementById("registerAddressInput").value;
    if (
      self.nonNullString(teamAddress) ||
      !self.isValidEthereumAddress(teamAddress)
    ) {
      return;
    }
    let teamPassword = document.getElementById("registerPasswordInput").value;
    if (self.nonNullString(teamPassword)) {
      return;
    }
    console.log("Name is " + teamName);
    console.log("Team Address is " + teamAddress);
    console.log("Password is " + teamPassword);
    self.lotteryGameContractInstance.registerTeam
      .sendTransaction(teamAddress, teamName, teamPassword, {
        from: account,
        gas: 2000000,
        value: web3.toWei(2, "ether")
      })
      .then(function(TxID) {
        console.log("TxID is " + TxID);
        self.registerTeamRegisteredEvent(teamName);
        self.addRegTxInProgressMessage(TxID);
      })
      .catch(function(e) {
        console.log(e);
      })
      .then(function() {
        document
          .getElementById("registration-form")
          .classList.remove("was-validated");
        document.getElementById("registerNameInput").value = null;
        document.getElementById("registerAddressInput").value = null;
        document.getElementById("registerPasswordInput").value = null;
      });
  },

  updateTable: function(teams) {
    // Remove the existing data
    let tableInstance = document.getElementById("team-data");
    tableInstance.classList.add("content-update-in-progress");
    this.removeExistingRows(tableInstance);
    for (let i = 0; i < teams.length; i++) {
      let row = tableInstance.insertRow(i);
      row.classList.add("fade");
      row.classList.add("show");
      // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);

      // Add some text to the new cells:
      cell1.innerHTML = "" + (i + 1);
      cell2.innerHTML = teams[i]["name"];
      cell3.innerHTML = teams[i]["address"];
      cell4.innerHTML = teams[i]["score"];
    }
    setTimeout(function() {
      tableInstance.classList.remove("content-update-in-progress");
    }, 1000);
  },
  removeExistingRows: function(tableBody) {
    if (tableBody !== undefined) {
      if (tableBody.rows !== undefined && tableBody.rows.length > 0) {
        let numRows = tableBody.rows.length;
        for (let l = 0; l < numRows; l++) {
          tableBody.deleteRow(0);
        }
      }
    }
  },

  makeGuess: function() {
    let self = this;
    console.log("Making a guess");
    let teamAddress = document.getElementById("guessAddressInput").value;
    if (
      self.nonNullString(teamAddress) ||
      !self.isValidEthereumAddress(teamAddress)
    ) {
      return;
    }
    let guess = parseInt(document.getElementById("guessInput").value);
    console.log("Team Address is " + teamAddress);
    console.log("Guess is " + guess);
    self.lotteryGameContractInstance.makeAGuess
      .sendTransaction(teamAddress, guess, { from: account, gas: 2000000 })
      .then(function(TxID) {
        console.log("TxID is " + TxID);
        self.registerGuessEvent(teamAddress);
        self.addGuessTxInProgressMessage(TxID);
      })
      .catch(function(e) {
        console.log(e);
      })
      .then(function() {
        document.getElementById("guess-form").classList.remove("was-validated");
        document.getElementById("guessInput").value = null;
      });
  },

  registerTeamRegisteredEvent: function(teamName) {
    let self = this;
    self.registerListener = this.lotteryGameContractInstance.TeamRegistered(
      function(error, result) {
        if (!error) {
          self.resetGlobalPageRefresh();
          self.refreshTeams();
          if (
            self.registerListener !== undefined &&
            result !== undefined &&
            result.args !== undefined &&
            result.args["name"] === teamName
          ) {
            console.log("done");
            self.registerListener.stopWatching();
            self.removeRegTxMessage();
          }
        }
      }
    );
  },

  registerGuessEvent: function(teamAddress) {
    let self = this;
    self.guessListener = this.lotteryGameContractInstance.GuessMade(function(
      error,
      result
    ) {
      if (!error) {
        self.resetGlobalPageRefresh();
        self.refreshTeams();
        if (
          self.guessListener !== undefined &&
          result !== undefined &&
          result.args !== undefined &&
          result.args["teamAddress"] === teamAddress
        ) {
          console.log("done");
          self.guessListener.stopWatching();
          self.removeGuessTxMessage();
        }
      }
    });
  },

  displayAccountWarning: function() {
    $("#warning-content").fadeIn();
  },

  displayLotteryBalance: function(balance) {
    $("#lottery-balance").text(balance + " ETH");
  },

  addRegTxInProgressMessage: function(txId) {
    var div = document.createElement("div");
    const message =
      '<div id="registrationInfo" class="alert alert-info alert-dismissible fade show" role="alert">\n' +
      '            <button type="button" class="close" data-dismiss="alert" aria-label="Close">\n' +
      '              <span aria-hidden="true">&times;</span>\n' +
      "            </button>\n" +
      "            Registration transaction (" +
      txId +
      ") successfully submitted! Waiting for the transaction to be mined...\n" +
      "          </div>";
    div.innerHTML = message;
    let parentElem = document.getElementById("registration-container");
    parentElem.insertBefore(div, parentElem.firstElementChild);
  },

  removeRegTxMessage: function() {
    $("#registrationInfo").detach();
  },

  addGuessTxInProgressMessage: function(txId) {
    var div = document.createElement("div");
    const message =
      '<div id="guessInfo" class="alert alert-info alert-dismissible fade show" role="alert">\n' +
      '            <button type="button" class="close" data-dismiss="alert" aria-label="Close">\n' +
      '              <span aria-hidden="true">&times;</span>\n' +
      "            </button>\n" +
      "            Guess transaction (" +
      txId +
      ") successfully submitted! Waiting for the transaction to be mined...\n" +
      "          </div>";
    div.innerHTML = message;
    let parentElem = document.getElementById("guess-container");
    parentElem.insertBefore(div, parentElem.firstElementChild);
  },

  removeGuessTxMessage: function() {
    $("#guessInfo").detach();
  },

  initialise: function() {
    let self = this;
    return Lottery.deployed()
      .then(function(instance) {
        self.lotteryGameContractInstance = instance;
        self.lotteryGameContractAddress = instance.address;
        return self.lotteryGameContractInstance.owner.call();
      })
      .then(function(owner) {
        console.log("owner is " + owner);
      });
  },
  resetLottery: function() {
    let newSeed = document.getElementById("lotterySeedInput").value;
    this.lotteryGameContractInstance.initialiseLottery
      .sendTransaction(newSeed, { from: account, gas: 3000000 })
      .then(function(txId) {
        const message =
          '<div id="resetInfo" class="alert alert-info alert-dismissible fade show" role="alert">\n' +
          '            <button type="button" class="close" data-dismiss="alert" aria-label="Close">\n' +
          '              <span aria-hidden="true">&times;</span>\n' +
          "            </button>\n" +
          "            Lottery Reset" +
          "          </div>";
        var div = document.createElement("div");
        div.innerHTML = message;
        let parentElem = document.getElementById("reset-container");
        parentElem.insertBefore(div, parentElem.firstElementChild);
      });
  },
  addAdmin: function() {
    let newAdmin = document.getElementById("adminAddressInput").value;
    this.lotteryGameContractInstance.addAdmin
      .sendTransaction(newAdmin, { from: account, gas: 3000000 })
      .then(function(txId) {
        const message =
          '<div id="resetInfo" class="alert alert-info alert-dismissible fade show" role="alert">\n' +
          '            <button type="button" class="close" data-dismiss="alert" aria-label="Close">\n' +
          '              <span aria-hidden="true">&times;</span>\n' +
          "            </button>\n" +
          "            New admin address added" +
          "          </div>";
        var div = document.createElement("div");
        div.innerHTML = message;
        let parentElem = document.getElementById("admin-container");
        parentElem.insertBefore(div, parentElem.firstElementChild);
        //
        document.getElementById("admin-form").classList.remove("was-validated");
        document.getElementById("adminAddressInput").value = null;
      });
  }
};

window.addEventListener("load", async function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== "undefined") {
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
        // Request account access if needed
        await ethereum.enable();
      } catch (error) {
        console.log("Error !" + error);
      }
    } else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider);
    }
    console.warn("Using web3 detected from external source. ");
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn(
      "No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask"
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(
      new Web3.providers.HttpProvider("http://localhost:8545")
    );
  }

  //
  let regForm = document.getElementById("registration-form");
  if (regForm != undefined) {
    regForm.addEventListener(
      "submit",
      function(event) {
        if (regForm.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
          regForm.classList.add("was-validated");
        } else if (regForm.classList.contains("was-validated")) {
          regForm.classList.remove("was-validated");
        }
      },
      false
    );
  }
  let guessForm = document.getElementById("guess-form");
  if (guessForm != undefined) {
    guessForm.addEventListener(
      "submit",
      function(event) {
        if (guessForm.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
          guessForm.classList.add("was-validated");
        } else if (guessForm.classList.contains("was-validated")) {
          guessForm.classList.remove("was-validated");
        }
      },
      false
    );
  }
  let resetForm = document.getElementById("reset-form");
  if (resetForm != undefined) {
    resetForm.addEventListener(
      "submit",
      function(event) {
        if (resetForm.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
          resetForm.classList.add("was-validated");
        } else if (resetForm.classList.contains("was-validated")) {
          resetForm.classList.remove("was-validated");
        }
      },
      false
    );
  }
  let adminForm = document.getElementById("admin-form");
  if (adminForm != undefined) {
    adminForm.addEventListener(
      "submit",
      function(event) {
        if (adminForm.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
          adminForm.classList.add("was-validated");
        } else if (adminForm.classList.contains("was-validated")) {
          adminForm.classList.remove("was-validated");
        }
      },
      false
    );
  }
  //
  App.start();
});