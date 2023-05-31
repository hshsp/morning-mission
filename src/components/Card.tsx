import React from "react";
import styled, { css } from "styled-components";
import { exportTimeFromDate } from "../util/timeUtil";
import { Plan, UserPlan } from "../types/types";

interface Props {
  width?: string | number;
  data?: UserPlan;
}
const Card = (props: Props) => {
  const getBacgroundColor = (creationTime?: string) => {
    const date = new Date(creationTime || "");

    const hour = date.getHours();
    const min = date.getMinutes();
    if (hour === 7 || hour === 8 || (hour === 9 && min === 0)) {
      return "#DFF1FF";
    }

    if (
      hour === 9 ||
      hour === 10 ||
      hour === 11 ||
      (hour === 12 && min === 0)
    ) {
      return "#D5EFE0";
    }

    return "#FFECEF";
  };
  return (
    <Container
      style={{
        width:
          typeof props.width === "string"
            ? props.width
            : typeof props.width === "number"
            ? `${props.width}px`
            : "100%",
        background: getBacgroundColor(
          props.data && props.data.plan && props.data.plan.length > 0
            ? props.data?.plan[0].creationTime
            : undefined
        ),
      }}
      className="scroll__invisible"
    >
      <Label>
        <Name>{props.data?.name || ""}</Name>
        <Time>
          {props.data &&
          props.data.plan &&
          props.data.plan.length > 0 &&
          props.data.plan[0].creationTime
            ? exportTimeFromDate(
                props.data &&
                  props.data.plan &&
                  props.data.plan.length > 0 &&
                  props.data.plan[0].creationTime
                  ? new Date(props.data?.plan[0].creationTime)
                  : new Date()
              )
            : ""}
        </Time>
      </Label>
      <Content
        style={{
          opacity: props.data?.plan && props.data?.plan.length > 0 ? 0.7 : 0.3,
        }}
      >
        {props.data?.plan &&
        props.data?.plan.length > 0 &&
        props.data.plan[0].contents &&
        props.data.plan[0].contents.length > 0
          ? [...props.data.plan[0].contents].map((item: Plan) => (
              <PlanBlock>
                <PlanTime>{item.time}</PlanTime>
                <PlanString>{item.contentsString}</PlanString>
              </PlanBlock>
            ))
          : "아직 작성 전입니다."}
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
  opacity: 0.3;
`;

const Content = styled.div`
  font-family: "SUIT";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;

  letter-spacing: -0.01em;

  color: #333333;

  width: 100%;
  white-space: pre-wrap;
  word-break: break-word;

  display: flex;
  flex-direction: column;
  gap: 4px;
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

const PlanBlock = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const PlanTime = styled.div`
  width: 60px;
`;

const PlanString = styled.div`
  flex: 1;
`;

export default Card;
