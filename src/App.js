import "firebase/database"
import firebase from "firebase/app"
import React, { useRef, useEffect } from "react"

import SpriteGrass from "./assets/sprites/grass.jpg"
import SpriteStone from "./assets/sprites/stone.png"
import SpriteBush from "./assets/sprites/bush.png"
import SpriteTree from "./assets/sprites/tree.png"
import SpriteZeldaUp from "./assets/sprites/zelda/zeldaUp.png"
import SpriteZeldaLeft from "./assets/sprites/zelda/zeldaLeft.png"
import SpriteZeldaRight from "./assets/sprites/zelda/zeldaRight.png"
import SpriteZeldaDown from "./assets/sprites/zelda/zeldaDown.png"
import SpritePrincessUp from "./assets/sprites/princess/princessUp.png"
import SpritePrincessLeft from "./assets/sprites/princess/princessLeft.png"
import SpritePrincessRight from "./assets/sprites/princess/princessRight.png"
import SpritePrincessDown from "./assets/sprites/princess/princessDown.png"

const scale = window.devicePixelRatio || 1
const config = {
  scene: {
    scale,
    width: window.innerWidth * scale,
    height: window.innerHeight * scale
  },
  case: {
    width: 23,
    height: 23
  },
  firebaseConfig: {
    apiKey: "api-key",
    authDomain: "project-id.firebaseapp.com",
    databaseURL: "https://demogame-f994b.firebaseio.com",
    projectId: "demogame-f994b",
    storageBucket: "demogame-f994b.appspot.com"
  }
}

firebase.initializeApp(config.firebaseConfig)

const database = firebase.database()

const Direction = {
  TOP: "up",
  LEFT: "left",
  BOTTOM: "down",
  RIGHT: "right"
}
const Caracter = {
  ZELDA: "zelda",
  PRINCESS: "princess"
}
const SpriteType = {
  GRASS: 0,
  STONE: 1,
  BUSH: 2,
  TREE: 3,
  ZELDA: {
    [Direction.TOP]: "z-top",
    [Direction.LEFT]: "z-left",
    [Direction.BOTTOM]: "z-bottom",
    [Direction.RIGHT]: "z-right"
  },
  PRINCESS: {
    [Direction.TOP]: "p-top",
    [Direction.LEFT]: "p-left",
    [Direction.BOTTOM]: "p-bottom",
    [Direction.RIGHT]: "p-right"
  }
}
const resources = {
  [SpriteType.GRASS]: SpriteGrass,
  [SpriteType.STONE]: SpriteStone,
  [SpriteType.BUSH]: SpriteBush,
  [SpriteType.TREE]: SpriteTree,
  [SpriteType.ZELDA[Direction.TOP]]: SpriteZeldaUp,
  [SpriteType.ZELDA[Direction.LEFT]]: SpriteZeldaLeft,
  [SpriteType.ZELDA[Direction.RIGHT]]: SpriteZeldaRight,
  [SpriteType.ZELDA[Direction.BOTTOM]]: SpriteZeldaDown,
  [SpriteType.PRINCESS[Direction.TOP]]: SpritePrincessUp,
  [SpriteType.PRINCESS[Direction.LEFT]]: SpritePrincessLeft,
  [SpriteType.PRINCESS[Direction.RIGHT]]: SpritePrincessRight,
  [SpriteType.PRINCESS[Direction.BOTTOM]]: SpritePrincessDown
}
const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1]
]

const user = { id: "julien", loaded: false }
const player = {}
const players = {}

function startControls() {
  document.addEventListener("keydown", event => {
    const { key } = event
    const [currentX, currentY] = player.position
    const nextY = ["ArrowUp", "w"].includes(key)
      ? currentY - 1
      : ["ArrowDown", "s"].includes(key)
      ? currentY + 1
      : currentY
    const nextX = ["ArrowLeft", "a"].includes(key)
      ? currentX - 1
      : ["ArrowRight", "d"].includes(key)
      ? currentX + 1
      : currentX
    const nextDirection =
      nextX > currentX
        ? Direction.RIGHT
        : nextX < currentX
        ? Direction.LEFT
        : nextY > currentY
        ? Direction.BOTTOM
        : nextY < currentY
        ? Direction.TOP
        : player.direction

    player.direction = nextDirection
    player.position = !hasCollision(nextX, nextY)
      ? [nextX, nextY]
      : [currentX, currentY]

    savePlayerInfos().catch(console.error)
  })
}

