import { useContext } from "react";

import { IUserContext, UserContext } from "./context";

export function useUser<T>() {
  return useContext<IUserContext<T>>(UserContext);
}
