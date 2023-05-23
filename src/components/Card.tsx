import React from "react";
import styled, { css } from "styled-components";

interface Props {
  width?: string | number;
  data?: {
    name: string;
    plan: string;
    time: string;
  };
}
const Card = (props: Props) => {
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
    >
      <Label>
        <Name>{props.data?.name}</Name>
        <Time>12:04</Time>
      </Label>
      <Content>{props.data?.plan}</Content>
    </Container>
  );
};

const Label = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

const Name = styled.div`
  font-family: "SUIT";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  /* identical to box height */

  letter-spacing: -0.01em;

  color: #333333;
`;
const Time = styled.div`
  font-family: "SUIT";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  /* or 18px */

  letter-spacing: -0.01em;

  color: #333333;
`;

const Content = styled.div`
  font-family: "SUIT";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  /* or 21px */

  letter-spacing: -0.01em;

  color: #333333;

  opacity: 0.7;
`;

const Container = styled.div`
  height: 160px;

  background: #dff1ff;
  border-radius: 10px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default Card;
