import React, { Component } from 'react'

export class
 NewsItem extends Component {
  render() {
    let { title, description,imageUrl,newsUrl,author,publishedAt} = this.props;
    let defaultImage = "https://a57.foxnews.com/static.foxbusiness.com/foxbusiness.com/content/uploads/2026/05/0/0/san-francisco-neighborhood-01.jpg?ve=1&tl=1";
    return (
      <div className='my-3'>
        <div className="card" style={{width: "18rem"}}>
  <img src={imageUrl ? imageUrl : defaultImage} className="card-img-top" alt="News Image"/>
  <div className="card-body">
    <h5 className=" card-title "> {title} <span className="badge bg-secondary">New</span></h5>
    <p className="card-text ">{description}</p>
    <p className="card-text"><small className="text-body-secondary">By {author} on {publishedAt}</small></p>
    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>

  </div>
</div>
      </div>
    )
  }
}

export default NewsItem
