import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./content/Home";
// import Level_0_Practice from "./content/Level_0_Practice";
// import Level_1_Brute_Force from "./content/Level_1_Brute_Force";
// import Level_2_Reentrancy from "./content/Level_2_Reentrancy";
// import Level_3_Global_Functions from "./content/Level_3_Global_Functions";
// import DemoLevel3 from "./content/DemoLevel3";
// import Level1 from "./content/Level1";
// import Contact from "./content/Contact";
import Leaderboard from "./content/Leaderboard";

 
function Content(props) {
    return (
      <HashRouter>
        <div className="row mt-5">
    		<div className="col-sm-2">
        	<ul className="navbar-nav px-3">
            {/*<li>
              <NavLink exact to="/" activeStyle={{ fontWeight: "bold", color: "green" }} >
                Home
              </NavLink>
            </li>*/}
            <li>
              <NavLink exact to="/home" activeStyle={{ fontWeight: "bold", color: "green" }} >
                Home
              </NavLink>
            </li>

			<li>
              <NavLink exact to="/leaderboard" activeStyle={{ fontWeight: "bold", color: "green" }} >
                Leaderboard
              </NavLink>
            </li>
            {/* <li>
              <NavLink exact to="/profile" activeStyle={{ fontWeight: "bold", color: "green" }} >
                User Profile
              </NavLink>
            </li>
            <br></br>
            LEVELS
            <br></br>
            <li>
              <NavLink exact to="/Level_0_Practice" activeStyle={{ fontWeight: "bold", color: "green" }} >
                Level 0 - Practice
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/Level_1_Brute_Force" activeStyle={{ fontWeight: "bold", color: "green" }} >
                Level 1 - Brute Force
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/Level_2_Reentrancy" activeStyle={{ fontWeight: "bold", color: "green" }} >
                Level 2 - Reentrancy
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/Level_3_Global_Functions" activeStyle={{ fontWeight: "bold", color: "green" }} >
                Level 3 - Global Functions
              </NavLink>
            </li> */}
            {/*<li>
              <NavLink exact to="/demolevel3" activeStyle={{ fontWeight: "bold", color: "green" }} >
                Demo Level 3
              </NavLink>
            </li>*/}
            {/*<li>
              <NavLink exact to="/level1" activeStyle={{ fontWeight: "bold", color: "green" }} >
                Lottery
              </NavLink>
            </li>*/}
            {/*<li>
              <NavLink exact to="/contact" activeStyle={{ fontWeight: "bold", color: "green" }} >
                Contact
              </NavLink>
            </li>*/}
          </ul>
	      </div>
        <div className="col-sm-10 pr-sm-5">			
        	<Route exact path="/" component={Home}/>
			<Route exact path="/home" component={Home}/>
          <Route exact path="/leaderboard"
            render={()=>
              <Leaderboard
                account={props.account}
                username={props.username}
                setUsername={props.setUsername}
                handleChange={props.handleChange}
                leaderboardList={props.leaderboardList}
              />
            }
            />
          {/* <Route exact path="/profile"
            render={()=>
              <Profile
                account={props.account}
                username={props.username}
                score={props.score}
                setUsername={props.setUsername}
                handleChange={props.handleChange}
                leaderboardList={props.leaderboardList}
                playerLevels={props.playerLevels}
              />
            }
          />  */}
          {/* <Route exact path="/Level_0_Practice"
            render={()=>
              <Level_0_Practice
                account={props.account}
                username={props.username}
                handleChange={props.handleChange}
                registerUserLevel={props.registerUserLevel}
                submitSolution={props.submitSolution}
                updateLeaderboard={props.updateLeaderboard}
              />
            }
          />
          <Route exact path="/Level_1_Brute_Force" 
            render={()=>
              <Level_1_Brute_Force
                account={props.account}
                username={props.username}
                handleChange={props.handleChange}
                registerUserLevel={props.registerUserLevel}
                submitSolution={props.submitSolution}
                updateLeaderboard={props.updateLeaderboard}
              />
            }
          />
          <Route exact path="/Level_2_Reentrancy" 
            render={()=>
              <Level_2_Reentrancy
                account={props.account}
                username={props.username}
                handleChange={props.handleChange}
                registerUserLevel={props.registerUserLevel}
                submitSolution={props.submitSolution}
                updateLeaderboard={props.updateLeaderboard}
              />
            }
          />
          <Route exact path="/Level_3_Global_Functions" 
            render={()=>
              <Level_3_Global_Functions
                account={props.account}
                username={props.username}
                handleChange={props.handleChange}
                registerUserLevel={props.registerUserLevel}
                submitSolution={props.submitSolution}
                updateLeaderboard={props.updateLeaderboard}
              />
            }
          /> */}
          {/*<Route exact path="/demolevel3" component={DemoLevel3}/>*/}
          {/*<Route exact path="/level1" component={Level1}/>
          <Route exact path="/contact" component={Contact}/>*/}
        </div>
        </div>
      </HashRouter>
    );

}
 
export default Content;