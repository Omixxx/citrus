import axios from "axios";

export async function addIncome(
  amount: number,
  categoryId: number,
  data: Date
) {
  try {
    return await axios.post(
      `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/income/addIncome`,
      {
        amount,
        categoryId,
        data,
      }
    );
  } catch (error) {
    alert(error);
  }
}
