import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getCarouselActions } from "../../../../redux/actions/CarouselActions";
import "./HomeCarousel.css";
const contentStyle = {
  height: "600px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  backgroundPosition: "center",
  backgroundSize: "100% 100%",
  backgroundRepeat: "no-repeat",
};

export default function HomeCarousel(props) {
  const { arrImg } = useSelector((state) => state.CarouselReducer);

  const dispatch = useDispatch();

  // sẽ tự kích hoạt khi component được render
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    //1: action = {type:'', data} (object)
    //2: (phải cài middleware): callBackFuntion (dispatch)
    dispatch(getCarouselActions());
  }, []);

  const renderImg = () => {
    return arrImg.map((item, index) => {
      return (
        <div key={index}>
          <div
            style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}
          >
            <img
              src={item.hinhAnh}
              className="w-full opacity-0"
              alt={item.hinhAnh}
            />
          </div>
        </div>
      );
    });
  };

  return <Carousel autoplay>{renderImg()}</Carousel>;
}
