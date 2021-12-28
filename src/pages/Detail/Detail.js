import React, { useEffect } from "react";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import "@tsamantanis/react-glassmorphism/dist/index.css";
import "../../assets/styles/cricle.css";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { layThongTinChiTietPhim } from "../../redux/actions/QuanLiRapAction";
import moment from "moment";
import { Rate } from "antd";
import { NavLink } from "react-router-dom";

const { TabPane } = Tabs;

export default function Detail(props) {
  const { filmDetail } = useSelector((state) => state.QuanLyPhimReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    //lấy thông tin param từ url
    let { id } = props.match.params;

    dispatch(layThongTinChiTietPhim(id));
  }, []);

  console.log("filmDetail", filmDetail);
  return (
    <div
      style={{
        backgroundImage: `url(${filmDetail.hinhAnh})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        minHeight: "100vh",
      }}
    >
      <CustomCard
        style={{ paddingTop: "150px", minHeight: "100vh" }}
        effectColor="#fff" // required
        color="#fff" // default color is white
        blur={15} // default blur value is 10px
        borderRadius={0} // default border radius value is 10px
      >
        <div className="grid grid-cols-12">
          <div className="col-span-4 col-start-3">
            <div className="grid grid-cols-3">
              <img
                className="col-span-1"
                src={filmDetail.hinhAnh}
                style={{ height: 300, width: "100%" }}
                alt={filmDetail.hinhAnh}
              />
              <div className="col-span-2 ml-5" style={{ marginTop: "5%" }}>
                <p className="text-sm">
                  Ngày chiều:{" "}
                  {moment(filmDetail.ngayKhoiChieu).format("DD.MM.YYYY")}
                </p>
                <p className="text-3xl text-white">{filmDetail.tenPhim}</p>
                <p>{filmDetail.moTa}</p>
              </div>
            </div>
          </div>

          <div className="col-span-4 text-center">
            <h1
              style={{
                marginLeft: "15%",
                color: "yellow",
                fontWeight: "bold",
                fontSize: 15,
              }}
            >
              Đánh giá
            </h1>
            <h1
              style={{ marginLeft: "12%" }}
              className="text-green-400 text-2xl"
            >
              <Rate allowHalf defaultValue={filmDetail.danhGia / 2} />
            </h1>
            <div
              className={`c100 p${filmDetail.danhGia * 10} big`}
              style={{ marginLeft: "36%" }}
            >
              <span>{filmDetail.danhGia * 10}%</span>
              <div className="slice">
                <div className="bar" />
                <div className="fill" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 ml-72 w-2/3 bg-white px-4 py-4 container">
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Lịch chiếu" key="1">
              <div>
                <Tabs tabPosition={"left"} className="bg-white">
                  {filmDetail.heThongRapChieu?.map((htr, index) => {
                    return (
                      <TabPane
                        tab={
                          <div>
                            <img
                              src={htr.logo}
                              alt={htr.logo}
                              width={50}
                              className="rounded-full"
                            />

                            <p>{htr.tenHeThongRap}</p>
                          </div>
                        }
                        key={index}
                        style={{ minHeight: "300px" }}
                      >
                        {htr.cumRapChieu?.map((cumRap, index) => {
                          return (
                            <div key={index} className="mt-5">
                              <div className="flex flex-row">
                                <img
                                  src="https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png"
                                  style={{ width: 50, height: 50 }}
                                  alt="img"
                                />
                                <div className="ml-2">
                                  <p
                                    style={{
                                      fontSize: 20,
                                      fontWeight: "bold",
                                      lineHeight: "1",
                                      marginBottom: "10px",
                                    }}
                                  >
                                    {cumRap.tenCumRap}
                                  </p>
                                  <p className="text-gray-500">
                                    {cumRap.diaChi}
                                  </p>
                                </div>
                              </div>
                              <div className="grid grid-cols-4">
                                {cumRap.lichChieuPhim?.map(
                                  (lichChieu, index) => {
                                    return (
                                      <NavLink
                                        to={`/checkout/${lichChieu.maLichChieu}`}
                                        key={index}
                                        class="col-span-1 text-green-900 font-bold"
                                      >
                                        {moment(
                                          lichChieu.ngayChieuGioChieu
                                        ).format("hh:mm A")}
                                      </NavLink>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </TabPane>
                    );
                  })}
                </Tabs>
              </div>
            </TabPane>
            <TabPane tab="Thông tin" key="2" style={{ minHeight: "300px" }}>
              Thông tin
            </TabPane>
            <TabPane tab="Đánh giá" key="3" style={{ minHeight: "300px" }}>
              Đánh giá
            </TabPane>
          </Tabs>
        </div>
      </CustomCard>
    </div>
  );
}
