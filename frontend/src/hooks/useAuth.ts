import axios from "axios";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  //ogni volta che viene montato il componente,
  //viene eseguito il codice all'interno di useEffect
  //
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(
          `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/user/isAuth`
        );
        setIsAuth(true);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  return { isAuth, isLoading };
};
