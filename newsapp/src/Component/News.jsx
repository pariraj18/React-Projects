import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dbe57b028aeb41e285a226a94865f7a7&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = async () => {
    this.setState({page: this.state.page - 1});
    this.updateNews();
  }

  handleNextClick = async () => {
    this.setState({page: this.state.page + 1});
    this.updateNews();
  }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin: '35px 0px'}}>NewsBird896 - Top {this.props.category} Headlines</h1>
        
        {this.state.loading && <Spinner/>}
        
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewsItem 
                title={element.title ? element.title.slice(0, 45) : ""} 
                description={element.description ? element.description.slice(0, 88) : ""} 
                imageUrl={element.urlToImage ? element.urlToImage : "https://in.images.search.yahoo.com/images/view;_ylt=Awr1UXbtWVRqZTgg8qu9HAx.;_ylu=c2VjA3NyBHNsawNpbWcEb2lkA2FjZTk1NGI5ZWU2NjAwNDQ0MTE3NzZjY2YxMDVkZGRmBGdwb3MDMjgEaXQDYmluZw--?back=https%3A%2F%2Fin.images.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Dnews%26type%3DE210IN885G0%26fr%3Dmcafee%26fr2%3Dpiv-web%26tab%3Dorganic%26ri%3D28&w=474&h=267&imgurl=st1.latestly.com%2Fwp-content%2Fuploads%2F2018%2F03%2Fdefault-img-01.jpg&rurl=https%3A%2F%2Fwww.latestly.com%2Fagency-news%2Findia-news-west-bengal-bjp-leader-sakharov-sarkar-conducts-bhumi-puja-for-ram-temple-in-murshidabad-7229873.html&size=106KB&p=news&oid=ace954b9ee660044411776ccf105dddf&fr2=piv-web&fr=mcafee&tt=India+News+%7C+West+Bengal%3A+BJP+Leader+Sakharov+Sarkar+Conducts+%26%2339%3BBhumi+...&b=0&ni=21&no=28&ts=&tab=organic&sigr=w_mSVga23Zae&sigb=NQMeIwrzncln&sigi=sX2BltfYQd0v&sigt=sc7Kd6gWr.2m&.crumb=7oIafgWYnTC&fr=mcafee&fr2=piv-web&type=E210IN885G0"}
                newsUrl={element.url} author={element.author ? element.author : "Unknown"} publishedAt={element.publishedAt ? new Date(element.publishedAt).toGMTString() : "Unknown"}
              />
            </div>
          ))}
        </div>
        
        <div className="container d-flex justify-content-between my-4">
          <button 
            disabled={this.state.page <= 1} 
            type="button" 
            className="btn btn-dark" 
            onClick={this.handlePrevClick}
          > 
            &larr; Previous
          </button>

          <button 
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} 
            type="button" 
            className="btn btn-dark" 
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    )
  }
}

export default News
