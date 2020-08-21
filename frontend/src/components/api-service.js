const TOKEN= "b7c3e05aa76c115ed8b612276ad29c77e59a38a6";
export class API {

    static loginUser(body){

        return fetch(`http://127.0.0.1:8000/auth/`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                // 'Authorization':`Token ${TOKEN}`
            },
            body:JSON.stringify(body)
        })
        .then( resp => resp.json())

    
    }
    static registerUser(body){

        return fetch(`http://127.0.0.1:8000/api/users/`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                // 'Authorization':`Token ${TOKEN}`
            },
            body:JSON.stringify(body)
        })
        .then( resp => resp.json())

    
    }

    static updateMovie(mov,body){

        return fetch(`http://127.0.0.1:8000/api/movies/${mov}/`,{
            method: 'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${TOKEN}`
            },
            body:JSON.stringify(body)
        })
        .then( resp => resp.json())

    
    }

    static createMovie(body){

        return fetch(`http://127.0.0.1:8000/api/movies/`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${TOKEN}`
            },
            body:JSON.stringify(body)
        })
        .then( resp => resp.json())

    
    }


static deleteMovie(mov_id){

    return fetch(`http://127.0.0.1:8000/api/movies/${mov_id}/`,{
        method: 'DELETE',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Token ${TOKEN}`
        }
  
    })
    


}

}
    
