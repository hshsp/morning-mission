import React from "react";
import styled, { css } from "styled-components";
import { Plan } from "../pages/ListPlanPage";
import { exportTimeFromDate } from "../util/timeUtil";

interface Props {
  width?: string | number;
  data?: {
    id?: string;
    name?: string;
    email?: string;
    plan?: Plan[];
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
      className="scroll__invisible"
    >
      <Label>
        <Name>{props.data?.name || ""}</Name>
        <Time>
          {exportTimeFromDate(
            props.data &&
              props.data.plan &&
              props.data.plan.length > 0 &&
              props.data.plan[0].creationTime
              ? new Date(props.data?.plan[0].creationTime)
              : new Date()
          )}
        </Time>
      </Label>
      <Content>
        {props.data?.plan &&
          props.data?.plan.length > 0 &&
          props.data.plan[0].contents.plan}
      </Content>
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

  letter-spacing: -0.01em;

  color: #333333;
`;

const Content = styled.div`
  font-family: "SUIT";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;

  letter-spacing: -0.01em;

  color: #333333;

  opacity: 0.7;

  width: 100%;
  white-space: normal;
  word-break: break-word;
`;

const Container = styled.div`
  height: 160px;
  max-height: 160px;
  overflow: scroll;

  background: #dff1ff;
  border-radius: 10px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default Card;
