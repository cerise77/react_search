import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './component/app.component';
import Home from './component/home';
import NotFound from './component/notefound';


ReactDOM.render(
    <Router>
        <div>
           <Nav />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>,
    document.querySelector("#root")
)
