import React,{ useState,useEffect } from 'react';
import classes from './Movies.module.css';
import MovieDetails from './MovieDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import MovieForm from './MovieForm';
import { API } from './api-service';



function Movies(props) {
    const [movie,setMovie]=useState([]);
    const [selectedMovie, setSelectedMovie]=useState(null);
    const [editedMovie, setEditedMovie]=useState(null);
    useEffect(()=>{
        fetch("http://127.0.0.1:8000/api/movies/",{
            method: 'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Token b7c3e05aa76c115ed8b612276ad29c77e59a38a6'
            }
        })
        .then( resp => resp.json())
        .then( resp => setMovie(resp))
        .catch( error => console.log(error))
    },[])

    // const movieClicked = movie => evt => {
    //     setSelectedMovie(movie);
    //     setEditedMovie(null)

    // }

    const loadMovie= movie =>{
        setSelectedMovie(movie);
        setEditedMovie(null);
        // console.log(editedMovie)
    
    }

    const editClicked = movie => {
        setEditedMovie(movie);
        setSelectedMovie(null);
        // console.log(editedMovie)
    }

    const updatedMovie= pmovie =>{
        const newMovies=movie.map( mov => {
            if (mov.id===pmovie.id) {
                return pmovie;
            }
            return mov;
        })
    setMovie(newMovies)
    }
    
    const newMovie=() => {
        setEditedMovie({title:'', description:''});
        setSelectedMovie(null);

    }

    const movieCreated= mov => {
        const newMovies=[...movie,mov];
        setMovie(newMovies);

    }

    const removeClicked = pmovie => {
        API.deleteMovie(pmovie.id)
        .then(()=>deleted(pmovie))
        .catch(error=> console.log(error))
    }
    const deleted =pmovie =>
    {
        const newMovies=movie.filter(mov => mov.id !== pmovie.id);
        setMovie(newMovies);
    }
 

    return(
        <React.Fragment>
    <div className={classes.Movies}>
        <div className={classes.MovieTitles}>
            {movie.map( mov => {
            return(
                <div key = {mov.id} className={classes.MovieItem}>
                    <p onClick={()=>loadMovie(mov)}>{mov.title}</p>
                    <FontAwesomeIcon icon={faEdit} onClick={()=>editClicked(mov)}/>
                    <FontAwesomeIcon icon={faTrash} onClick={()=>removeClicked(mov)}/>
                </div>
               ) 
           
        })}
        
        <button onClick={newMovie}>New Movie</button>
        </div>
        <MovieDetails movie={selectedMovie} updateMovie={loadMovie}/>
            {editedMovie?
                <MovieForm movie={editedMovie} updatedMovie={updatedMovie} movieCreated={movieCreated}/>
                :null
            }
            
        </div>
        </React.Fragment>
    )
}

export default Movies;