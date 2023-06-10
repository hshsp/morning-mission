import React from "react";
import styled, { css } from "styled-components";
import { exportTimeFromDate } from "../util/timeUtil";
import { Plan, UserPlan } from "../types/types";
import { PxToVw } from "../util/styleUtil";

interface Props {
  width?: string | number;
  data?: UserPlan;
}
const Card = (props: Props) => {
  const getBacgroundColor = (isSuccess?: number) => {
    switch (isSuccess) {
      case 1:
        return "#DFF1FF";
      case 2:
        return "#D5EFE0";
      case 3:
        return "#FFECEF";
    }
    return "#F2F4F6";
  };
  return (
    <Container
      style={{
        width:
          typeof props.width === "string"
            ? props.width
            : typeof props.width === "number"
            ? `${PxToVw(props.width)}`
            : "100%",
        background: getBacgroundColor(
          props.data && props.data.plan && props.data.plan.length > 0
            ? props.data?.plan[0].isSuccess
            : undefined
        ),
      }}
      className="scroll__invisible"
    >
      <Label>
        <Name
          style={{
            opacity: props.data?.plan && props.data?.plan.length > 0 ? 1 : 0.3,
          }}
        >
          {props.data?.name || ""}
        </Name>
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
          : "내용이 없습니다."}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  overflow: scroll;

  background: #dff1ff;
  border-radius: ${PxToVw(10)};
  padding: ${PxToVw(20)};

  display: flex;
  flex-direction: column;
  gap: ${PxToVw(10)};

  box-sizing: border-box;
`;

const Label = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${PxToVw(6)};
`;

const Name = styled.div`
  font-family: "SUIT";
  font-style: normal;
  font-weight: 500;
  font-size: ${PxToVw(16)};
  line-height: ${PxToVw(20)};
  /* identical to box height */

  letter-spacing: -0.01em;

  color: #333333;
`;
const Time = styled.div`
  font-family: "SUIT";
  font-style: normal;
  font-weight: 500;
  font-size: ${PxToVw(14)};
  line-height: 130%;

  letter-spacing: -0.01em;

  color: #333333;
  opacity: 0.3;
`;

const Content = styled.div`
  font-family: "SUIT";
  font-style: normal;
  font-weight: 400;
  font-size: ${PxToVw(16)};
  line-height: 130%;

  letter-spacing: -0.01em;

  color: #333333;

  width: 100%;
  white-space: pre-wrap;
  word-break: break-word;

  display: flex;
  flex-direction: column;
  gap: ${PxToVw(4)};
`;

const PlanBlock = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${PxToVw(20)};
  width: 100%;
`;

const PlanTime = styled.div`
  width: ${PxToVw(60)};
`;

const PlanString = styled.div`
  flex: 1;
`;

export default Card;
