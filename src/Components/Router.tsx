import React, { ReactElement } from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import { device } from "../Styles/Responsive";

// Hooks
import { isMobile } from "../Hooks/useScreenSize";

// Page components
import Home from "../Pages/Home";
import Shows from "../Pages/Shows";
import MobileSearch from "../Pages/MobileSearch";
import Results from "../Pages/Results";
import MovieDetail from "../Pages/MovieDetail";
import ShowDetail from "../Pages/ShowDetail";
import SeasonDetail from "../Pages/SeasonDetail";
import EpisodeDetail from "../Pages/EpisodeDetail";
import PersonDetail from "../Pages/PersonDetail";
import Page404 from "../Pages/Page404";
import Settings from "../Pages/Settings";

// Type
import { Theme } from "../@types/style";

/*
==========================
    Styled Components
==========================
*/
const MainContainer = styled.div`
  /* Position */
  position: relative;

  /* Style */
  background: transparent;
  color: ${({ theme }: { theme: Theme }) => theme.enabled};

  /* Size */
  padding-bottom: 80px;

  ${device.desktop} {
    padding: 0 60px;
  }
`;

/*
==========================
    React Element
==========================
*/
const Router = (): ReactElement => {
  return (
    <MainContainer>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/shows" exact component={Shows} />
        <Route
          path="/mobile-search"
          component={isMobile() ? MobileSearch : Home}
        />
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
};

export default Router;