function watchPlayersStates() {
  const database = firebase.database()

  database.ref("/players").on("value", snapshot => {
    const allPlayers = snapshot.val()

    Object.keys(allPlayers).forEach(playerId => {
      if (playerId !== player.id) {
        const currentPlayer = forgePlayerInfoFromDatabase({
          ...allPlayers[playerId],
          id: playerId
        })

        updatePlayer(playerId, currentPlayer)
      }
    })
  })
}

function forgePlayerInfoFromDatabase(data) {
  return {
    id: data.id,
    position: [data.x, data.y],
    direction: data.direction
  }
}

function updatePlayer(id, info) {
  const targetPlayer = players[id] || {}

  players[id] = {
    ...targetPlayer,
    id,
    position: info.position,
    direction: info.direction
  }
}

function main(canvas, scene) {
  requestAnimationFrame(() => main(canvas, scene))
  scene.clearRect(0, 0, canvas.width, canvas.height)

  drawScene(scene)
}

const playerRef = () => `/players/${player.id}`

function loadPlayerInfos() {
  return new Promise(resolve => {
    database.ref(`/users/${user.id}`).once("value", userSnapshot => {
      player.id = userSnapshot.val().player

      database.ref(playerRef()).once("value", snapshot => {
        const { direction, username, x, y } = snapshot.val()

        player.direction = direction
        player.username = username
        player.position = [x, y]

        resolve()
      })
    })
  })
}

function savePlayerInfos() {
  return database.ref(playerRef()).update({
    direction: player.direction,
    x: player.position[0],
    y: player.position[1]
  })
}

function drawScene(scene) {
  drawMap(scene)
  drawPlayer(scene)
  drawPlayers(scene)
}

function drawMap(scene) {
  const { length: rows } = map

  for (let y = 0; y < rows; y++) {
    const { length: cols } = map[y]

    for (let x = 0; x < cols; x++) {
      const type = map[y][x]
      const caseInfo = getSpriteInfo({ type, x, y })

      drawSprite({ ...caseInfo, scene })
    }
  }
}

function drawPlayer(scene) {
  const playerInfo = getSpriteInfo({
    type: getPlayerSpriteType(player),
    x: player.position[0],
    y: player.position[1]
  })

  drawSprite({ ...playerInfo, scene })
}

function drawPlayers(scene) {
  for (let playerId in players) {
    const otherPlayer = players[playerId]
    const playerInfo = getSpriteInfo({
      type: getPlayerSpriteType(otherPlayer),
      x: otherPlayer.position[0],
      y: otherPlayer.position[1]
    })

    drawSprite({ ...playerInfo, scene })
  }
}

function getPlayerSpriteType(player) {
  return player.id === Caracter.ZELDA
    ? SpriteType.ZELDA[player.direction]
    : player.id === Caracter.PRINCESS
    ? SpriteType.PRINCESS[player.direction]
    : null
}

function getSpriteInfo({ type, x, y }) {
  return {
    type,
    x: x * config.case.width,
    y: y * config.case.height,
    width: config.case.width,
    height: config.case.height
  }
}

const spritesLoaded = {}

function drawSprite({ type, x, y, width, height, scene }) {
  if (spritesLoaded.hasOwnProperty(type)) {
    const sprite = spritesLoaded[type]

    scene.drawImage(sprite, x, y, width, height)

    return
  }

  const sprite = new Image()

  sprite.onload = () => {
    spritesLoaded[type] = sprite
    scene.drawImage(sprite, x, y, width, height)
  }
  sprite.src = resources[type]
}

function hasCollision(x, y) {
  return (
    map[y][x] !== SpriteType.GRASS ||
    Object.keys(players).some(playerId => {
      const { position } = players[playerId]

      return position[0] === x && position[1] === y
    })
  )
}

export function App() {
  const canvasRef = useRef()

  function init() {
    const canvas = document.querySelector("#scene")

    canvas.width = config.scene.width
    canvas.height = config.scene.height

    const scene = canvas.getContext("2d")

    scene.scale(scale, scale)

    loadPlayerInfos().then(() => {
      main(canvas, scene)
      startControls()
    })
    watchPlayersStates()
  }

  useEffect(init, [])

  return <canvas ref={canvasRef} id="scene" />
}
