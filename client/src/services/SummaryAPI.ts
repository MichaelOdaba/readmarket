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
    url: "/api/user/edit-user",
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
    url: "/api/collection/get-collections",
    method: "get",
  },
  getCollectionById: (id: string) => ({
    url: `/api/collection/get-collection/${id}`,
    method: "get",
  }),
  getCollectionProducts: (
    id: string,
    page: number = 1,
    limit: number = 12
  ) => ({
    url: `/api/collection/get-collection/${id}/products?page=${page}&limit=${limit}`,
    method: "get",
  }),
  addCollection: {
    url: "/api/collection/add-collection",
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
    url: "/api/product/get-products",
    method: "get",
  },
  getProductById: (id: string) => ({
    url: `/api/product/${id}`,
    method: "get",
  }),
  uploadProduct: {
    url: "/api/product/upload-product",
    method: "post",
  },
  endpoints: {
    downloadProduct: (id: string) => ({
      url: `/api/product/${id}/download`,
      method: "get",
    }),
  },
};

export default summaryApi;
