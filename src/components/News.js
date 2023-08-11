import PropTypes from 'prop-types'  // impt command
import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }


    //order of execution is: constructor -> render() -> componentDidMount()
    //componentDidMount() is used for getting data from the newsapi directly.
    //pageSize is the number of articles per page in the site.
  capitalize = s => s && s[0].toUpperCase() + s.slice(1)
  constructor(props){
    super(props)
    console.log("inside constructor")
    this.state = {
      articles : [],
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalize(this.props.category)} - NewsToday`
  }

  async updateOnClick(){
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    let data = await fetch(url)
    let parsedData = await data.json()
     //console.log(parsedData)
    this.setState({articles : parsedData.articles, totalResults : parsedData.totalResults, loading: false})
    this.props.setProgress(100);

  }

  async componentDidMount() {
     this.updateOnClick();
  }

   handlePrevClick = async () => {
    this.setState({page: this.state.page-1})
    this.updateOnClick();
  }

  handleNextClick = async () => {
    console.log("Next")
    if (!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
      this.setState({page: this.state.page+1})
      this.updateOnClick();
    }
  }

  fetchMoreData = async () => {
    this.setState({page: this.state.page + 1})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({articles : this.state.articles.concat(parsedData.articles), totalResults : parsedData.totalResults, loading: false})
  };

  render() {
    let defaultUrl = "https://thumbs.dreamstime.com/b/news-34802664.jpg"
    return (
      <>
          <h1 className="text-center my-5 py-3">NewsToday - Top HeadLines</h1>
          {this.state.loading && <Spinner/>}
          
            <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader= {<Spinner />}
            >
              <div className="container">
                <div className="row">
                  {this.state.articles.map((element)=>{ 
                        return <div className="col-md-4 my-2" key={element.url}>
                        <NewsItem title={element.title?element.title:"..."} description={element.description?element.description:"..."} imgUrl={element.urlToImage?element.urlToImage:defaultUrl} newsUrl={element.url} author={element.title} date={element.publishedAt}/>
                      </div>
                  })}
                </div>
              </div>
            </InfiniteScroll>
          
          {/* <div className="container d-flex justify-content-between my-3">
              <button type="button" disabled={this.state.page<=1?true:false} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
              <button type="button" disabled={this.state.page===Math.ceil(this.state.totalResults/this.props.pageSize)?true:false} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div> */}
      </>
    )
  }
}

