import axios from "axios";

export async function addIncome(
  amount: number,
  categoryId: number,
  data: Date
) {
  try {
    const res = await axios.post(
      `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/income/addIncome`,
      {
        amount,
        categoryId,
        data,
      }
    );
    return res.data.balance;
  } catch (error) {
    alert("ff" + error);
  }
}
