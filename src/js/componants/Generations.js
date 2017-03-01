
import React from "react"

export default class Generations extends React.Component {
	render() {
		return <div id="generationShowcase" class="container">{this.props.generations}</div>
	}
}