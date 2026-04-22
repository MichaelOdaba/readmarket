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

  // Collection APIs
  getCollections: {
    url: "/api/collection",
    method: "get",
  },
  getCollectionById: (id: string) => ({
    url: `/api/collection/${id}`,
    method: "get",
  }),
  getCollectionProducts: (
    id: string,
    page: number = 1,
    limit: number = 12
  ) => ({
    url: `/api/collection/${id}/products?page=${page}&limit=${limit}`,
    method: "get",
  }),
  addCollection: {
    url: "/api/collection/add",
    method: "post",
  },
  updateCollection: (id: string) => ({
    url: `/api/collection/${id}`,
    method: "put",
  }),
  deleteCollection: (id: string) => ({
    url: `/api/collection/${id}`,
    method: "delete",
  }),

  // Product APIs
  getLatestProducts: (limit: number = 8) => ({
    url: `/api/products?limit=${limit}&sort=-createdAt`,
    method: "get",
  }),
};

export default summaryApi;
