import React from "react";
import styled, { css } from "styled-components";

interface Props {
  width?: string | number;
  placeholder?: string;
  isPassword?: boolean;
  borderColor?: string;
  onChange?: (input: string) => void;
}
const Input = (props: Props) => {
  return (
    <Container
      style={{
        width:
          typeof props.width === "string"
            ? props.width
            : typeof props.width === "number"
            ? `${props.width}px`
            : "100%",
      }}
      borderColor={props.borderColor}
      placeholder={props.placeholder || "입력하세요."}
      onChange={(e) => props.onChange && props.onChange(e.target.value)}
      type={props.isPassword ? "password" : "text"}
    />
  );
};

const Container = styled.input<{ borderColor?: string }>`
  border-radius: 10px;
  padding: 14px 16px;

  font-family: "SUIT";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  color: #333333;
  border: 1px solid ${(props) => props.borderColor || "rgba(0, 0, 0, 0.15)"};

  &:focus {
    outline: none;
    border: 1px solid #2f80ed;
  }

  &::placeholder {
    font-family: "SUIT";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 130%;
    color: rgba(51, 51, 51, 0.2);
  }
`;

export default Input;
