import summaryApi from "../services/SummaryAPI";
import customAxios from "./customAxios";

const getUser = async () => {
  try {
    const response = await customAxios({
      ...summaryApi.getUser,
    });

    return response.data.data;
  } catch (error) {
    console.error("Error fetching user details:", error);

    throw error;
  }
};
export default getUser;
