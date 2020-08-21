import React from 'react';
import logo from './logo.svg';
import classes from './App.module.css';
import Layout from './components/layout';
import Movies from './components/Movies';



function App() {
  return (
    <div>

        <div className={classes.App}>
          <header className={classes.AppHeader}>
          <img src={logo} className={classes.AppLogo} alt="logo" />
          
            <h1>
              Movie Rating
            </h1>
            
          </header>
          <Layout/>
          <Movies/>
        </div>

     </div>
  );
}

export default App;
