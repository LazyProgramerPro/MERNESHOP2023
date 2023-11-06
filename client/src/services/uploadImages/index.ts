/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import request from "../request";
import { store } from "../../redux/store";

const UploadImagesApi = {
  uploadImages(body: any) {
    return axios.post(
      `${import.meta.env.VITE_APP_API}/upload-images`,
      JSON.stringify(body),
      {
        headers: {
          "Content-Type": "application/json",
          authtoken: store.getState().user.user?.token?.token,
        },
      }
    );
  },

  removeImage(public_id: string) {
    return request.post("/remove-image", { public_id });
  },
};

export default UploadImagesApi;
