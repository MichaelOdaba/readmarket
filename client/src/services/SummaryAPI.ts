export const baseURL: string =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8009/";
const summaryApi = {
  register: {
    url: "/api/user/register",
    method: "post",
  },
  login: {
    url: "/api/user/login",
    method: "post",
  },
  logout: {
    url: "/api/user/logout",
    method: "get",
  },
  getUser: {
    url: "/api/user/get-user",
    method: "get",
  },
  editUser: {
    url: "/api/user/edit",
    method: "put",
  },
  getNotifications: {
    url: "/api/notification/",
    method: "get",
  },
  markNotificationAsRead: {
    url: "/api/notification/mark-as-read",
    method: "put",
  },
};
export default summaryApi;
