export const baseURL: string = "http://localhost:8009/";
const summaryApi = {
  register: {
    url: "api/user/register",
    method: "post",
  },
  login: {
    url: "api/user/login",
    method: "post",
  },
};
export default summaryApi;
