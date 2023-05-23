import React from "react";
import styled, { css } from "styled-components";

interface Props {
  width?: string | number;
  placeholder?: string;
  onChange?: (input: string) => void;
}
const Textarea = (props: Props) => {
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
      placeholder={props.placeholder || "입력하세요."}
      onChange={(e) => props.onChange && props.onChange(e.target.value)}
      spellCheck={false}
    ></Container>
  );
};

const Container = styled.textarea`
  resize: none;

  height: 200px;

  padding: 14px 16px;

  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 10px;

  font-family: "SUIT";
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 22px;
  /* or 138% */

  letter-spacing: -0.005em;

  color: #333333;

  &:focus {
    outline: none;
  }

  &::placeholder {
    font-family: "SUIT";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 130%;
    /* identical to box height, or 21px */

    letter-spacing: -0.005em;

    color: rgba(51, 51, 51, 0.2);
  }
`;

export default Textarea;
