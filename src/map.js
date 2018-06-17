import Player from "./player.js"

class Map {
  constructor() {
    this.canvas = document.getElementById("canvas")
    this.context = this.canvas.getContext("2d")
    this.playerInfo = document.querySelector(".playerInfo")
    this.players = []
    this.id = 0
    this.canvas.width = 484
    this.canvas.height = 454
    this.map = new Image()
    this.map.src = "maps/map.jpg"

    this.canvas.addEventListener("click", (e) => {
      e.stopPropagation()
      const point = {
        x: e.clientX - this.canvas.offsetLeft,
        y: e.clientY - this.canvas.offsetTop
      }
      const player = this.players.find(player => player.isIntersect(point))
      if (player && player !== this.activePlayer) {
        const child = this.playerInfo.querySelector("ul")
        this.updated = false
        if (child) {
          this.playerInfo.removeChild(child)
        }
        this.playerInfo.insertBefore(player.getInfo(), this.playerInfo.querySelector("button"))
        this.playerInfo.classList.remove("hidden")
        this.activePlayer = player
      }
    })

    this.playerInfo.addEventListener("click", (e) => {
      if (e.target.classList.contains("increase")) {
        e.stopPropagation()
        const gap = this.activePlayer.speed > 0 ? 0.2 : -0.2
        this.activePlayer.speed += gap
      }
      else if (e.target.classList.contains("decrease")) {
        e.stopPropagation()
        const gap = this.activePlayer.speed > 0 ? -0.2 : 0.2
        this.activePlayer.speed += gap
      }
      else if (e.target.classList.contains("stop")) {
        e.stopPropagation()
        this.activePlayer.speed = 0
      }
      else if (e.target.classList.contains("delete")) {
        e.stopPropagation()
        this.removePlayer(this.activePlayer.id)
      }
    })
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
      this.playerInfo.classList.add("hidden")
    }
  }

  clearMap() {
    this.players = []
    this.playerInfo.classList.add("hidden")
  }

  drawPlayer(player) {
    const {cx, cy, radius} = {...player}
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
      const liX = this.activePlayer.list.cx
      const liY = this.activePlayer.list.cy
      const liSpeed = this.activePlayer.list.speed
      liX.textContent = `x: ${this.activePlayer.cx.toFixed(2)}`
      liY.textContent = `y: ${this.activePlayer.cy.toFixed(2)}`
      liSpeed.textContent = `speed: ${this.activePlayer.speed.toFixed(2)}`
      this.updated = true
      setTimeout(() => this.updated = false, 250)
    }
  }

  movePlayers() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.drawMap()
    for (let player of this.players) {
      player.nextPosition(this.canvas)
      this.drawPlayer(player)
    }
  }

  game() {
    this.drawMap()
    this.updateInfo()
    this.movePlayers()
    requestAnimationFrame(this.game.bind(this))
  }
}

export default Map