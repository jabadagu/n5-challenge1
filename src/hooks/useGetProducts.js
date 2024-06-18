import Axios from "axios";

const getProducts = async (endpoint) => {
  try {
    const response = await Axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}${endpoint}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getProducts;
