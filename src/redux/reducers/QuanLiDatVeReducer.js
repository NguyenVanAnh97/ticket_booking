import {
  CHANGE_TAB_ACTIVE,
  CHUYEN_TAB,
  DAT_VE,
  DAT_VE_HOAN_TAT,
  SET_CHI_TIET_PHONG_VE,
} from "../actions/types/QuanLiDatVeType";
import { ThongTinPhongVe } from "../../_core/models/ThongTinPhongVe";

const initialState = {
  chiTietPhongVe: new ThongTinPhongVe(),
  danhSachGheDangDat: [], // danh sách ghế đang đặt
  danhSachGheKhachDat: [{ maGhe: 95881 }, { maGhe: 95882 }],
  tabActive: "1",
};

export const QuanLiDatVeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHI_TIET_PHONG_VE:
      return { ...state, chiTietPhongVe: action.chiTietPhongVe };
    case DAT_VE: {
      //cập nhật danh sách ghế đang đặt
      let danhSachGheCapNhat = [...state.danhSachGheDangDat];
      let index = danhSachGheCapNhat.findIndex(
        (gheDD) => gheDD.maGhe === action.gheDuocChon.maGhe
      );
      if (index !== -1) {
        danhSachGheCapNhat.splice(index, 1);
      } else {
        danhSachGheCapNhat.push(action.gheDuocChon);
      }

      //console.log(state.danhSachGheDangDat);
      return { ...state, danhSachGheDangDat: danhSachGheCapNhat };
    }

    case DAT_VE_HOAN_TAT: {
      return { ...state, danhSachGheDangDat: [] };
    }
    case CHUYEN_TAB: {
      return { ...state, tabActive: "2" };
    }
    case CHANGE_TAB_ACTIVE: {
      return { ...state, tabActive: action.number };
    }
    case "DAT_GHE": {
      state.danhSachGheKhachDat = action.arrGheKhachDat;
      return { ...state };
    }
    default:
      return state;
  }
};
