import React, { Component } from 'react';

class App extends Component {
	constructor(props){
		super(props);
		this.state=this.props;
	}

	render() {
		return (
		  <div>
			  <h1>App</h1>
		  </div>
		);
	}
}

export default App;