import request from "../request";

const UserApi = {
  createOrUpdateUser() {
    return request.request({
      method: "POST",
      url: "/create-or-update-user",
    });
  },
  getCurrentUser() {
    return request.request({
      method: "GET",
      url: "/current-user",
    });
  },
  getCurrentAdmin() {
    return request.request({
      method: "GET",
      url: "/current-admin",
    });
  },
};

export default UserApi;
