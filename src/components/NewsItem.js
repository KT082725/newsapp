import {React,useState} from 'react'
import monkey from './monkey.png'
const NewsItem =(props)=> {
  const [imageLoadError, setImageLoadError] = useState(false);
  const handleImageError = () => {
    setImageLoadError(true);
  };

    let {title,description,imageurl,newsUrl,author,date,source}=props;
    return (
      <div className='my-3'>
        <div className="card" style={{width: "18rem"}}>
        <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
    {source}
    </span>
    {imageLoadError ? (
      <img src={monkey} className="card-img-top" alt="monkey reading news" style={{ width: '286px', height: '186px' }}/>
    ) : (
      <img src={!imageurl?{monkey}:imageurl} className="card-img-top" alt="..." onError={handleImageError}/>
    )}
    
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small className="text-body-secondary">By {!author?'Unknown':author} on {new Date(date).toGMTString()}</small></p>
    <a href={newsUrl} target='blank' className="btn btn-dark btn-sm">Read More</a>
  </div>
</div>
      </div>
    )
  }


export default NewsItem
