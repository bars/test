import React from "react"

class ControlButtons extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  render() {
    return (
      <div className="container" onClick={this.handleClick}>
        <button className="addPlayer">Add player</button>
        <button className="removePlayer">Remove last</button>
        <button className="clearAll">Clear all</button>
        <input type="number" className="removeInput" ref={(input) => this.input = input}/>
        <button className="removeByIdBtn">Remove by ID</button>
      </div>)
  }
  
  handleClick(e) {
    const classList = e.target.classList
    const map = this.props.map
    e.target.tagName === "button" && e.stop.propagation()
    if (classList.contains("addPlayer")) {
      map.addPlayer()
    }
    else if (classList.contains("removePlayer")) {
      map.removePlayer()
    }
    else if (classList.contains("clearAll")) {
      map.clearMap()
    }
    else if (classList.contains("removeByIdBtn")) {
      map.removePlayer(this.input.value)
    }
  }
}

export default ControlButtons