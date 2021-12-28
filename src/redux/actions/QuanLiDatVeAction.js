import { connection } from "../..";
import {
  QuanLyDatVeService,
  quanLyDatVeService,
} from "../../service/QuanLyDatVeService";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { displayLoadingAction, hideLoadingAction } from "./LoadingActions";
import { DISPLAY_LOADING, HIDE_LOADING } from "./types/LoadingType";
import {
  DAT_VE_HOAN_TAT,
  SET_CHI_TIET_PHONG_VE,
  CHUYEN_TAB,
  DAT_VE,
} from "./types/QuanLiDatVeType";

export const layChiTietPhongVeAction = (maLichChieu) => {
  return async (dispatch) => {
    try {
      const { data, status } = await quanLyDatVeService.layChiTietPhongVe(
        maLichChieu
      );
      console.log("data", data);
      if (status === 200) {
        dispatch({
          type: SET_CHI_TIET_PHONG_VE,
          chiTietPhongVe: data.content,
        });
      }
    } catch (err) {
      console.log("error", err);
      console.log("error", err.response?.data);
    }
  };
};

export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const { data, status } = await quanLyDatVeService.datVe(thongTinDatVe);

      // đặt vé thành công => gọi api load lại phòng vé
      await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu));
      await dispatch({ type: DAT_VE_HOAN_TAT });
      await dispatch(hideLoadingAction);
      dispatch({ type: CHUYEN_TAB });
    } catch (error) {
      dispatch(hideLoadingAction);
      console.log("err", error.response.data);
    }
  };
};

export const datGheAction = (ghe, maLichChieu) => {
  return async (dispatch, getState) => {
    //Đưa thông tin ghế lên reducer
    await dispatch({
      type: DAT_VE,
      gheDuocChon: ghe,
    });

    //Call api về backend
    let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
    let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan;

    console.log("danhSachGheDangDat", danhSachGheDangDat);
    console.log("taiKhoan", taiKhoan);
    console.log("maLichChieu", maLichChieu);
    //Biến mảng thành chuỗi
    danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);

    //Call api signalR
    connection.invoke("datGhe", taiKhoan, danhSachGheDangDat, maLichChieu);
  };
};
