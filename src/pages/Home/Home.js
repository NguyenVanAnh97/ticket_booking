import React, { useEffect } from "react";
import HomeMenu from "./HomeMenu/HomeMenu";
import { useSelector, useDispatch } from "react-redux";
import Films from "../../components/Films/Films";
import MultipleRowSlick from "../../components/RSlick/MultipleRowSlick";
import { layDanhSachPhimAction } from "../../redux/actions/QuanLiPhimAction";
import { layDanhSachHeThongRapAction } from "../../redux/actions/QuanLiRapAction";
import HomeCarousel from "../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel";

export default function Home(props) {
  //console.log("propsHome", props);
  // props.match.params
  const { arrPhim } = useSelector((state) => state.QuanLyPhimReducer);
  const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);
  //console.log("heThongRapChieu", heThongRapChieu);

  // const renderFimls = () => {
  //   return arrPhim.map((phim, index) => {
  //     return <Films key={index} />;
  //   });
  // };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(layDanhSachPhimAction());
    dispatch(layDanhSachHeThongRapAction()); // dispatch function từ redux thunk
  }, []);

  return (
    <div>
      <HomeCarousel />

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto ">
          <MultipleRowSlick arrPhim={arrPhim} />
        </div>
      </section>

      <div className="mx-36">
        <HomeMenu heThongRapChieu={heThongRapChieu} />
      </div>
    </div>
  );
}
