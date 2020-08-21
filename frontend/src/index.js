import React,{useState,createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Auth from './components/auth';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter } from 'react-router-dom';

export const TokenContext = createContext(null);

function Router ()  {

  // const TOKEN= "b7c3e05aa76c115ed8b612276ad29c77e59a38a6";

  const [token,setToken]=useState('');

  return (

    <React.StrictMode>
      <TokenContext.Provider value={{token,setToken}}>
    <BrowserRouter>
      <Route exact path="/" component={Auth}/>
      <Route exact path="/movies" component={App}/>
    </BrowserRouter>
    </TokenContext.Provider>
  </React.StrictMode>
  )

}

ReactDOM.render(<Router/>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
