import React,{useState} from 'react';
import classes from './MovieDetails.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';



function MovieDetails(props) {
    const [highlighted,setHighlighted] = useState(-1)
    const highlightRate = high => evt =>
    {
        setHighlighted(high);
    }
    const rateClicked = rating => evt => {
        
            fetch(`http://127.0.0.1:8000/api/movies/${props.movie.id}/rate_movie/`,{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Token b7c3e05aa76c115ed8b612276ad29c77e59a38a6'
                },
                body: JSON.stringify({stars:rating+1})
            })
     
            .then( () => getDetails())
            .catch( error => console.log(error))
        
    }

    const getDetails = () => {
        
        fetch(`http://127.0.0.1:8000/api/movies/${props.movie.id}/`,{
            method: 'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Token b7c3e05aa76c115ed8b612276ad29c77e59a38a6'
            }
            
        })
        .then( resp => resp.json())
        .then( resp => props.updateMovie(resp))
        .catch( error => console.log(error))
    
}

    return(
        <React.Fragment>
        
    <div>
        {props.movie ?(
        <div>
              
        <p>{props.movie.title}</p>
        <p>{props.movie.description}</p>
        <FontAwesomeIcon icon={faStar} className= { props.movie.avg_rating  > 0 ? classes.orange : ''}/>
        <FontAwesomeIcon icon={faStar} className= { props.movie.avg_rating  > 1 ? classes.orange : ''}/>
        <FontAwesomeIcon icon={faStar} className= { props.movie.avg_rating  > 2 ? classes.orange : ''}/>
        <FontAwesomeIcon icon={faStar} className= { props.movie.avg_rating  > 3 ? classes.orange : ''}/>
        <FontAwesomeIcon icon={faStar} className= { props.movie.avg_rating  > 4 ? classes.orange : ''}/>  
        <p>({props.movie.no_of_ratings})</p>
        
        <div className={classes.rate}>
                <h3>Rate the Movie</h3>
                {
                    [...Array(5)].map( (e,i) => {
                        return <FontAwesomeIcon key = {i} icon={faStar} className= { highlighted  > i-1 ? classes.purple : ''} 
                        onMouseEnter={highlightRate(i)}
                        onMouseLeave={highlightRate(-1)}
                        onClick={rateClicked(i)} 
                        />
                        
                        
                    }
                    )
                }
        </div>


    </div>
    ): null }
    </div>
    </React.Fragment>
    )
    
}

export default MovieDetails;