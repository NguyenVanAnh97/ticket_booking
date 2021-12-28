import {
  SET_DANH_SACH_PHIM,
  SET_PHIM_DANG_CHIEU,
  SET_PHIM_SAP_CHIEU,
} from "../actions/types/QuanLiPhimType";
import { SET_CHI_TIET_PHIM } from "../actions/types/QuanLyRapType";

const initialState = {
  arrPhim: [],
  dangChieu: true,
  sapChieu: true,
  arrFilmsDefault: [],
  filmDetail: {},
};

export const QuanLyPhimReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DANH_SACH_PHIM:
      state.arrPhim = action.arrPhim;
      state.arrFilmsDefault = state.arrPhim;
      return { ...state };
    case SET_PHIM_DANG_CHIEU: {
      state.dangChieu = !state.dangChieu;
      state.arrPhim = state.arrFilmsDefault.filter(
        (films) => films.dangChieu === state.dangChieu
      );
      return { ...state };
    }
    case SET_PHIM_SAP_CHIEU: {
      state.sapChieu = !state.sapChieu;
      state.arrPhim = state.arrFilmsDefault.filter(
        (films) => films.sapChieu === state.sapChieu
      );
      return { ...state };
    }
    case SET_CHI_TIET_PHIM: {
      return { ...state, filmDetail: action.filmDetail };
    }
    default:
      return { ...state };
  }
};
