import { quanLyRapService } from "../../service/QuanLyRapService";
import {
  SET_CHI_TIET_PHIM,
  SET_HE_THONG_RAP_CHIEU,
} from "./types/QuanLyRapType";

export const layDanhSachHeThongRapAction = () => {
  return async (dispatch) => {
    try {
      const { data, status } = await quanLyRapService.layDanhSachHeThongRap();
      //console.log("result", data.content);
      if (status === 200) {
        dispatch({
          type: SET_HE_THONG_RAP_CHIEU,
          heThongRapChieu: data.content,
        });
      }
    } catch (err) {
      console.log("err", err.response?.data);
    }
  };
};

export const layThongTinChiTietPhim = (id) => {
  return async (dispatch) => {
    const { data, status } = await quanLyRapService.layThongTinLichChieuPhim(
      id
    );

    console.log("data", data);
    // lấy dữ liệu từ api về => đưa lên reducer

    dispatch({
      type: SET_CHI_TIET_PHIM,
      filmDetail: data.content,
    });
    try {
    } catch (err) {
      console.log("err", err.response?.data);
    }
  };
};
