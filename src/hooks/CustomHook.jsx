import React, { useState } from "react";

const useInput = (validateValue) => {
  const [inputValue, setInputValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const valueIsValid = validateValue(inputValue);
  const hasError = !valueIsValid && isTouched;

  const inputChangeHandler = (event) => {
    setInputValue(event.target.value);
    setIsTouched(true);
  };

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
    setInputValue("");
    setIsTouched(false);
  };

  return {
    value: inputValue,
    hasError,
    isValid: valueIsValid,
    inputChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;