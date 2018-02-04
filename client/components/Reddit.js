import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const RedditSearch = styled.section`
	&:hover {
		color:orangered;
		
		input[type="text"]{
			color:orangered;
			text-decoration: underline;
			text-decoration-style: dotted;
		}
  }
`;

const RedditItem = styled.div`
  /* all declarations will be prefixed */
  padding: 2em 1em;
  background: papayawhip;
  border:1px solid #eee;
  
  img{
  	opacity: .75;
  }

  /* pseudo selectors work as well */
  &:hover {
    background: #ffefd530;
    border:1px solid orangered;
    opacity: 1;
    
    a{
    	color:orangered;
    }
    
    img{
		opacity: 1;
	}
	
    h3 > a{
    	color: red;
    }
    
    p{
        color: coral;
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

class Reddit extends Component {
	constructor(props){
		super(props);
		this.state={
			data:{},
			items:[],
			search:'awww'
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
		let api=fetch('https://www.reddit.com/r/'+this.state.search+'/new.json?sort=new')
		.then((response) => response.json())
		.then((responseJson) => {
			console.log(responseJson.data.children);
			this.setState({data: responseJson});
			this.setState({items: responseJson.data.children});
		})
		.catch((error) => {
			console.error(error);
		});
	}

	handleClick(e){
		console.log(e.key);
		if(e.key == 'Enter' || e.target.value==='Go'){
			this.getAPI();
		}
	}
	handleChange(e){
		console.log(e.target.value);
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
		return (
			<main className="reddit">


				<RedditSearch>
					<h1>/r/</h1>
					<form onSubmit={this.handleSubmit}>
						<input type="text" defaultValue={this.state.search} onChange={this.handleChange} onKeyPress={this.handleClick} onFocus={this.handleFocus} onBlur={this.handleBlur}  />
					</form>
				</RedditSearch>


				<section className="reddit-list">
					{
						this.state.items &&
						this.state.items.map(item => (
						  <RedditItem key={item.data.id}>
							  <p><a href={`https://www.reddit.com/${item.data.subreddit_name_prefixed}`} target="_blank" rel="noopener">{item.data.subreddit_name_prefixed}</a></p>

							  <p><a href={`https://www.reddit.com/u/${item.data.author}`} target="_blank" rel="noopener">u/{item.data.author}</a></p>

							  {
								  item.data.thumbnail &&
								  <a href={`https://www.reddit.com/${item.data.permalink}`} target="_blank" rel="noopener"><img src={item.data.thumbnail} alt="" /></a>
							  }

							  {
								  item.data.url==='' &&
								  <a href={`https://www.reddit.com/${item.data.permalink}`} target="_blank" rel="noopener"><img src={item.data.url} alt="" /></a>
							  }

							  <h3><a href={`https://www.reddit.com/${item.data.permalink}`} target="_blank" rel="noopener">{item.data.title}</a></h3>

							  <p>Comments {item.data.num_comments}</p>
						  </RedditItem>
						))
					}
				</section>


			</main>
		);
	}
}

export default Reddit;