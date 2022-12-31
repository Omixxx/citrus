import axios from "axios";

export async function getBalance() {
  return await axios
    .get(
      `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/account/balance`
    )
    .then((res) => {
      return res.data.balance;
    })
    .catch((err: Error) => {
      alert(`Error${err} message: ${err.message} `);
      return 33;
    });
}
