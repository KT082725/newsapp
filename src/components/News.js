import React,{useEffect,useState} from "react";
import NewsItem from "./NewsItem";
import Spiner from "./Spiner";
import PropTypes from "prop-types";

const News=(props)=>{
  const[articles,setArticles]=useState([])
  const[loading,setLoading]=useState(true)
  const[page,setPage]=useState(1)
  const[totalResults,setTotalResults]=useState(0)
    const  CapitlizeText=(word)=>
    {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    document.title=`${CapitlizeText(props.category)}-NewsMonkey`;
  const updateNews=async()=>{
    props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apikey=2acc7a8d7110456ab06e0384a42d52b7&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }
  useEffect(()=>{
    updateNews();
  },[])
  const handlePrevClick = async () => {
    setPage(page-1);
    updateNews();
  };
  const handleNextClick = async () => {
    setPage(page+1);
    updateNews();
  };
    return (
      <div className="container  my-3">
        <h1
          className="text-center"
          style={{ margin: "40px 0px" }}
        >
          NewsMonkey - Top Headlines {CapitlizeText(props.category)}
        </h1>
        {loading && <Spiner />}
        <div className="row">
          {!loading &&
            articles &&
            articles.map((element) => {
              return (
                <div
                  className="col-md-4"
                  key={element.url}
                >
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imageurl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          <div className="container d-flex justify-content-around">
            <button
              disabled={page <= 1}
              type="button"
              className="btn btn-dark"
              onClick={handlePrevClick}
            >
              &#8592; Previous
            </button>
            <button
              disabled={
                (page + 1) >
                Math.ceil(totalResults / props.pageSize)
              }
              type="button"
              className="btn btn-dark"
              onClick={handleNextClick}
            >
              {" "}
              Next &#8594;
            </button>
          </div>
        </div>
      </div>
    );
  
  
}
News.defaultProps = {
  country: "in",
  PageSize: 8,
  caategory: "general",
};
News.propTypes = {
  country: PropTypes.string,
  PageSize: PropTypes.number,
  caategory: PropTypes.string,
};
export default News;
