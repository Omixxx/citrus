import axios from "axios";

export default async function getIncomes() {
  return await axios
    .get(
      `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/income/incomes`
    )
    .then((response) => {
      return response.data;
    });
}
