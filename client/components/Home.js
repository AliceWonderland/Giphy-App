import React, { Component } from 'react';

class Home extends Component {
	constructor(props){
		super(props);
		this.state=this.props;
	}

	render() {
		return (
		  <div>
			  <h1>Home</h1>
		  </div>
		);
	}
}

export default Home;