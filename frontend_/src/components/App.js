

import React, { useState, Component } from 'react';
import Web3 from 'web3';
import Navi from './Navbar';
import Content from './Content';
import { InjectedConnector } from '@web3-react/injected-connector';
import Shame from '../abis/Shame.json';
import ERC721_shame from '../abis/ChildERC721.json';

const shame_contract_address = "0x2bcB34018df64fE03E57ad1fEE6Ae709CC08ae80";

class App extends Component {


	state = {
		leaderboardList: [],
		shame_contract: null,		
		web3: null
	}

	

  constructor(props) {
    super(props)
	
	this.loadWeb3 = this.loadWeb3.bind(this)
    // this.loadBlockchainData = this.loadBlockchainData.bind(this)
    this.handleChange = this.handleChange.bind(this)        
    
  }

  async componentWillMount() {
    
	await this.loadGoerli();
	
	// when loaded call this to reload leaderboard
	await this.loadScammerBoard();

  }

  async loadGoerli(){

	var web3 = new Web3(new Web3.providers.HttpProvider(
		'https://goerli.infura.io/v3/1b88889de71a4764a41dc24e1e9fb31a'
	));
		
	this.shame_contract = await web3.eth.Contract((Shame.abi), shame_contract_address);	

	console.log("\nShame contract set-up\n");

  }

  
  async getPastEvents(){

	var past_events = await this.shame_contract.getPastEvents('Transfer', { fromBlock: 0, toBlock: 'latest' });

	return past_events;

  }


  async makeScammerLeaderBoard(){

	// call smart contract
	var past_events = await this.getPastEvents();

	// make array from highest to lowest
	let scammers = [];

	// loop over all past events
	for (let event = 0; event < past_events.length; event++){

		const current_scammer = past_events[event]['returnValues']['to'];		
		
		// scammer doesn't exist, make one
		if(scammers.findIndex(x => x[0] == current_scammer) == -1){
			scammers.push([current_scammer, 0]);
		};

		// get index
		const index = scammers.findIndex(x => x[0] == current_scammer)

		// increment scam counter for that user
		scammers[index][1]++;		
	}	

	scammers.sort((a, b) => b[1] - (a[1]));	

	return scammers;
  }

  async loadScammerBoard(){	

	const formated_scammers = await this.makeScammerLeaderBoard();

	var ll = [];
	    
	for(let scammer = 0; scammer < formated_scammers.length; scammer++){
		ll.push( {'username':"UNKNOWN", 'address':formated_scammers[scammer][0], 'score':formated_scammers[scammer][1]});
	}

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