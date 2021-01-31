import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./content/Home";
import Leaderboard from "./content/Leaderboard";
 
function Content(props) {
    return (
      <HashRouter>
        <div className="row mt-5">
    		<div className="col-sm-2">
        	<ul className="navbar-nav px-3">
  
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
          
        </div>
        </div>
      </HashRouter>
    );

}
 
export default Content;