import axios from 'axios'

export default async function addExpense (
  amount: number,
  categoryId: number,
  date: Date
) {
  try {
    const response = await axios.post(
      `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/expense/addExpense`,
      {
        amount,
        categoryId,
        date
      }
    )
    return response.data
  } catch (error: any) {
    alert(error.response.data.message)
  }
}
