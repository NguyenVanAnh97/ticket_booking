import React, { Component } from "react";
import Slider from "react-slick";
import styleSlick from "./MultipleRowSlick.module.css";
import Films from "../Films/Films";
import Films_Flip from "../Films/Films_Flip";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_PHIM_DANG_CHIEU,
  SET_PHIM_SAP_CHIEU,
} from "../../redux/actions/types/QuanLiPhimType";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    ></div>
  );
}
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block", left: "-50px" }}
      onClick={onClick}
    ></div>
  );
}

const MultipleRowSlick = (props) => {
  const dispatch = useDispatch();
  const { dangChieu, sapChieu } = useSelector(
    (state) => state.QuanLyPhimReducer
  );
  const renderFilms = () => {
    return props.arrPhim.slice(0, 16).map((item, index) => {
      return (
        <div className={`${styleSlick["width-item"]}`} key={index}>
          <Films_Flip item={item} />
        </div>
      );
    });
  };

  let activeClassDC = dangChieu === true ? "active_Film" : "none_active_Film";
  let activeClassSC = sapChieu === true ? "active_Film" : "none_active_Film";

  const settings = {
    className: "center variable-width",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 200,
    rows: 1,
    slidesPerRow: 1,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div>
      <button
        className={`${styleSlick[activeClassDC]} px-8 py-3 font-semibold border bg-gray-800 text-white rounded dark:border-coolGray-100 dark:text-coolGray-100 mr-2`}
        onClick={() => {
          dispatch({
            type: SET_PHIM_DANG_CHIEU,
          });
        }}
      >
        Phim đang chiều
      </button>
      <button
        className={`${styleSlick[activeClassSC]} px-8 py-3 font-semibold border rounded dark:border-coolGray-100 dark:text-Gray-800`}
        onClick={() => {
          dispatch({
            type: SET_PHIM_SAP_CHIEU,
          });
        }}
      >
        Phim sắp chiều
      </button>
      <Slider {...settings}>{renderFilms()}</Slider>
    </div>
  );
};

export default MultipleRowSlick;
