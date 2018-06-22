import Player from "./player.js"
import React from "react"
import ReactDOM from "react-dom"

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.players = []
    this.id = 0
    this.clickHandler = this.clickHandler.bind(this)
    this.game = this.game.bind(this)
    this.map = new Image()
    this.map.src = "maps/map.jpg"
    this.props.stateHandler({map : this})
  }

  render() {
    return <canvas onClick = {this.clickHandler}></canvas>
  }

  componentDidMount() {
    this.canvas = ReactDOM.findDOMNode(this)
    this.context = this.canvas.getContext("2d")
    this.canvas.width = 484
    this.canvas.height = 454
    this.renderMap()
    this.game()
  }

  componentDidUpdate() {
    this.canvas = ReactDOM.findDOMNode(this)
    this.context = this.canvas.getContext("2d")
  }

  clickHandler(e) {
    e.stopPropagation()
    const point = {
      x: e.clientX - e.target.offsetLeft,
      y: e.clientY - e.target.offsetTop
    }
    const player = this.players.find(player => player.isIntersect(point))
    if (player && player !== this.activePlayer) {
      this.props.stateHandler({map: this})
      this.updated = false
      this.activePlayer = player
    }
  }

  drawMap() {
    this.context.drawImage(this.map, 0, 0)
  }

  renderMap() {
    this.drawMap()
    const playerAmount = Math.ceil(Math.random() * 5)
    for(let i = 0; i < playerAmount; i++) {
      this.addPlayer()
    }
  }

  addPlayer(cx, cy) {
    const opts = {
      id: this.id++,
      cx: cx || Math.round(Math.random() * this.canvas.width),
      cy: cy || Math.round(Math.random() * this.canvas.height),
      radius: 10,
      speed: Math.random() * 2
    }
    this.players.push(new Player(opts))
  }

  removePlayer(id) {
    let deletedPlayer
    if (id === undefined) {
      deletedPlayer = this.players.pop()
    }
    else {
      let playerIndex = this.players.findIndex(player => player.id === parseInt(id))
      if (playerIndex !== -1) {
        deletedPlayer = this.players[playerIndex]
        this.players.splice(playerIndex, 1)
      }
    }
    if (deletedPlayer && deletedPlayer === this.activePlayer) {
      this.activePlayer = null
      this.props.stateHandler({map: this})
    }
  }

  clearMap() {
    this.players = []
    this.activePlayer = null
    this.props.stateHandler({map: this})
  }

  drawPlayer(player) {
    const {cx, cy, radius} = player
    const fillStyle = player === this.activePlayer? "#0b348c" : "green"
    const strokeStyle = player === this.activePlayer ? "#355aab": "#003300"
    let pulseWidth = 0
    
    if (player === this.activePlayer) {
      let gap = this.activePlayer.drawOptions.expanding ? 0.1 : -0.1
      pulseWidth = this.activePlayer.drawOptions.pulseWidth += gap
      if (pulseWidth > 2) {
        this.activePlayer.drawOptions.expanding = false
      }
      if (pulseWidth < 0) {
        this.activePlayer.drawOptions.expanding = true
      }
    }
    this.context.beginPath()
    this.context.arc(cx, cy, radius + pulseWidth, 0, 2 * Math.PI, false)
    this.context.fillStyle = fillStyle
    this.context.fill()
    this.context.lineWidth = 5
    this.context.strokeStyle = strokeStyle
    this.context.stroke()
  }

  updateInfo() {
    if (this.activePlayer && !this.updated) {
      this.props.stateHandler({map : this})
      this.updated = true
      setTimeout(() => this.updated = false, 250)
    }
  }

  movePlayers() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.drawMap()
    for (let player of this.players) {
      if (!player.deleted) {
        player.nextPosition(this.canvas)
        this.drawPlayer(player)
      } 
    }
  }

  game() {
    this.drawMap()
    this.updateInfo()
    this.movePlayers()
    requestAnimationFrame(this.game)
  }
}

export default Map