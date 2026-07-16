import React, { Component } from 'react'

export class NewsItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      imageError: false  // image fail hui ya nahi track karenge
    }
  }

  render() {
    let {title, description, imageUrl, newsUrl, author, publishedAt, source} = this.props;
    
    return (
      <div className='my-3'>
        <div className="card" style={{width: "18rem"}}>
          <div style={{display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0'}}>
          <span className=" badge rounded-pill bg-danger">{source}</span>
          {/* Sirf tabhi img dikhao jab imageUrl ho AUR error na aayi ho */}
          </div>
          {imageUrl && !this.state.imageError && 
            <img 
              src={imageUrl} 
              alt="news"
              referrerPolicy="no-referrer" 
              onError={() => this.setState({imageError: true})} // error aayi to state change
              style={{height: '200px', objectFit: 'cover'}}
            />
          }
          
          <div className="card-body">
            <h5 className="card-title">{title} <span className="badge bg-secondary">New</span></h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary">By {author ? author : "Unknown"} on {new Date(publishedAt).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem