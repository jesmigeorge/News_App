import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class NewsItem extends Component {
  
//   static propTypes = {second: third}
  render() {
    let {title,description,imgUrl,newsUrl,author,date} = this.props
    return (
      <div className="card" style={{width: "18rem"}}>
        <img className="card-img-top" src={imgUrl} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
          <p className='card-text'><small className="text-mutated">By {!author?"Unknown":author} on {date}</small></p>
        </div>
      </div>
    )
  }
}


