
import $ from "jquery"
import React from "react"


export default class Body extends React.Component {
  constructor() {
    var arr = []
    
    for (var i = 1; i <= 10; i++) {
      var row = []
      for (var j = 1; j <= 10; j++) {
        row.push(0)

        if (j == 10) {
          arr.push(row)
        }
      }
    }
    
    super()
    this.state = {
      currentBoard: arr,
      generations: 0,
      repeat: null
    }
  }

  changeCellStatus(event) {
    var id = event.target.id
    var location = id.substr(id.indexOf(':') + 1).split('-')
    var x = Number(location[0])
    var y = Number(location[1])
    
    var currentBoard = this.state.currentBoard
    currentBoard[x][y] = (currentBoard[x][y] == 0) ? 1 : 0
      
    this.setState({currentBoard: currentBoard})
  }

	render() {
    var boardSize = this.props.currentBoardDisplayed

    //clear the board after change

    const cellAlive = {backgroundColor: 'black',
                       color: 'white'}
    const cellDead = {backgroundColor: 'white',
                      color: 'black'}

		return (
      <div>
        <div id="boardContainer" className="container-fluid">
          <div className="flex-container">
            {
              this.state.currentBoard.map((column, columnNr) => { 
                var cells = column.map((cell, rowNr) => {
                    var cellStyle = (cell == 0) ? cellDead : cellAlive

                    return <div key={rowNr}
                                id={"cell:"+columnNr+"-"+rowNr}
                                style={cellStyle} 
                                className="flex-item"
                           onClick={this.changeCellStatus.bind(this)}></div>
                  })
                return <div key={columnNr} className ="rows">{cells}</div>
              })
            }
          </div>
        </div>
      </div>
		)
	}
}