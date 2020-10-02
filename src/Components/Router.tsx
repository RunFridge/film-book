import React, { ReactElement } from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import { device } from "../Styles/Responsive";

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

/*
==========================
    Styled Components
==========================
*/
const MainContainer = styled.div`
  ${device.desktop} {
    padding: 0 60px;
  }
`;

/*
==========================
    React Element
==========================
*/
const Router = (): ReactElement => (
  <MainContainer>
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
  </MainContainer>
);

export default Router;
