import React from "react";
import styled, { css } from "styled-components";
import { exportTimeFromDate, getDate, getMonth } from "../util/timeUtil";
import { Plan, PlanContainer, UserPlan } from "../types/types";
import { PxToVw } from "../util/styleUtil";

interface Props {
  width?: string | number;
  data?: PlanContainer;
}
const HistoryCard = (props: Props) => {
  const getBacgroundColor = (isSuccess?: number) => {
    switch (isSuccess) {
      case 1:
        return "#DFF1FF";
      case 2:
        return "#D5EFE0";
      case 3:
        return "#FFECEF";
    }
    return "#DFF1FF";
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
          props.data && props.data.isSuccess ? props.data.isSuccess : undefined
        ),
      }}
      className="scroll__invisible"
    >
      <Label>
        <Name>
          {props.data && props.data.creationTime
            ? `${getMonth(new Date(props.data?.creationTime))}월 ${getDate(
                new Date(props.data?.creationTime)
              )}일`
            : ""}
        </Name>
        <Time>
          {props.data && props.data.creationTime
            ? exportTimeFromDate(
                props.data && props.data.creationTime
                  ? new Date(props.data.creationTime)
                  : new Date()
              )
            : ""}
        </Time>
      </Label>
      <Content
        style={{
          opacity: props.data ? 0.7 : 0.3,
        }}
      >
        {props.data && props.data.contents && props.data.contents.length > 0
          ? [...props.data.contents].map((item: Plan) => (
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
  border-radius: 10px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  box-sizing: border-box;
`;

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

const PlanBlock = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
`;

const PlanTime = styled.div`
  width: 60px;
`;

const PlanString = styled.div`
  flex: 1;
`;

export default HistoryCard;
