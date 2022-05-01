import { useSnackbar } from "notistack";
import { useIntl } from "react-intl";

interface IUseErrorHandle {
  customHandler?: (e: any) => void;
  rewriteHandler?: boolean;
}

export const useErrorHandle = (options: IUseErrorHandle = {}) => {
  const { customHandler, rewriteHandler = false } = options;

  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();

  const handleError = (error: any) => {
    if (rewriteHandler) {
      if (customHandler) {
        customHandler(error);
      }
    } else {
      if (error.status) {
        enqueueSnackbar(formatMessage({ id: `snackbar.${error.message as string}` }), { variant: "error" });
      } else if (error.code) {
        if (error.code === 4001) {
          enqueueSnackbar(formatMessage({ id: "snackbar.denied" }), { variant: "warning" });
        }
      } else {
        console.error(error);
        enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
      }

      if (customHandler) {
        customHandler(error);
      }
    }
  };

  return { handleError };
};
