import React,{ useState,useEffect,useContext } from 'react';
import {API} from './api-service';
import {TokenContext} from '../index';
import classes from './auth.module.css';

function Auth(){

    const [username,setUsername]=useState('');
    const[password,setPassword]=useState('');
    const{token,setToken}=useContext(TokenContext);
    const[isLoginView,setIsLoginView]=useState(true);

    useEffect( ()=> {
        console.log(token);
        if (token) window.location.href ='/movies'; 
    },[token] )

    const loginClicked = () => {
        API.loginUser({username:username,password:password})
        .then(resp => setToken(resp.token))
        .catch(error => console.log(error))

    };
    const registerClicked = () => {
        API.registerUser({username:username,password:password})
        .then(resp => loginClicked())
        .catch(error => console.log(error))

    };
    return (
        <div className={classes.login}>
            { isLoginView ? <h1>Login here</h1> : <h1>Register Here</h1>}
            <div className={classes.loginContainer}>
       <label htmlFor = 'Username'>Username</label><br/>
        <input id='Username' type='text' placeholder="UserName" value={username} onChange={ evt => setUsername(evt.target.value)}/><br/>
        <label htmlFor = 'Password'>Password</label><br/>
        <input id='Password' type='password' placeholder="Password" value={password} onChange={ evt => setPassword(evt.target.value)}/><br/>

        { isLoginView ? <button onClick={loginClicked}>LOGIN</button> 
        : <button onClick={registerClicked}>REGISTER</button>
        }
        
        { isLoginView ?
         <p onClick = {() => setIsLoginView(false)}>You don't have an Account? Register Here</p>
         :<p onClick = {() => setIsLoginView(true)}>You already have an Account? Login Here</p>
         }
        
        </div>
 
  

    </div>    )
}

export default Auth;