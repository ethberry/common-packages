import { createContext } from "react";

export interface IPopupContext {
  isOpenPopup: (type: symbol) => boolean;
  openPopup: (type: symbol) => void;
  closePopup: () => void;
  closePopups: (amount?: number) => void;
}

export const PopupContext = createContext<IPopupContext>(undefined!);
