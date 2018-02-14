import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const GiphySearch = styled.section`
	&:hover {
		color:deeppink;
		
		input[type="text"]{
			color:deeppink;
			text-decoration: underline;
			text-decoration-style: dotted;
		}
  }
`;

const GiphyItem = styled.div`
  /* all declarations will be prefixed */
  padding: 2em 1em;
  border:1px solid #eee;
  
  > *{
  	zoom:0.5;
  }
  
  
  a{
  	text-decoration:none;
  }
  a:hover{
  	text-decoration:underline;
  }
  a:not(:last-child) {
    margin-right: 10px;
	}
  
  img{
  	opacity: .75;
  	width: 
  }
  
  h2{
  	text-transform: capitalize;
  }

  /* pseudo selectors work as well */
  &:hover {
    background: #ffb6c11f;
  	border:1px solid deeppink;
    opacity: 1;
    
    a{
    	color:hotpink;
    }
    a:hover, a > *:hover{
		color: deeppink;
	}
    
    img{
		opacity: 1;
	}
	
	h2{
		color:deeppink;
	}
    h2 > a{
    	color: deeppink;
    }
    
    p{
        color: lightpink;
	}
  }

  /* media queries are no problem */
  @media (max-width: 600px) {
    background: tomato;

    /* nested rules work as expected */
    &:hover {
      background: yellow;
    }
  }

  > p {
    /* descendant-selectors work as well, but are more of an escape hatch */
    // text-decoration: underline;
  }

  /* Contextual selectors work as well */
  html.test & {
    display: none;
  }
`;

class Giphy extends Component {
	constructor(props){
		super(props);
		this.state= {
			gifs: [],
			searchHistory:[],
			search: 'trending'

		};
		this.handleChange=this.handleChange.bind(this);
		this.handleClick=this.handleClick.bind(this);
		this.handleFocus=this.handleFocus.bind(this);
		this.handleBlur=this.handleBlur.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
	}

	componentDidMount(){
		this.getAPI();
	}

	getAPI(){
		console.log('getapi',this.state.search);
		let api=fetch('https://api.giphy.com/v1/gifs/search?api_key=f4ee250fb7fc4ccf88cc2260099165c8&q='+this.state.search+'&limit=25&offset=0&rating=G&lang=en')
		.then((response) => response.json())
		.then((responseJson) => {
			if(this.state.searchHistory.indexOf(this.state.search)<0){
				this.setState({gifs: responseJson.data,searchHistory:[this.state.search,...this.state.searchHistory]});
			}else{
				this.setState({gifs: responseJson.data});
			}
		})
		.catch((error) => {
			console.error(error);
		});

		// https://api.giphy.com/v1/gifs/search?api_key=f4ee250fb7fc4ccf88cc2260099165c8&q=puppies&limit=25&offset=0&rating=G&lang=en
	}

	handleClick(e){
		// if click is from sidebar
		if(typeof e === 'string'){
			this.setState({search:e},() => {
				this.getAPI();
			});
			return;
		}
		console.log('key',e.key, e, e.target, e.target.key, e.target.value);

		// if click is from search form
		if(e.key == 'Enter' || e.target.value==='Go'){
			this.getAPI();
		}
	}
	handleChange(e){
		this.setState({search:e.target.value});
	}
	handleFocus(e){
		e.target.value='';
	}
	handleSubmit(e){
		e.preventDefault();
	}
	handleBlur(e){
		e.target.value=this.state.search;
	}

	render() {
		let gifs=this.state.gifs;
		let history=this.state.searchHistory;

		return (
		  <main className="giphy">

			  <GiphySearch>
				  <h1>#</h1>
				  <form onSubmit={this.handleSubmit}>
					  <input type="text" value={this.state.search} onChange={this.handleChange} onKeyPress={this.handleClick} onFocus={this.handleFocus} onBlur={this.handleBlur}  />
				  </form>
			  </GiphySearch>

			  <section>

				  <section className="giphy-history">
					  <h2>Search History</h2>
					  <ul>
						  {
							  history.map((item,ind) => (
								<li key={`${ind}${item}`} onClick={() => this.handleClick(item)} value={item}>#{item}</li>
							  ))
						  }
					  </ul>
				  </section>

				  <section className="giphy-list">
					  {
						  this.state.gifs &&
						  gifs.map(item => (
							<GiphyItem key={item.id}>
								<h2><a href={item.bitly_url} target="_blank" rel="noopener">{item.title}</a></h2>
								<a href={item.bitly_url} target="_blank" rel="noopener"><img src={item.images.preview_gif.url} alt="" /></a>

								{/*"import_datetime": "2014-01-09 15:05:31",*/}
								{/*"trending_datetime": "2017-04-11 18:49:07",*/}
								<p><a href={item.bitly_url} target="_blank" rel="noopener"><i className="fa fa-heart" aria-hidden="true"></i></a>
									<a href={item.bitly_url} rel="noopener"><i className="fa fa-download" aria-hidden="true"></i></a>
									<a href={item.bitly_url} rel="noopener"><i className="fa fa-link" aria-hidden="true"></i></a>
								</p>
							</GiphyItem>
						  ))
					  }
				  </section>

			  </section>

		  </main>
		);
	}
}

export default Giphy;