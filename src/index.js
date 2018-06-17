import "bootstrap/dist/css/bootstrap.min.css"
import "./style.css"
import Map from "./map.js"

var map = new Map()

var newPlayerBtn = document.querySelector(".addPlayer")
var movePlayerBtn = document.querySelector(".removePlayer")
var input = document.querySelector(".removeInput")
var removeByIdBtn = document.querySelector(".removeByIdBtn")
var clearAllBtn = document.querySelector(".clearAll")

newPlayerBtn.addEventListener("click", () => map.addPlayer())
movePlayerBtn.addEventListener("click", () => map.removePlayer())
clearAllBtn.addEventListener("click", () => map.clearMap())
removeByIdBtn.addEventListener("click", () => map.removePlayer(input.value))

map.renderMap()
map.game()
