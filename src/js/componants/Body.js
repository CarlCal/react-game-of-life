
import React from "react"

import Grid from "./Grid"

export default class Body extends React.Component {

	constructor() {
    super()
    this.state = {
      boardDisplayed: {}
    }
  }

  componentDidMount() {
  	this.setState({ boardDisplayed: "mediumBoard" })
  }

  handleBoardSize(event) {
  	var id = event.target.id.split('-')
  	var currentBoard = {}

  	if (id[1] == 'smallBoard') {
  		$('#flex-container').css('width', '700px').css('height', '420px')
  		$(".flex-item").css('width', '14px').css('height', '14px')
  		currentBoard = {size: 'smallBoard', width: 50, height: 30}
  	}

  	this.setState({ boardDisplayed: currentBoard })
  }

	render() {
		return (
			<div id="gameBoard">
				<Grid currentBoardDisplayed={this.state.boardDisplayed} />
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