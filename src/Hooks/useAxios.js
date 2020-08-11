import axios, { defaultAxios } from "axios";
import { useState, useEffect } from "react";

const useAxios = (axiosInstance = defaultAxios) => {
  const [state, setState] = useState({
    loading: true,
    data: null,
    error: null,
  });

  useEffect(() => {
    let unmounted = false;
    if (typeof axiosInstance !== "function") {
      // Check if axiosInstance is a function
      setState((prevState) => {
        return {
          ...prevState,
          loading: false,
          error: `[ERROR] Invalid axios type`,
        };
      });
    } else {
      //   Axios Cancel token
      let cancel;
      axiosInstance({
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
        .then(({ data }) => {
          if (!unmounted) {
            setState((prevState) => {
              return {
                ...prevState,
                loading: false,
                data,
              };
            });
          }
        })
        .catch((err) => {
          if (!unmounted) {
            if (axios.isCancel(err)) return;
            setState((prevState) => {
              return {
                ...prevState,
                loading: false,
                error: err.message,
              };
            });
          }
        });
      return () => {
        unmounted = true;
        cancel();
      };
    }
  }, [axiosInstance]);

  return state;
};

export default useAxios;
