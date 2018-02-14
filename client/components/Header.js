import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
	constructor(props){
		super(props);
		this.state={
			page:'',
			linkName:''
		};
		this.handleClick=this.handleClick.bind(this);
	}

	componentDidMount(){
		// console.log('props',location.pathname,this.props,this.props.path.slice(this.props.path.lastIndexOf('/')+1));
		let page=this.props.path.slice(this.props.path.lastIndexOf('/')+1);
		if(page==='giphy'){
			this.setState({page:'Giphy',linkName:'Reddit'});
		}else{
			this.setState({page:'Reddit',linkName:'Giphy'});
		}
	}
	
	handleClick(e){
		if(page==='giphy'){
			this.setState({page:'Reddit',linkName:'Giphy'});
		}else{
			this.setState({page:'Giphy',linkName:'Reddit'});
		}
	}

	render() {
		let page=this.state.page;
		let linkName=this.state.linkName;
		return (
		  <header className="App-header">
			  <nav>
				  <Link to={`/${linkName.toLowerCase()}`} onClick={this.handleClick}>
					  {linkName} <i className="fa fa-arrow-right" aria-hidden="true"></i>
				  </Link>
			  </nav>
			  <i className={(page==='Giphy' ? 'fa fa-picture-o fa-6' : 'fa fa-reddit-alien fa-6')} aria-hidden="true"></i>
			  <h1 className="App-title">Hello, {page}!</h1>
		  </header>
		);
	}
}

export default Header;