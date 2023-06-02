import React, { useState } from "react";
import styled, { css } from "styled-components";
import { PxToVw } from "../util/styleUtil";

interface Props {
  width?: string | number;
  placeholder?: string;
  isPassword?: boolean;
  borderColor?: string;
  maxLength?: number;
  value?: string;
  onChange?: (input: string) => void;
}
const Input = (props: Props) => {
  const [value, setValue] = useState<string>(props.value || "");
  return (
    <Container
      style={{
        width:
          typeof props.width === "string"
            ? props.width
            : typeof props.width === "number"
            ? `${PxToVw(props.width)}`
            : "100%",
      }}
      borderColor={props.borderColor}
      placeholder={props.placeholder || "입력하세요."}
      onChange={(e) => {
        setValue(e.target.value);
        props.onChange && props.onChange(e.target.value);
      }}
      type={props.isPassword ? "password" : "text"}
      maxLength={props.maxLength || 500}
      value={value}
    />
  );
};

const Container = styled.input<{ borderColor?: string }>`
  border-radius: ${PxToVw(10)};
  padding: ${PxToVw(14)} ${PxToVw(16)};

  font-family: "SUIT";
  font-style: normal;
  font-weight: 400;
  font-size: ${PxToVw(16)};
  line-height: 130%;
  color: #333333;
  border: ${PxToVw(1)} solid
    ${(props) => props.borderColor || "rgba(0, 0, 0, 0.15)"};

  box-sizing: border-box;

  &:focus {
    outline: none;
    border: ${PxToVw(1)} solid #2f80ed;
  }

  &::placeholder {
    font-family: "SUIT";
    font-style: normal;
    font-weight: 400;
    font-size: ${PxToVw(16)};
    line-height: 130%;
    color: rgba(51, 51, 51, 0.2);
  }
`;

export default Input;
