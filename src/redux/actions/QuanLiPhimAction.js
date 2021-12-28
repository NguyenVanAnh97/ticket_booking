import { quanLyPhimService } from "../../service/QuanLyPhimService";
import { SET_DANH_SACH_PHIM } from "./types/QuanLiPhimType";

export const layDanhSachPhimAction = () => {
  return async (dispatch) => {
    try {
      const { data, status } = await quanLyPhimService.layDanhSachPhim();
      console.log("result", data);

      //sau khi lấy dữ liệu từ api về => đưa lên reducer
      dispatch({
        type: SET_DANH_SACH_PHIM,
        arrPhim: data.content,
      });
    } catch (err) {
      console.log("err", err);
    }
  };
};
