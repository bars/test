import React from "react"
import Map from "./map.js"
import PlayerInfo from "./playerinfo.js"
import ControlButtons from "./controlbuttons.js"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.stateHandler = this.stateHandler.bind(this)
    this.state = {
      map : null
    }
  }

  render() {
    const {map} = this.state
    let info
    if (map && map.activePlayer) {
      info = <PlayerInfo map = {map}/>
    }
    return (
    <div id="app">
      <Map stateHandler = {this.stateHandler} />
      {info}
      <ControlButtons map = {map}/>
    </div>)
  }

  stateHandler(props) {
    this.setState(props)
  }
}

export default App