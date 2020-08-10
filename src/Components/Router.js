import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
// Screens Import
import Home from "../Screens/Home";
import Shows from "../Screens/Shows";
import Search from "../Screens/Search";
import MovieDetail from "../Screens/MovieDetail";
import ShowDetail from "../Screens/ShowDetail";
import Settings from "../Screens/Settings";
import Page404 from "../Screens/Page404";

export default () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/shows" exact component={Shows} />
        <Route path="/search" component={Search} />
        <Route path="/movie/:id" component={MovieDetail} />
        <Route path="/show/:id" component={ShowDetail} />
        <Route path="/settings" exact component={Settings} />
        <Route component={Page404} />
      </Switch>
    </Router>
  );
};
