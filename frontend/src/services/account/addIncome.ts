import axios from "axios";

export async function addIncome(
  amount: number,
  categoryId: number,
  date: Date
) {
  return await axios
    .post(
      `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/income/addIncome`,
      {
        amount,
        categoryId,
        date,
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      alert(error);
    });
}
