
import React, {useEffect, useState} from 'react'

import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=>{
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    const safeArticles = Array.isArray(articles) ? articles : []
    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 

    const updateNews = async ()=> {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`; 
        setLoading(true)
        try {
            const data = await fetch(url);
            props.setProgress(30);
            const parsedData = await data.json();
            props.setProgress(70);

            if (!data.ok) {
                throw new Error(parsedData.message || 'Unable to load news');
            }

            setArticles(Array.isArray(parsedData.articles) ? parsedData.articles : []);
            setTotalResults(Number.isFinite(parsedData.totalResults) ? parsedData.totalResults : 0);
        } catch (error) {
            console.error('Unable to load news:', error);
            setArticles([]);
            setTotalResults(0);
        } finally {
            setLoading(false);
            props.setProgress(100);
        }
    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsBird`;
        updateNews(); 
        // eslint-disable-next-line
    }, [])


    const fetchMoreData = async () => {   
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1) 
        try {
            const data = await fetch(url);
            const parsedData = await data.json();

            if (!data.ok) {
                throw new Error(parsedData.message || 'Unable to load more news');
            }

            const nextArticles = Array.isArray(parsedData.articles) ? parsedData.articles : [];
            setArticles((currentArticles) => currentArticles.concat(nextArticles));
            setTotalResults(Number.isFinite(parsedData.totalResults) ? parsedData.totalResults : 0);
        } catch (error) {
            console.error('Unable to load more news:', error);
        }
      };
 
        return (
            <>
                <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>NewsBird - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={safeArticles.length}
                    next={fetchMoreData}
                    hasMore={safeArticles.length < totalResults}
                    loader={<Spinner/>}
                > 
                    <div className="container">
                         
                    <div className="row">
                        {safeArticles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedAt
                                
                                ={element.publishedAt} source={element.source?.name || "Unknown source"} />
                            </div>
                        })}
                    </div>
                    </div> 
                </InfiniteScroll>
            </>
        )
    
}


News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
