import React, { ReactElement } from "react";
import { Switch, Route } from "react-router-dom";

// Page components
import Home from "../Pages/Home";
import Shows from "../Pages/Shows";
import Search from "../Pages/Search";
import Results from "../Pages/Results";
import MovieDetail from "../Pages/MovieDetail";
import ShowDetail from "../Pages/ShowDetail";
import SeasonDetail from "../Pages/SeasonDetail";
import EpisodeDetail from "../Pages/EpisodeDetail";
import PersonDetail from "../Pages/PersonDetail";
import Page404 from "../Pages/Page404";
import Settings from "../Pages/Settings";

const Router = (): ReactElement => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/shows" exact component={Shows} />
    <Route path="/search" component={Search} />
    <Route path="/results" component={Results} />
    <Route path="/movie/:id" component={MovieDetail} />
    <Route path="/show/:id" exact component={ShowDetail} />
    <Route
      path="/show/:id/season/:seasonNumber"
      exact
      component={SeasonDetail}
    />
    <Route
      path="/show/:id/season/:seasonNumber/episode/:episodeNumber"
      component={EpisodeDetail}
    />
    <Route path="/person/:id" component={PersonDetail} />
    <Route path="/settings" component={Settings} />
    <Route component={Page404} />
  </Switch>
);

export default Router;
