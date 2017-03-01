
import $ from "jquery"
import React from "react"

import Grid from "./Grid"
import Generations from "./Generations"

export default class Body extends React.Component {

	constructor() {

		var arr = []

  	for (var i = 0; i < 70; i++) {
      var row = []
      for (var j = 0; j < 50; j++) {
      	var random = Math.floor(Math.random() * 2) + 0
        row.push(random)
        if (j === 49) {
          arr.push(row)
        }
      }
    }

    super()
    this.state = {
      currentBoard: arr,
      boardSize: {width: 69, height: 49},
      cellSize: 'mediumCells',
      generations: 0,
      repeat: null
    }
  }

  componentDidMount() {
    this.startGame()
  }

  initBoardSize(width, height) {
		var arr = []

  	for (var i = 0; i < width; i++) {
      var row = []
      for (var j = 0; j < height; j++) {
        row.push(0)

        if (j === height-1) {
          arr.push(row)
        }
      }
    }
    return arr
  }

  handleBoardSize(event) {
  	var id = event.target.id.split('-')
  	this.clearGame()
  	
  	if (id[1] === 'smallBoard') {
  		this.setState({currentBoard: this.initBoardSize(50, 30),
	  								 boardSize: {width: 49, height: 29},
	  								 cellSize: 'smallCells'})
  		$('div#boardContainer').css({'width': '700px', 'height': '420px'})
  	} else if (id[1] === 'mediumBoard') {
  		this.setState({currentBoard: this.initBoardSize(70, 50),
  									 boardSize: {width: 69, height: 49},
  									 cellSize: 'mediumCells'})
  		$('div#boardContainer').css({'width': '840px', 'height': '600px'})
  	} else if (id[1] === 'largeBoard') {
  		this.setState({currentBoard: this.initBoardSize(100, 80),
  									 boardSize: {width: 99, height: 79},
  									 cellSize: 'largeCells'})
  		$('div#boardContainer').css({'width': '900px', 'height': '720px'})
  	}
  }

  changeCellStatus(x, y) {
  	var currentBoard = this.state.currentBoard
    currentBoard[x][y] = (currentBoard[x][y] == 0) ? 1.5 : 0
      
    this.setState({currentBoard: currentBoard})
  }

  startGame() {
    var board = this.state.currentBoard
    var width = this.state.boardSize.width
    var height = this.state.boardSize.height
    var nextBoard = this.initBoardSize(width+1, height+1)
    var neighborsCheck = []
    var generations = this.state.generations
    
    $('.flex-container').css({'pointer-events': 'none'})
    $('#playButton').css({'pointer-events': 'none'})

    for (var x = 0; x < width+1; x++) {
      for (var y = 0; y < height+1; y++) {
        
				if((y == 0 && x == 0) || (y == height && x == width) ||
           (y == height && x == 0) || (y == 0 && x == width)) {
          
            neighborsCheck =
            [ 
              board[1][0], board[0][1], board[1][1],
              board[width-1][0], board[width-1][1], board[width][1],
              board[0][height-1], board[1][height-1], board[1][height],
              board[width-1][height], board[width-1][height-1], board[width][height-1]
            ]
          
         } else if (y == 0) {
           neighborsCheck =
           [ 
            board[x-1][height], board[x][height], board[x+1][height],
            board[x][y+1], board[x+1][y], board[x-1][y], 
            board[x+1][y+1], board[x-1][y+1]
           ]
          
         } else if (y == height) {
            neighborsCheck =
           [ 
            board[x-1][0], board[x][0], board[x+1][0],
            board[x+1][y], board[x-1][y], board[x][y-1], 
            board[x+1][y-1], board[x-1][y-1]
           ]
          
         } else if (x == 0) {
           neighborsCheck =
           [ 
            board[width][y], board[width][y+1], board[width][y-1],
            board[x+1][y], board[x][y+1], board[x][y-1], 
            board[x+1][y-1], board[x+1][y+1]
           ]
           
        } else if (x == width) {
          neighborsCheck =
           [ 
            board[0][y], board[0][y+1], board[0][y-1],
            board[x-1][y], board[x][y+1], board[x][y-1], 
            board[x-1][y-1], board[x-1][y+1]
           ]
          
        } else {
          neighborsCheck =
           [ 
            board[x][y-1], board[x+1][y-1], board[x+1][y],
            board[x+1][y+1], board[x][y+1], board[x-1][y+1], 
            board[x-1][y], board[x-1][y-1]
           ]
        }
        
        neighborsCheck = neighborsCheck.reduce((acc, val) => {
          return Math.floor(acc + val)
        }, 0)

        if ((Math.floor(board[x][y]) == 1) && (neighborsCheck < 2)) {nextBoard[x][y] = 0}
        else if ((Math.floor(board[x][y]) == 1) && (neighborsCheck > 3)) {nextBoard[x][y] = 0}
        else if ((board[x][y] == 0) && (neighborsCheck == 3)) {nextBoard[x][y] = 1.5}
        else if ((board[x][y] == 1.5) && (neighborsCheck == 2) || (neighborsCheck == 3)) {nextBoard[x][y] = 1}
        else {nextBoard[x][y] = board[x][y]}
      }
    }
    this.setState({currentBoard: nextBoard,
                   repeat: setTimeout(this.startGame.bind(this), 70),
                 	 generations: generations + 1})

    console.log(this.state.generations)
  }

  pauseGame() {
    clearTimeout(this.state.repeat)
    $('.flex-container').css({'pointer-events': 'auto'})
    $('#playButton').css({'pointer-events': 'auto'})
  }

  clearGame() {
  	var width = this.state.boardSize.width+1
  	var height = this.state.boardSize.height+1

  	this.pauseGame()
  	this.setState({currentBoard: this.initBoardSize(width, height),
  								 generations: 0})
  }

	render() {
		return (
			<div id="gameBoard">
				<div class="container controll-center">
					<div class="btn-group btn-group-justified" role="group" aria-label="...">
					  <div class="btn-group" role="group">
					    <button id="playButton" onClick={this.startGame.bind(this)} type="button" class="btn btn-default">Play</button>
					  </div>
					  <div class="btn-group" role="group">
					    <button onClick={this.pauseGame.bind(this)} type="button" class="btn btn-default">Pause</button>
					  </div>
					  <div class="btn-group" role="group">
					    <button onClick={this.clearGame.bind(this)} type="button" class="btn btn-default">Clear</button>
					  </div>
					</div>
				</div>
				<Grid currentBoardDisplayed={this.state.currentBoard} 
							cellSize={this.state.cellSize}
							changeCellStatus={this.changeCellStatus.bind(this)}/>
				<div class="container controll-center">
					<div class="btn-group btn-group-justified" role="group" aria-label="...">
					  <div class="btn-group" role="group">
					    <button id="btn-smallBoard" onClick={this.handleBoardSize.bind(this)} type="button" class="btn btn-default">Small</button>
					  </div>
					  <div class="btn-group" role="group">
					    <button id="btn-mediumBoard" onClick={this.handleBoardSize.bind(this)} type="button" class="btn btn-default">Medium</button>
					  </div>
					  <div class="btn-group" role="group">
					    <button id="btn-largeBoard" onClick={this.handleBoardSize.bind(this)} type="button" class="btn btn-default">Large</button>
					  </div>
					</div>
				</div>
				<Generations generations={this.state.generations} />
			</div>
		)
	}
}