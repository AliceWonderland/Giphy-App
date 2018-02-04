import React, { Component } from 'react';

class Header extends Component {
	constructor(props){
		super(props);
		this.state=this.props;
	}

	componentDidMount(){
		// console.log('props',this.props.path.slice(this.props.path.lastIndexOf('/')+1));
	}

	render() {
		let page=this.props.path.slice(this.props.path.lastIndexOf('/')+1);
		return (
		  <header className="App-header">
			  <i className={(page==='giphy' ? 'fa fa-picture-o fa-6' : 'fa fa-reddit-alien fa-6')} aria-hidden="true"></i>
			  <h1 className="App-title">Hello, {(page==='giphy' ? 'Giphy' : 'Reddit')}!</h1>
		  </header>
		);
	}
}

export default Header;