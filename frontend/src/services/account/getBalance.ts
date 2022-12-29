import axios from "axios";

export async function getBalance() {
  return await axios
    .get("http://localhost:8000/account/balance")
    .then((res) => {
      return res.data.balance;
    })
    .catch((err: Error) => {
      alert(`Error${err} message: ${err.message} `);
      return 33;
    });
}
