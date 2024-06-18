import Axios from "axios";

const addProduct = async (endpoint, product) => {
  try {
    const response = await Axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}${endpoint}`,
      product
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default addProduct;
