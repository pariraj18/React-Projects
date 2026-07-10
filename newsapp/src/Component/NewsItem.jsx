import React, { Component } from 'react'

export class
 NewsItem extends Component {
  render() {
    let { title, description,imageUrl,newsUrl} = this.props;
    let defaultImage = "https://a57.foxnews.com/static.foxbusiness.com/foxbusiness.com/content/uploads/2026/05/0/0/san-francisco-neighborhood-01.jpg?ve=1&tl=1";
    return (
      <div className='my-3'>
        <div className="card" style={{width: "18rem"}}>
  <img src={imageUrl ? imageUrl : defaultImage} className="card-img-top" alt="News Image"/>
  <div className="card-body">
    <h5 className=" card-title "> {title}</h5>
    <p className="card-text ">{description}</p>
    <a href={newsUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem
