import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  
  constructor() {
    super();
    console.log("Hello I am a constructor from news component");
    this.state = {
     articles: [],
      loading: false
    }
  }
  componentDidMount() {
     let url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=7dbf7009390249a59906ef18c7207329";
     let data = fetch(url);
     data.then((response) => {
       return response.json();
     }).then((parsedData) => {
       console.log(parsedData);
       this.setState({ articles: parsedData.articles })
     })


  }
  render() {
    return (
      <div className='container my-3'>
        <h1>NewsBird- Top Headlines</h1>
        {this.state.articles.map((element) => {
          return <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url}  className="one-line"/>
          </div>
        })}
      </div>
    )
  }
}

export default News
