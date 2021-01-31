import React, { useState, Component } from 'react';
import Web3 from 'web3';
import Navi from './Navbar'
import Content from './Content'
// import Leaderboard from '../abis/Leaderboard.json'

class App extends Component {


	state = {
		leaderboardList: [],
	}

	

  constructor(props) {
    super(props)
	
	this.loadWeb3 = this.loadWeb3.bind(this)
    // this.loadBlockchainData = this.loadBlockchainData.bind(this)
    this.handleChange = this.handleChange.bind(this)
        
    
  }

  async componentWillMount() {
    // await this.loadWeb3()
	// await this.loadBlockchainData()
	
	// when loaded call this to reload leaderboard
	await this.loadBoguseaderBoard();

  }


  async getScammerLeaderBoard(){


	// call smart contract

	// make array from highest to lowest

  }

  async loadBoguseaderBoard(){

    this.setState({ score: 9999});

    var ll = [];

    ll.push( {'username':"bob", 'address':"0x71C7656EC7ab88b098defB751B7401B5f6d8976F", 'score':222});
    ll.push( {'username':"alice", 'address':"0x04148d6CE66cbb2F5c198c272B8117a5e7a6102E", 'score':10});

    this.setState({leaderboardList:ll });

  }


  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  handleChange(evt) {
    const { name, value } = evt.target
    this.setState({
      [name]: value
    })
  }

  // 
  async updateLeaderboard2() {

  }


  render() {
    return (
      <div>		  
        <Navi
          account={this.state.account}
          username={this.state.username}
        />
        <Content
          account={this.state.account}
          username={this.state.username}
          score={this.state.score}
          leaderboardList={this.state.leaderboardList}          
          handleChange={this.handleChange}                    
          updateLeaderboard={this.updateLeaderboard2}
        />
      </div>
    );
  }
}

export default App;