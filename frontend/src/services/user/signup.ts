import axios from "axios";

export function signup(
  username: string,
  email: string,
  emailValidity: boolean | undefined,
  password: string,
  confirmedPassword: string,
  history: any
) {
  if (
    areInputValid(username, email, emailValidity, password, confirmedPassword)
  ) {
    axios
      .post(
        `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/user/signup`,
        { username: username, email: email, password: password }
      )
      .then((res) => {
        alert(`User created successfully ${res.status}`);
        history.push("/login");
      })
      .catch((err) => {
        alert(err.message);
      });
  }
}

function areInputValid(
  username: string,
  email: string,
  emailValidity: boolean | undefined,
  password: string,
  confirmedPassword: string
): boolean {
  if (
    username === "" ||
    email === "" ||
    password === "" ||
    confirmedPassword === ""
  ) {
    alert("Please fill in all fields");
    return false;
  }
  if (password !== confirmedPassword) {
    alert("Passwords don't match!!");
    return false;
  }
  if (emailValidity === undefined || !emailValidity) {
    alert("Please enter a valid email address");
    return false;
  }
  if (password.length < 6) {
    alert("Password must be at least 6 characters long");
    return false;
  }
  return true;
}
