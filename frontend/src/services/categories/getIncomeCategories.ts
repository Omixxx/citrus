import axios from "axios";

export async function getIncomeCategories() {
  return await axios
    .get(
      `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/categories/income`
    )
    .then((response) => {
      return response.data;
    });
}
