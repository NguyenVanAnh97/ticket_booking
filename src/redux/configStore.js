import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { CarouselReducer } from "./reducers/CarouselReducer";
import { LoadingReducer } from "./reducers/LoadingReducer";
import { QuanLiDatVeReducer } from "./reducers/QuanLiDatVeReducer";
import { QuanLyNguoiDungReducer } from "./reducers/QuanLyNguoiDungReducer";
import { QuanLyPhimReducer } from "./reducers/QuanLyPhimReducer";
import { QuanLyRapReducer } from "./reducers/QuanLyRapReducer";

const rootReducer = combineReducers({
  //state ứng dụng
  CarouselReducer,
  QuanLyPhimReducer,
  QuanLyRapReducer,
  QuanLyNguoiDungReducer,
  QuanLiDatVeReducer,
  LoadingReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
