import React, { Fragment, useEffect, useState } from "react";
import { Tabs, Radio, Space } from "antd";
import { NavLink } from "react-router-dom";
import moment from "moment";

const { TabPane } = Tabs;
export default function HomeMenu(props) {
  const [state, setState] = useState({ tabPosition: "left" });
  const { heThongRapChieu } = props;

  const changeTabPosition = (e) => {
    setState({ tabPosition: e.target.value });
  };

  const { tabPosition } = state;

  const renderHeThongRap = () => {
    return heThongRapChieu?.map((heThongRap, index) => {
      return (
        <TabPane
          tab={
            <img
              src={heThongRap.logo}
              className="rounded-full"
              width="50"
              alt="img"
            />
          }
          key={index}
        >
          <Tabs tabPosition={tabPosition}>
            {heThongRap.lstCumRap?.map((cumRap, index) => {
              return (
                <TabPane
                  tab={
                    <div style={{ width: "300px" }} className="flex">
                      <img
                        src="https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png"
                        width="50"
                        alt="img"
                      />
                      <br />
                      <div className="ml-2 text-left">
                        {cumRap.tenCumRap}{" "}
                        <p className="text-red-300">Chi tiết</p>
                      </div>
                    </div>
                  }
                  key={index}
                >
                  {cumRap?.danhSachPhim?.slice(0, 4).map((phim, index) => {
                    return (
                      <Fragment key={index}>
                        <div className="flex my-2">
                          <img
                            style={{ width: "50px", height: "50px" }}
                            src={phim.hinhAnh}
                            alt={phim.tenPhim}
                          />

                          <div>
                            <h3 className="ml-2 text-green-800">
                              {phim.tenPhim}
                            </h3>
                            <p className="ml-2">{cumRap.diaChi}</p>

                            <div className="grid grid-cols-6 gap-5 ml-2">
                              {phim.lstLichChieuTheoPhim
                                ?.slice(0, 12)
                                .map((lichChieu, index) => {
                                  return (
                                    <NavLink
                                      className="text-yellow-500"
                                      to="/"
                                      key={index}
                                    >
                                      {moment(
                                        lichChieu.ngayChieuGioChieu
                                      ).format("hh:mm A")}
                                    </NavLink>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                        <hr />
                      </Fragment>
                    );
                  })}
                </TabPane>
              );
            })}
          </Tabs>
        </TabPane>
      );
    });
  };
  return (
    <>
      <Tabs tabPosition={tabPosition}>{renderHeThongRap()}</Tabs>
    </>
  );
}
