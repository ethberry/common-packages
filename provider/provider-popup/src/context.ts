import { createContext } from "react";

export interface IPopupContext {
  getPopupOpen: (type: symbol) => boolean;
  setPopupOpen: (type: symbol, isOpen: boolean) => void;
}

export const PopupContext = createContext<IPopupContext>(undefined!);
