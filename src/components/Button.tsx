import React from "react";
import styled, { css } from "styled-components";
import { PxToVw } from "../util/styleUtil";

interface Props {
  width?: string | number;
  text?: string;
  disabled?: boolean;
  backgroundColor?: string;
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
            ? `${PxToVw(props.width)}`
            : "100%",
        background: props.disabled
          ? "#CFCFCF"
          : props.backgroundColor || "#2f80ed",
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
  border-radius: ${PxToVw(10)};

  padding: ${PxToVw(15)} ${PxToVw(20)};

  font-family: "SUIT";
  font-style: normal;
  font-weight: 500;
  font-size: ${PxToVw(16)};
  line-height: ${PxToVw(20)};
  /* identical to box height */

  letter-spacing: -0.01em;

  color: #ffffff;

  cursor: pointer;
`;

export default Button;
