import axios from "axios";
import { quanLyPhimService } from "../../service/QuanLyPhimService";
import { DOMAIN } from "../../util/settings/config";
import { SET_CAROUSEL } from "./types/CarouselTypes";

export const getCarouselActions = () => {
  return async (dispatch) => {
    try {
      const { data, status } = await quanLyPhimService.layDanhSachBanner();
      console.log("result", data);

      //đưa lên reducer
      dispatch({
        type: SET_CAROUSEL,
        arrImg: data.content,
      });
    } catch (err) {
      console.log("err", err);
    }
  };
};
