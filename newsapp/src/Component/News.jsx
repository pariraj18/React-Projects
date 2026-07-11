import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  
  constructor() {
    super();
    console.log("Hello I am a constructor from news component");
    this.state = {
     articles: [],
      loading: false,
      page:1
    }
  }
  componentDidMount() {
     let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=7dbf7009390249a59906ef18c7207329&page=1&pageSize=${this.props.pageSize}`;
            let data = fetch(url);
             data.then((response) => {
       return response.json();
     }).then((parsedData) => {
       console.log(parsedData);
       this.setState({ articles: parsedData.articles })
     })


  }
  handlePreviousClick = async () => {
    console.log("Previous");
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=7dbf7009390249a59906ef18c7207329&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles
    })
  }
  handleNextClick = async () => {
    console.log("Next");
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=7dbf7009390249a59906ef18c7207329&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles
    })
  } 
  render() {
    return (
    <div className='container my-3'>
      <h1 className="text-center">NewsBird- Top Headlines</h1>
      <div className="row">

        {this.state.articles.map((element) => (
          <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url}  className="one-line"/>
          </div>
        ))}
      </div>
      <div className="container d-flex justify-content-between">
        <button disabled={this.state.page <= 1} onClick={this.handlePreviousClick} className="btn btn-dark"> &laquo; Previous</button>
        <button disabled={this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNextClick} className="btn btn-dark">Next &raquo;</button>
      </div>
      </div>
    )
  }
}

export default News
