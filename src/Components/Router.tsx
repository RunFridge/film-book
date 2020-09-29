import React, { ReactElement } from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Shows from "../Pages/Shows";
import Results from "../Pages/Results";
import MovieDetail from "../Pages/MovieDetail";
import ShowDetail from "../Pages/ShowDetail";
import SeasonDetail from "../Pages/SeasonDetail";
import EpisodeDetail from "../Pages/EpisodeDetail";
import PersonDetail from "../Pages/PersonDetail";
import Page404 from "../Pages/Page404";

const Router = (): ReactElement =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/shows" exact component={Shows} />
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
    <Route component={Page404} />
  </Switch>;

export default Router;
