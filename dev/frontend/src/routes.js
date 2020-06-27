import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Login from "./pages/Login"
import Hero from "./pages/Hero"
import Heroes from "./pages/Heroes"
import Battles from "./pages/Battles"

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/hero/:id" exact component={Hero} />
            <Route path="/heroes" exact component={Heroes} />
            <Route path="/" exact component={Battles} />
        </Switch>
    </BrowserRouter>
);

export default Routes;