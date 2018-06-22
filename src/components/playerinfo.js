import React from "react"

class PlayerInfo extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  render() {
    const {id, cx, cy, radius, speed} = this.props.map.activePlayer
    return (
      <div className="playerInfo" onClick={this.handleClick}>
        <span>Player details:</span>
        <ul>
          <li>id : {id}</li>
          <li>cx : {cx.toFixed(2)}</li>
          <li>cy : {cy.toFixed(2)}</li>
          <li>radius : {radius}</li>
          <li>speed : {speed.toFixed(2)}</li>
        </ul>
        <button className="increase">Faster</button>
        <button className="decrease">Slower</button>
        <button className="stop">Stop</button>
        <button className="delete">Delete</button>
      </div>)
  }

  handleClick(e) {
    const {map} = this.props
    if (e.target.classList.contains("delete")) {
      map.removePlayer(map.activePlayer.id)
    }
    else {
      let speed = map.activePlayer.speed
      if (e.target.classList.contains("increase")) {
        map.activePlayer.speed += speed > 0 ? 0.2 : -0.2
      }
      else if (e.target.classList.contains("decrease")) {
        map.activePlayer.speed += speed > 0 ? -0.2 : 0.2
      }
      else if (e.target.classList.contains("stop")) {
        map.activePlayer.speed = 0
      }
    }
    if (e.target.tagname === "button") {
      map.updated = false
      e.stopPropagation()
      //this.setState({map})
    }
  }
}
export default PlayerInfo