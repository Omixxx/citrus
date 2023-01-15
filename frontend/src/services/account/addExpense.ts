import axios from "axios";

export default async function addExpense(
  amount: number,
  categoryId: number,
  date: Date
) {
  return await axios
    .post(
      `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/expense/addExpense`,
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
      alert(error.message);
    });
}
