import React from "react"

function LeaderboardRow(props) {
	console.log(props.player)
    return (
        <tr>
          <td>{props.rank}</td>
          <td>{props.player.username}</td>
          <td>{props.player.address}</td>
          <td>{props.player.score}</td>
        </tr>
    )
}

export default LeaderboardRow