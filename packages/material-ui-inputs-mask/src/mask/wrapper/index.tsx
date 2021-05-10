import React, {FC} from "react";
import {IMaskInput} from "react-imask";
import {useFormikContext} from "formik";

export const MaskedInputWrapper: FC<any> = props => {
  const {inputRef, maskedRef, name, ...rest} = props;

  const formik = useFormikContext<any>();

  return (
    <IMaskInput
      ref={(ref: any) => {
        if (ref && maskedRef && !maskedRef.current) maskedRef.current = ref.maskRef;

        inputRef(ref ? ref.inputElement : null);
      }}
      onAccept={(value: string) => formik.setFieldValue(name, value)}
      name={name}
      {...rest}
    />
  );
};
