import { getJwt } from "../services/device/storage";
import axios from 'axios';


export function isAuthenticated(): boolean {
  let autenticationStatus: boolean = false
  const token = getJwt()
  if (token === null || token === undefined) { return autenticationStatus; }
  //ricorda che siccome hai gia gli interceptor, il token è gia presente in ogni chiamata. 
  //quindi si potrà toglire anche dal body della chiamata 
  axios.post(
    `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/auth/isAuthenticated`,
    { token: token }).then((response) => { autenticationStatus = response.data; })
  return autenticationStatus;
}

