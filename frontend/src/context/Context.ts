import { createContext } from "react";

interface BalanceContextType {
  balance: number;
  setBalance: (balance: number) => void;
}

export const BalanceContext = createContext<BalanceContextType>({
  balance: 0,
  setBalance: () => { },
});
