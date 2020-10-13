<p align="center">
   <img src="src/Assets/logo.png" width="400"/>
</p>

> A Movie catalog website built with React JS: Version 2.0: GraphQL + Typescript

[![Author](https://img.shields.io/badge/author-RunFridge-green?style=flat)](https://github.com/RunFridge/film-book)
[![License](https://img.shields.io/github/license/RunFridge/film-book)](https://github.com/RunFridge/film-book/blob/dev/LICENSE)
[![Netlify Status](https://api.netlify.com/api/v1/badges/39906376-fa5e-490c-9dd1-63604ee4f025/deploy-status)](https://app.netlify.com/sites/film-book/deploys)

### TODO List

- Overall

  - [x] Set up Apollo / GraphQL
  - [x] Global Style

- Routers

  - [x] Movies `/`
    - [x] Now playing movies
    - [x] Upcoming movies
    - [x] Popular movies
  - [x] Shows `/shows`
    - [x] Airing today shows
    - [x] Popular shows
    - [x] Top Rated shows
  - [x] Search Results `/results`
    - [x] Movie search results
    - [x] Show search results
    - [x] Person search results
  - [x] Movie details `/movie/:id`
    - [x] Similar movies
    - [x] Cast / Crew
  - [x] Show details `/show/:id`
    - [x] Similar shows
    - [x] Cast / Crew
    - [x] Season details `/show/:id/season/:seasonNumber`
    - [x] Episode details `/show/:id/season/:seasonNumber/episode/:episodeNumber`
  - [x] Person details `/person/:id`
    - [x] Cast / Crew
  - [x] Settings `/settings`
  - [x] 404 Not found Route

- Components

  - [x] Header / Navbar
    - [x] Menu navigations
    - [x] Search input
  - [x] Main
  - [x] Footer
    - [x] Copyright
    - [x] Github link

- Goals for version 2.0

  - [x] Use custom webpack environemnt without CRA ([Reference](https://velog.io/@jhj46456/React-%EA%B0%9C%EB%B0%9C-%ED%99%98%EA%B2%BD-%EC%A7%81%EC%A0%91-%EB%A7%8C%EB%93%A4%EA%B8%B0))
  - [x] Fix bugs from previous build
    - [x] Page not re-rendering when searched twice
    - [x] Page not responsive when mobile/tablet sized screen

- Goals After 2.0 Release
  - [ ] Refactoring
    - [ ] Split styled-components to separate files
    - [ ] "Prettify" if-else statements

### Development guide

1. Clone [MovieQL](https://github.com/hwhang0917/ql-movie-api/) project and follow the guide
2. Install [Yarn](https://yarnpkg.com/getting-started/install) for package / dependency management
3. Install dependencies using the following command:
   ```sh
   yarn
   ```
4. Run development server using the following command:
   ```sh
   yarn start
   ```

### Style Guide

- 📱: Responsive style is designed from mobile to desktop
  - Default is mobile and media queries for other devices

### Used libraries

- [ReactJS](https://reactjs.org/)
- [Styled-Components](https://styled-components.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Webpack](https://webpack.js.org/)
- [Keen Slider](https://keen-slider.io/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [MovieQL](https://github.com/hwhang0917/ql-movie-api/)

### Reference

- [NomadCoders](http://nomadcoders.co/)
- [TS 개발 환경 만들기](https://velog.io/@jhj46456/Typescript-React-%EA%B0%9C%EB%B0%9C-%ED%99%98%EA%B2%BD-%EC%A7%81%EC%A0%91-%EB%A7%8C%EB%93%A4%EA%B8%B0)
