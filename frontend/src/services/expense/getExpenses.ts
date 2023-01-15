import axios from "axios";

export default async function getExpenses() {
  return await axios
    .get(
      `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/expense/expenses`
    )
    .then((response) => {
      return response.data;
    });
}
