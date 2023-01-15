import axios from "axios";

export async function addIncome(
  amount: number,
  categoryId: number,
  data: Date
) {
  return await axios
    .post(
      `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/income/addIncome`,
      {
        amount,
        categoryId,
        data,
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      alert(error);
    });
}
