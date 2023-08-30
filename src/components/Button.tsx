import React from "react";
import styled from "styled-components";
import { PxToVw } from "../util/styleUtil";

interface Props {
  text?: string;
  disabled: boolean;
  colorType: "success" | "half-success" | "fail";
  size: "small" | "large";
  onClick?: () => void;
}
const Button = (props: Props) => {
  const getStyles = () => {
    const styles = {};

    switch (props.size) {
      case "small":
        Object.assign(styles, {
          width: PxToVw(109),
          height: PxToVw(37),
        });
        break;
      case "large":
        Object.assign(styles, {
          width: PxToVw(353),
          height: PxToVw(50),
        });
        break;
    }

    if (props.disabled) {
      Object.assign(styles, {
        background: "#CFCFCF",
        cursor: "default",
        border: "none",
      });
      return styles;
    }

    switch (props.colorType) {
      case "success":
        Object.assign(styles, {
          background: "#2F80ED",
        });
        break;
      case "half-success":
        Object.assign(styles, {
          background: "#39CA76",
        });
        break;
      case "fail":
        Object.assign(styles, {
          background: "#DF1525",
        });
        break;
    }

    Object.assign(styles, {
      cursor: "pointer",
      border: "1px solid rgba(0, 0, 0, 0.15)",
    });

    return styles;
  };

  return (
    <Container
      style={{
        ...getStyles(),
      }}
      onClick={() => !props.disabled && props.onClick && props.onClick()}
    >
      {props.text || "버튼"}
    </Container>
  );
};

const Container = styled.button`
  border-radius: ${PxToVw(10)};

  font-family: "SUIT";
  font-style: normal;
  font-weight: 500;
  font-size: ${PxToVw(16)};
  line-height: ${PxToVw(20)};
  /* identical to box height */

  letter-spacing: -0.01em;

  color: #ffffff;
`;

export default Button;
