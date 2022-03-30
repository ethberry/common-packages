import { FC, useEffect, useState } from "react";

import { licenseNotFound, licenseExpired, licenseRevoked, downForMaintenance } from "@gemunion/license-messages";
import { ILicense, LicenseStatus } from "@gemunion/types-license";

import { LicenseContext } from "./context";

interface ILicenseProviderProps {
  licenseKey: string;
  storageName?: string;
}

export const LicenseProvider: FC<ILicenseProviderProps> = props => {
  const { licenseKey, storageName = "license", children } = props;

  const [license, setLicense] = useState<ILicense | null>(null);
  const [isRetrieved, setIsRetrieved] = useState(false);

  const read = (key: string): ILicense | null => {
    const license = localStorage.getItem(key);
    return license ? (JSON.parse(license) as ILicense) : null;
  };

  const save = (key: string, license: ILicense | null): void => {
    const json = JSON.stringify(license);
    localStorage.setItem(key, json);
  };

  const refresh = async (): Promise<void> => {
    const license = await window
      .fetch(`https://license.gemunion.io/${licenseKey}`)
      .then(response => {
        if (response.status !== 200) {
          return null;
        }
        return response.json();
      })
      .catch(() => null);

    if (!license) {
      const bkp = read(storageName);
      if (bkp && new Date(bkp.refreshAt).getTime() > Date.now()) {
        setLicense(bkp);
        setIsRetrieved(true);
        return;
      }
    }

    setLicense(license);
    setIsRetrieved(true);
    save(storageName, license);
  };

  const isValid = (): boolean => {
    if (!isRetrieved) {
      return true;
    }

    if (!license) {
      console.error(licenseNotFound());
      return false;
    }

    if (license.status === LicenseStatus.EXPIRED) {
      console.error(licenseExpired());
      return false;
    }

    if (license.status === LicenseStatus.REVOKED) {
      console.error(licenseRevoked());
      return false;
    }

    return true;
  };

  useEffect(() => {
    void refresh();
  }, []);

  return (
    <LicenseContext.Provider
      value={{
        isValid,
        refresh,
      }}
    >
      {isValid() ? children : downForMaintenance()}
    </LicenseContext.Provider>
  );
};
