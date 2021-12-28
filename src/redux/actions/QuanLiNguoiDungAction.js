import React from "react";
import { quanLyNguoiDungService } from "../../service/QuanLyNguoiDungService";
import {
  DANG_NHAP_ACTION,
  SET_THONG_TIN_NGUOI_DUNG,
} from "./types/QuanLyNguoiDungType";
import { history } from "../../App";

export const dangNhapAction = (thongTinDangNhap) => {
  return async (dispatch) => {
    try {
      const { data, status } = await quanLyNguoiDungService.layThongTinDangNhap(
        thongTinDangNhap
      );

      if (data.statusCode === 200) {
        dispatch({
          type: DANG_NHAP_ACTION,
          thongTinDangNhap: data.content,
        });

        //chuyển hướng đăng nhập về trang trước đó
        history.goBack();
      }

      console.log("thongTinDangNhap", data);
    } catch (err) {
      console.log("err", err);
    }
  };
};

export const layThongTinNguoiDungAction = () => {
  return async (dispatch) => {
    try {
      const { data, statusCode } =
        await quanLyNguoiDungService.layThongTinNguoiDung();

      console.log("thongTinNguoiDungaction", data);

      if (data.statusCode === 200) {
        dispatch({
          type: SET_THONG_TIN_NGUOI_DUNG,
          thongTinNguoiDung: data.content,
        });
      }

      console.log("thongTinDangNhap", data);
    } catch (err) {
      console.log("err", err);
    }
  };
};
