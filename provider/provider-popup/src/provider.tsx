import { FC, PropsWithChildren, useContext, useState } from "react";

import { PopupContext } from "./context";

export const PopupProvider: FC<PropsWithChildren> = props => {
  const { children } = props;
  const [openPopups, setOpenPopups] = useState<symbol[]>([]);

  const isOpenPopup = (type: symbol): boolean => {
    return openPopups.at(-1) === type;
  };

  const openPopup = (type: symbol) => {
    setOpenPopups(openPopups.concat(type));
  };

  const closePopup = () => {
    setOpenPopups(openPopups.slice(0, -1));
  };

  const closePopups = (amount = openPopups.length) => {
    setOpenPopups(openPopups.slice(0, -amount));
  };

  return (
    <PopupContext.Provider
      value={{
        isOpenPopup,
        openPopup,
        closePopup,
        closePopups,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};

export function usePopup() {
  return useContext(PopupContext);
}
