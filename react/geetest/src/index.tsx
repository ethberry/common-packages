import { FC, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useFormContext, get } from "react-hook-form";

import { ApiContext } from "@gemunion/provider-api";

interface IRegisterResult {
  challenge: string;
  gt: string;
  new_captcha: boolean;
  success: number;
}

export interface IGeeTestCaptchaProps {
  name: string;
  className?: string;
}

// https://docs.geetest.com/captcha/apirefer/api/web

export const GeeTestCaptcha: FC<IGeeTestCaptchaProps> = props => {
  const { name, className } = props;

  const [captchaObj, setCaptchaObj] = useState<any | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const api = useContext(ApiContext);
  const form = useFormContext<any>();

  const error = get(form.formState.errors, name);

  useEffect(() => {
    if (error) {
      captchaObj.reset();
    }
  }, [error]);

  useLayoutEffect(() => {
    void api
      .fetchJson({
        url: `/gee-test/register?t=${Date.now()}`,
      })
      .then((json: IRegisterResult) => {
        // @ts-ignore
        initGeetest(
          {
            gt: json.gt,
            challenge: json.challenge,
            new_captcha: json.new_captcha,
            offline: !json.success,
            product: "float",
            width: "100%",
            lang: "en", // TODO use user.profile.language
          },
          (instance: any) => {
            instance.appendTo(ref.current);
            instance.onSuccess(() => {
              const result = instance.getValidate();
              form.setValue(name, {
                challenge: result.geetest_challenge,
                validate: result.geetest_validate,
                seccode: result.geetest_seccode,
              });
            });
            instance.onError((...arg: any) => {
              console.error(arg);
            });
            setCaptchaObj(instance);
          },
        );
      })
      .catch(console.error);
  }, []);

  return <div ref={ref} className={className} />;
};
