import React from "react";
import PropTypes from "prop-types";
import Loading from "../Loading";
import Error from "../Error";
import useAxios from "../../Hooks/useAxios";
import PosterSlider from "./PosterSlider";

const SliderWrapper = ({ api, isPerson, isMovie, param }) => {
  // Bind param to API function (Closure) 파라미터를 포함한 함수 (클로저)
  const { loading, data, error } = useAxios(api.bind(null, param));

  return error ? ( // 에러
    <Error msg={error} />
  ) : loading ? ( // 로딩중
    <Loading />
  ) : (
    <>
      <PosterSlider
        array={data.results}
        phonePerView={2}
        tabletPerView={5}
        desktopPerView={6}
        spacing={30}
        isMovie={isMovie}
        isPerson={isPerson}
      />
      <div>
        {/* Search 컴포넌트 검색 결과가 없을 시 */}
        {data.results.length === 0 && param && (
          <h3>
            <i className="fas fa-times" /> 검색 결과가 없습니다.
          </h3>
        )}
      </div>
    </>
  );
};

SliderWrapper.propType = {
  api: PropTypes.func.isRequired,
  isPerson: PropTypes.bool,
  isMovie: PropTypes.bool,
  param: PropTypes.string,
};

export default SliderWrapper;
