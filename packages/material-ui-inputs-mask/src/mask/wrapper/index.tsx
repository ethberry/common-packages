import React, {FC} from "react";
import {IMaskInput} from "react-imask";

export const MaskedInputWrapper: FC<any> = props => {
  const {inputRef, maskedRef, ...rest} = props;

  return (
    <IMaskInput
      ref={(ref: any) => {
        if (ref && maskedRef && !maskedRef.current) maskedRef.current = ref.maskRef;
        inputRef(ref ? ref.inputElement : null);
      }}
      {...rest}
    />
  );
};
