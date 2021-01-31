import React, { Component } from "react";
import Button from "react-bootstrap/Button";
 
class Home extends Component {
  render() {
    return (
      <div>
        <h2>Extropy CTF</h2>
        <br></br>
        <p>
          The Ethernaut is a Web3/Solidity CTF (Capture The Flag) based game. Each level is a smart contract that needs to be 'hacked'.
        <br></br><br></br>
          What separates this CTF from the rest is that it is powered entirely by a smart contract developed by <a href="https://extropy.io/" target="_blank">Extropy.io</a>.
        <br></br>
          The leaderboard on this website is maintained entirely by our smart contract; there is no centralized database or backend program that keeps track of users or verifies solutions!
        <br></br><br></br>
          In the spirit of open source, contributions and level ideas can made by anyone by submitting a pull request at <a href="https://github.com/ExtropyIO" target="_blank">github.com/ExtropyIO/ExtropyCTF</a>.
        <br></br><br></br>          
        </p>
      </div>
    );
  }
}
 
export default Home;
