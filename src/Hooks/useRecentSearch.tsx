import { useState, Dispatch } from "react";

const RECENT_LS_KEY = "recentSearch";

const useRecentSearch = (): [
  Array<string>,
  (term: string) => void,
  (idx: number) => void
] => {
  const lsGetItem = localStorage.getItem(RECENT_LS_KEY);

  const [recentSearch, setRecentSearch]: [
    Array<string>,
    Dispatch<Array<string>>
  ] = useState(lsGetItem ? JSON.parse(lsGetItem) : []);

  const addTerm = (term: string): void => {
    const newSearch = [...recentSearch];
    if (recentSearch.includes(term)) {
      // Recent search exists in array
      const termIdx = newSearch.indexOf(term);
      newSearch.splice(termIdx, 1);
    }
    newSearch.push(term);
    localStorage.setItem(RECENT_LS_KEY, JSON.stringify(newSearch));
    setRecentSearch(newSearch);
  };

  const removeTerm = (idx: number): void => {
    const newSearch = [...recentSearch];
    newSearch.splice(idx, 1);
    localStorage.setItem(RECENT_LS_KEY, JSON.stringify(newSearch));
    setRecentSearch(newSearch);
  };

  return [recentSearch, addTerm, removeTerm];
};

export default useRecentSearch;
