import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './views/Home/Home';
import PlayMode from './views/PlayMode/PlayMode';
import CollectionMode from './views/CollectionMode/CollectionMode';
import StoreMode from './views/StoreMode/StoreMode';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import Navigation from './views/Navigation/Navigation';
import { Grid } from 'react-bootstrap';
import MainContainer from './views/MainContainer/MainContainer';




ReactDOM.render(
    <Router>
        <MainContainer>
            <Navigation/>
            <Grid>
                <Route exact path="/" component={Home}/>
                <Route exact path="/play" component={PlayMode}/>
                <Route exact path="/collection" component={CollectionMode}/>
                <Route exact path="/store" component={StoreMode}/>
            </Grid>
        </MainContainer>
    </Router>
    , document.getElementById('root'));
registerServiceWorker();
