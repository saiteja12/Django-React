import React, {useState,useEffect} from 'react';
import { API } from './api-service';

function MovieForm(props) {
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    
    useEffect(() => {
        setTitle(props.movie.title);
        setDescription(props.movie.description);
    },[props.movie])
    
    const updateClicked = () => {
        console.log('updated');
        API.updateMovie(props.movie.id,{title:title,description:description})
        .then( resp => props.updatedMovie(resp))
        .catch( error => console.log(error));
    }

    const createClicked = () => {
       
        console.log('created');
        API.createMovie({title:title,description:description})
        .then( resp => props.movieCreated(resp))
        .catch( error => console.log(error));
    }

    return(
       

        <React.Fragment>
        {props.movie ? 
        (
            <div>
                <label htmlFor = 'Title'>Title</label><br/>
                <input id='Title' placeholder="Movie Title" value={title} onChange={ evt => setTitle(evt.target.value)}/><br/>
                <label htmlFor = 'Description'>Description</label><br/>
                <textarea id='Description' placeholder="Movie Description" value={description} onChange={ evt => setDescription(evt.target.value)}/><br/>
                {props.movie.id?
                
                <button onClick={updateClicked}>Update</button>
                :
                <button onClick={createClicked} >Create</button>     
                }

            </div>
        )
    
    : null}
    </React.Fragment>
    )
}

export default MovieForm;
