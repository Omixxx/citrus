import axios from "axios";

export async function getExpenseCategories() {
  return await axios
    .get(
      `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/categories/expense`
    )
    .then((response) => {
      return response.data;
    });
}
