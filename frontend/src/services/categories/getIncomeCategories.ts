import axios from "axios";

export async function getIncomeCategories() {
  try {
    const response = await axios.get(
      `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/categories/income`
    );
    return response.data;
  } catch (error) {
    return alert(` error: ${error}`);
  }
}
