import { FC, useState } from "react";

import { PopupContext } from "./context";

export const PopupProvider: FC = props => {
  const { children } = props;
  const [openPopups, setOpenPopups] = useState<Record<symbol, boolean>>({});

  const getPopupOpen = (type: symbol): boolean => {
    return openPopups[type] || false;
  };

  const setPopupOpen = (type: symbol, isOpen: boolean) => {
    setOpenPopups({
      ...openPopups,
      [type]: isOpen,
    });
  };

  return (
    <PopupContext.Provider
      value={{
        getPopupOpen,
        setPopupOpen,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};
