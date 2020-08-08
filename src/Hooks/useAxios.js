import axios, { defaultAxios } from "axios";
import { useState, useEffect } from "react";

const useAxios = (axiosInstance = defaultAxios) => {
  const [state, setState] = useState({
    loading: true,
    data: null,
    error: null,
  });

  useEffect(() => {
    //   Axios Cancel token
    let cancel;
    axiosInstance({
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then(({ data }) => {
        setState((prevState) => {
          return {
            ...prevState,
            loading: false,
            data,
          };
        });
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setState((prevState) => {
          return {
            ...prevState,
            loading: false,
            error: err.message,
          };
        });
      });
  }, []);

  return state;
};

export default useAxios;
