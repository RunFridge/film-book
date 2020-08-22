<p align="center">
   <img src="src/Assets/logo.png" width="400"/>
</p>

> A Movie catalog website built with React JS

[![Author](https://img.shields.io/badge/author-RunFridge-green?style=flat)](https://github.com/RunFridge/film-book)
[![License](https://img.shields.io/github/license/RunFridge/film-book)](https://github.com/RunFridge/film-book/blob/dev/LICENSE)
[![Netlify Status](https://api.netlify.com/api/v1/badges/39906376-fa5e-490c-9dd1-63604ee4f025/deploy-status)](https://app.netlify.com/sites/film-book/deploys)

### Features TODO

- [x] Setup APIs
  - [x] [Naver API](https://developers.naver.com/docs/search/movie/)
    - 네이버 Developer API 같은 경우 Client-side에서 CORS 제한이 걸려있기 때문에 프록시 서버로 실행 [[참고]](https://msyu1207.tistory.com/65)
  - [x] [The Movie DB API](https://developers.themoviedb.org/)
    - Issue with Axios@0.19.2, not passing params in the request -> downgraded to Axios@0.18.1
  - [x] [KOBIS API](https://www.kobis.or.kr/kobisopenapi/homepg/apiservice/searchServiceInfo.do)
- [x] Router
  - [x] Movies
  - [x] Shows
  - [x] Search Results
  - [x] MovieDetail
  - [x] ShowDetail
  - [x] PersonDetail
  - [x] Settings
- [x] Pages
  - [x] Movies (Home)
  - [x] Shows
  - [x] Search Results
  - [x] MovieDetail
  - [x] ShowDetail
  - [x] PersonDetail
  - [x] Settings
- [ ] Meta
  - [x] Add ContextAPI for Dark/Light Mode
  - [x] Theme file for both Dark/Light Mode
  - [x] Add Trailers
  - [ ] Language Support

### Known Bugs & Issues

- Page not re-rendering when searched twice
- Page not responsive when mobile/tablet sized screen
- Verbose Detail.js code, need refactoring

### Used libraries

- [ReactJS](https://reactjs.org/)
- [Styled-Components](https://styled-components.com/)
- [Keen-Slider](https://keen-slider.io/)

### Reference Data

- [How to use media queries with styled components](https://jsramblings.com/how-to-use-media-queries-with-styled-components/)
- [Light Dark Mode toggle with styled components](https://dev.to/sorinc6/light-dark-mode-toggle-with-react-using-context-api-and-styled-components-347i)
- [NomadCoders](http://nomadcoders.co/)