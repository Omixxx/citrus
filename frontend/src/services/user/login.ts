import axios from "axios";
import { storeJwt } from "../../services/jwt";

export function login(email: string, password: string, history: any) {
  axios
    .post(
      ` http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/user/login`,
      {
        email: email,
        password: password,
      }
    )
    .then((res) => {
      alert(`User logged in successfully ${res.status}`);
      alert(`token is ${res.data.token}`);
      storeJwt(res.data.token);
      history.push("/home");
    })
    .catch((err) => {
      alert(err.message);
    });
}
