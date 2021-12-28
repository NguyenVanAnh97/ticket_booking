import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "./Checkout.module.css";
import {
  datVeAction,
  layChiTietPhongVeAction,
} from "../../redux/actions/QuanLiDatVeAction";
import "./Checkout.css";
import {
  CloseOutlined,
  UserOutlined,
  CheckOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import {
  CHANGE_TAB_ACTIVE,
  CHUYEN_TAB,
  DAT_VE,
} from "../../redux/actions/types/QuanLiDatVeType";
import _, { functions } from "lodash";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";

import { Tabs } from "antd";
import { layThongTinNguoiDungAction } from "../../redux/actions/QuanLiNguoiDungAction";
import moment from "moment";
import { connection } from "../../index";

function Checkout(props) {
  const dispatch = useDispatch();
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } =
    useSelector((state) => state.QuanLiDatVeReducer);

  useEffect(() => {
    //Gọi hàm tạo ra 1 async function
    const action = layChiTietPhongVeAction(props.match.params.id);
    //Dispatch function này đi
    dispatch(action);

    //Có 1 client nào thực hiện việc đặt vé thành công mình sẽ load lại danh sách phòng vé của lịch chiếu đó
    connection.on("datVeThanhCong", () => {
      dispatch(action);
    });

    //Vừa vào trang load tất cả ghế của các người khác đang đặt
    connection.invoke("loadDanhSachGhe", props.match.params.id);

    //Load danh sách ghế đang đặt từ server về (lắng nghe tín hiệu từ server trả về)
    connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {
      console.log("danhSachGheKhachDat", dsGheKhachDat);
      //Bước 1: Loại mình ra khỏi danh sách
      dsGheKhachDat = dsGheKhachDat.filter(
        (item) => item.taiKhoan !== userLogin.taiKhoan
      );
      //Bước 2 gộp danh sách ghế khách đặt ở tất cả user thành 1 mảng chung

      let arrGheKhachDat = dsGheKhachDat.reduce((result, item, index) => {
        let arrGhe = JSON.parse(item.danhSachGhe);

        return [...result, ...arrGhe];
      }, []);

      //Đưa dữ liệu ghế khách đặt cập nhật redux
      arrGheKhachDat = _.uniqBy(arrGheKhachDat, "maGhe");

      //Đưa dữ liệu ghế khách đặt về redux
      dispatch({
        type: "DAT_GHE",
        arrGheKhachDat,
      });
    });

    //Cài đặt sự kiện khi reload trang
    window.addEventListener("beforeunload", clearGhe);

    return () => {
      clearGhe();
      window.removeEventListener("beforeunload", clearGhe);
    };
  }, []);

  const clearGhe = function (event) {
    connection.invoke("huyDat", userLogin.taiKhoan, props.match.params.id);
  };

  const { danhSachGhe, thongTinPhim } = chiTietPhongVe;

  const renderSeats = () => {
    return danhSachGhe.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : " ";
      let classGheDaDat = ghe.daDat === true ? "gheDaDat" : "";
      let classGheDangDat = "";

      //Kiểm tra từng ghế render xem có trong mảng ghế đang đặt hay không
      let indexGheDD = danhSachGheDangDat.findIndex(
        (gheDD) => gheDD.maGhe === ghe.maGhe
      );

      //Kiểm tra từng render xem có phải ghế khách đặt hay không
      let classGheKhachDat = "";
      let indexGheKD = danhSachGheKhachDat.findIndex(
        (gheKD) => gheKD.maGhe === ghe.maGhe
      );

      if (indexGheKD !== -1) {
        classGheKhachDat = "gheKhachDat";
      }

      let classGheDaDuocDat = "";
      if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheDaDuocDat = "gheDaDuocDat";
      }

      if (indexGheDD !== -1) {
        classGheDaDat = "gheDangDat";
      }

      return (
        <Fragment key={index}>
          <button
            onClick={() => {
              dispatch({
                type: DAT_VE,
                gheDuocChon: ghe,
              });
            }}
            disabled={ghe.daDat | (classGheKhachDat !== "")}
            className={`ghe ${classGheVip}  ${classGheDaDuocDat} ${classGheDangDat} ${classGheDaDat} ${classGheKhachDat} text-center`}
            key={index}
          >
            {ghe.daDat ? (
              classGheDaDuocDat != "" ? (
                <UserOutlined
                  style={{ marginBottom: 7.5, fontWeight: "bold" }}
                />
              ) : (
                <CloseOutlined
                  style={{ marginBottom: 7.5, fontWeight: "bold" }}
                />
              )
            ) : classGheKhachDat !== "" ? (
              <SmileOutlined
                style={{ marginBottom: 7.5, fontWeight: "bold" }}
              />
            ) : (
              ghe.stt
            )}
          </button>
          {(index + 1) % 13 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };

  return (
    <div className="mt-5 min-h-screen">
      <div className="grid grid-cols-12">
        <div className="col-span-9">
          <div className="flex flex-col items-center mt-5">
            <div
              className="bg-black"
              style={{ width: "80%", height: 15 }}
            ></div>
            <div className={`${styled["rapezoid"]} text-center`}>
              <h3 className="mt-3 text-black">Màn hình</h3>
            </div>
            <div>{renderSeats()}</div>

            <div className="mt-5 ">
              <table className="divide-y divide-gray-200">
                <thead className="bg-gray-50 text-center">
                  <tr>
                    <th className="px-5">Ghế chưa đặt</th>
                    <th className="px-5">Ghế đang đặt</th>
                    <th className="px-5">Ghế vip</th>
                    <th className="px-5">Ghế đã đặt</th>
                    <th className="px-5">Ghế ghế đã được bạn đặt</th>
                    <th className="px-5">Ghế khách đặt</th>
                  </tr>
                </thead>
                <tbody className="bg-white w-3/4 text-center divide-y divide-gray-200">
                  <tr>
                    <td>
                      <button className="ghe text-center">
                        <CheckOutlined
                          style={{ marginBottom: 7.5, fontWeight: "bold" }}
                        />
                      </button>
                    </td>
                    <td>
                      <button className="ghe gheDangDat text-center">
                        <CheckOutlined
                          style={{ marginBottom: 7.5, fontWeight: "bold" }}
                        />
                      </button>
                    </td>
                    <td>
                      <button className="ghe gheVip text-center">
                        <CheckOutlined
                          style={{ marginBottom: 7.5, fontWeight: "bold" }}
                        />
                      </button>
                    </td>
                    <td>
                      <button className="ghe gheDaDat text-center">
                        <CheckOutlined
                          style={{ marginBottom: 7.5, fontWeight: "bold" }}
                        />
                      </button>
                    </td>
                    <td>
                      <button className="ghe gheDaDuocDat text-center">
                        <CheckOutlined
                          style={{ marginBottom: 7.5, fontWeight: "bold" }}
                        />
                      </button>
                    </td>
                    <td>
                      <button className="ghe gheKhachDat text-center">
                        <CheckOutlined
                          style={{ marginBottom: 7.5, fontWeight: "bold" }}
                        />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <h3 className="text-center text-green-400 text-3xl">
            {danhSachGheDangDat
              .reduce((tongTien, ghe) => {
                return (tongTien += ghe.giaVe);
              }, 0)
              .toLocaleString()}{" "}
            Đ
          </h3>
          <hr />
          <h3 className="text-2xl text-gray-800 mt-2">
            {thongTinPhim.tenPhim}
          </h3>
          <p>{thongTinPhim.diaChi}</p>
          <p>ngày chiếu: {thongTinPhim.ngayChieu}</p>
          <hr />
          <div className="grid grid-cols-3 my-5">
            <div className="flex flex-wrap col-span-2 ">
              <span className="text-red-400">Ghế</span>
              {_.sortBy(danhSachGheDangDat, ["stt"]).map((gheDD, index) => {
                return (
                  <span key={index} className="text-xl mx-1 text-green-500">
                    {gheDD.stt}
                  </span>
                );
              })}
            </div>
            <div className="text-right mr-2 text-red-600 text-xl">
              {danhSachGheDangDat
                .reduce((tongTien, ghe) => {
                  return (tongTien += ghe.giaVe);
                }, 0)
                .toLocaleString()}
            </div>
          </div>
          <hr />
          <div className="my-5">
            <i>Email</i>
            <br />
            {userLogin.email}
          </div>
          <hr />
          <div className="my-5">
            <i>Phone</i> <br />
            {userLogin.soDT}
          </div>
          <hr />
          <div className="h-full flex flex-col mb-0">
            <div
              onClick={() => {
                const thongTinDatVe = new ThongTinDatVe();
                thongTinDatVe.maLichChieu = props.match.params.id;
                thongTinDatVe.danhSachVe = danhSachGheDangDat;
                //console.log(thongTinDatVe);
                dispatch(datVeAction(thongTinDatVe));
              }}
              className="bg-green-500 text-white w-full text-center p-3 font-bold text-2xl cursor-pointer"
            >
              ĐẶT VÉ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const { TabPane } = Tabs;

function callback(key) {}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (props) {
  const dispatch = useDispatch();
  const { tabActive } = useSelector((state) => state.QuanLiDatVeReducer);

  return (
    <div className="px-5">
      <Tabs
        defaultActiveKey={"1"}
        activeKey={tabActive}
        onChange={(key) => {
          dispatch({
            type: CHANGE_TAB_ACTIVE,
            number: key.toString(),
          });
        }}
      >
        <TabPane tab="01 CHỌN GHÊ THANH TOÁN" key="1">
          <Checkout {...props} />
        </TabPane>
        <TabPane tab="02 KÊT QUẢ ĐẶT VÉ" key="2">
          <KetQuaDatVe {...props} />
        </TabPane>
      </Tabs>
    </div>
  );
}

function KetQuaDatVe(props) {
  const dispatch = useDispatch();
  const { thongTinNguoiDung, userLogin } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );

  useEffect(() => {
    dispatch(layThongTinNguoiDungAction());
  }, []);

  console.log("thongTinNguoiDung", thongTinNguoiDung);

  const renderTicket = () => {
    return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
      const seats = _.first(ticket.danhSachGhe);
      return (
        <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
          <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
            <img
              alt="team"
              className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
              src={ticket.hinhAnh}
            />
            <div className="flex-grow">
              <h2 className="text-gray-900 title-font font-medium">
                {ticket.tenPhim}
              </h2>
              <p className="text-gray-500">
                Giờ chiếu: {moment(ticket.ngayDat).format("hh:mm A")} - Ngày
                chiếu: {moment(ticket.ngayDat).format("DD-MM-YY")}
              </p>
              <p className="text-gray-500">
                <span className="font-bold">Tên rạp:</span> - {""}
                {seats.tenHeThongRap} - <span className="font-bold">Ghế: </span>
                {""}
                {ticket.danhSachGhe.map((ghe, index) => {
                  return (
                    <span className="text-green-500 text-xl" key={index}>
                      [{ghe.tenGhe}]
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="p-5">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-indigo-900">
              Lịch sử đặt vé khách hàng
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Hãy xem chính xác thông tin địa điểm và thời gian của phim bạn nhé
            </p>
          </div>
          <div className="flex flex-wrap -m-2">{renderTicket()}</div>
        </div>
      </section>
    </div>
  );
}
