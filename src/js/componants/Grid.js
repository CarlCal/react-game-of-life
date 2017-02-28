
import React from "react"


export default class Body extends React.Component {

  handleCellStatus(event) {
    var id = event.target.id
    var location = id.substr(id.indexOf(':') + 1).split('-')

    this.props.changeCellStatus(Number(location[0]), Number(location[1]))
  }

	render() {
    const cellAlive = {backgroundColor: 'black',
                       color: 'white'}
    const cellDead = {backgroundColor: 'white',
                      color: 'black'}
		return (
      <div>
        <div id="boardContainer" className="container-fluid">
          <div className="flex-container">
            {
              this.props.currentBoardDisplayed.map((column, columnNr) => { 
                var cells = column.map((cell, rowNr) => {
                    var cellStyle = (cell == 0) ? cellDead : cellAlive

                    return <div key={rowNr}
                                id={"cell:"+columnNr+"-"+rowNr}
                                style={cellStyle} 
                                className={"flex-item "+this.props.cellSize}
                           onClick={this.handleCellStatus.bind(this)}></div>
                  })
                return <div className='rows' key={columnNr}>{cells}</div>
              })
            }
          </div>
        </div>
      </div>
		)
	}
}