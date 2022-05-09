import { FC, useContext, useState } from "react";

import { PopupContext } from "./context";

export const PopupProvider: FC = props => {
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

  const closePopupsAll = () => {
    setOpenPopups([]);
  };

  const closePopups = (amount: number) => {
    setOpenPopups(openPopups.slice(0, -amount));
  };

  return (
    <PopupContext.Provider
      value={{
        isOpenPopup,
        openPopup,
        closePopup,
        closePopups,
        closePopupsAll,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};

export function usePopup() {
  return useContext(PopupContext);
}
