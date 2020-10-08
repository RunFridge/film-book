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

const ButtonContainer = styled.div`
  /* Display */
  display: none;
  justify-content: center;
  align-items: center;

  /* Position */
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 15;

  /* Size */
  width: 50px;
  height: 50px;
  border-radius: 15px;

  /* Style */
  background: ${({ theme }: { theme: Theme }) => theme.bgSecondary};
  box-shadow: ${({ theme }: { theme: Theme }) => theme.textShadow};

  /* Misc */
  cursor: pointer;

  /* Responsive button */
  ${device.desktop} {
    display: flex;
  }
`;

const StyledIcon = styled.i`
  color: ${({ theme }: { theme: Theme }) => theme.disabled};
  font-size: 2rem;
  &:hover {
    color: ${({ theme }: { theme: Theme }) => theme.primary};
  }
`;

/*
==========================
    React Element
==========================
*/
const Router = (): ReactElement => {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
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
      <ButtonContainer onClick={scrollTop}>
        <StyledIcon className="fas fa-chevron-up" />
      </ButtonContainer>
    </MainContainer>
  );
};

export default Router;
