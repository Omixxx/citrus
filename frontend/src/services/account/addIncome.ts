import axios from 'axios'

export async function addIncome (
  amount: number,
  categoryId: number,
  date: Date
) {
  try {
    const result = await axios.post(
      `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/income/addIncome`,
      {
        amount,
        categoryId,
        date
      }
    )
    return result.data
  } catch (error: any) {
    alert(error.response.data.message)
  }
}
