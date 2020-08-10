import React from "react";

const parseQuery = (query) => {
  if (query.includes("query")) {
    return decodeURI(query.split("=")[1]);
  }
};

const Search = ({ location: { search } }) => {
  const query = parseQuery(search);
  return <h1>Search Results for: {query}</h1>;
};

export default Search;
