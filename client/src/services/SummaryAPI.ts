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
  CreateAdmin: {
    url: "/api/user/create-admin",
    method: "post",
  },
  getNotifications: {
    url: "/api/notification/get-notifications",
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
  getAllProducts: {
    url: "/api/products",
    method: "get",
  },
  getProductById: (id: string) => ({
    url: `/api/products/${id}`,
    method: "get",
  }),
  uploadProduct: {
    url: "/api/products/upload",
    method: "post",
  },
  endpoints: {
    downloadProduct: (id: string) => ({
      url: `/api/products/${id}/download`,
      method: "get",
    }),
  },
};

export default summaryApi;
