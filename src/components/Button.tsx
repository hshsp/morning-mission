import React from "react";
import styled, { css } from "styled-components";

interface Props {
  width?: string | number;
  text?: string;
  disabled?: boolean;
  onClick?: () => void;
}
const Button = (props: Props) => {
  return (
    <Container
      style={{
        width:
          typeof props.width === "string"
            ? props.width
            : typeof props.width === "number"
            ? `${props.width}px`
            : "100%",
        background: props.disabled ? "#CFCFCF" : "#2f80ed",
        cursor: props.disabled ? "default" : "pointer",
        border: props.disabled ? "none" : "1px solid rgba(0, 0, 0, 0.15)",
      }}
      onClick={() => !props.disabled && props.onClick && props.onClick()}
    >
      {props.text || "버튼"}
    </Container>
  );
};

const Container = styled.button`
  border-radius: 10px;

  padding: 15px 20px;

  font-family: "SUIT";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  /* identical to box height */

  letter-spacing: -0.01em;

  color: #ffffff;

  cursor: pointer;
`;

export default Button;
