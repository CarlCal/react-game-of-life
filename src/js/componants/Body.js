
import $ from "jquery"
import React from "react"

import Grid from "./Grid"

export default class Body extends React.Component {

	constructor() {
    super()
    this.state = {
      currentBoard: this.initBoardSize(70, 50),
      cellSize: 'mediumCells',
      generations: 0,
      repeat: null
    }
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
  	
  	if (id[1] === 'smallBoard') {
  		this.setState({currentBoard: this.initBoardSize(50, 30),
  									 cellSize: 'smallCells'})
  		$('div#boardContainer').css({'width': '700px', 'height': '420px'})
  	} else if (id[1] === 'mediumBoard') {
  		this.setState({currentBoard: this.initBoardSize(70, 50),
  									 cellSize: 'mediumCells'})
  		$('div#boardContainer').css({'width': '840px', 'height': '600px'})
  	} else if (id[1] === 'largeBoard') {
  		this.setState({currentBoard: this.initBoardSize(100, 80),
  									 cellSize: 'largeCells'})
  		$('div#boardContainer').css({'width': '900px', 'height': '720px'})
  	}
  }

  changeCellStatus(x, y) {
  	var currentBoard = this.state.currentBoard
    currentBoard[x][y] = (currentBoard[x][y] == 0) ? 1 : 0
      
    this.setState({currentBoard: currentBoard})
  }

	render() {
		return (
			<div id="gameBoard">
				<Grid currentBoardDisplayed={this.state.currentBoard} 
							cellSize={this.state.cellSize}
							changeCellStatus={this.changeCellStatus.bind(this)}/>
				<div id="controll-center" class="container">
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
					<div class="btn-group btn-group-justified" role="group" aria-label="...">
					  <div class="btn-group" role="group">
					    <button type="button" class="btn btn-default">Slow</button>
					  </div>
					  <div class="btn-group" role="group">
					    <button type="button" class="btn btn-default">Medium</button>
					  </div>
					  <div class="btn-group" role="group">
					    <button type="button" class="btn btn-default">Fast</button>
					  </div>
					</div>
					<div class="btn-group btn-group-justified" role="group" aria-label="...">
					  <div class="btn-group" role="group">
					    <button type="button" class="btn btn-default">Play</button>
					  </div>
					  <div class="btn-group" role="group">
					    <button type="button" class="btn btn-default">Pause</button>
					  </div>
					  <div class="btn-group" role="group">
					    <button type="button" class="btn btn-default">Clear</button>
					  </div>
					</div>
				</div>
			</div>
		)
	}
}