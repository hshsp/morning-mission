import React, { useState } from "react";
import styled, { css } from "styled-components";
import { getHM, getYMDDate } from "../util/timeUtil";
import moment from "moment";

interface Props {
  date: Date;
}
const Clock = (props: Props) => {
  return (
    <Container>
      <Top>
        <HourMin>{getHM(props.date)}</HourMin>
        <Column>
          <div>{moment(props.date).hour() >= 12 ? "PM" : "AM"}</div>
          <Divider />
          <div>{moment(props.date).second()}</div>
        </Column>
      </Top>
      <Bottom>{getYMDDate(props.date)}</Bottom>
    </Container>
  );
};

const Top = styled.div`
  display: flex;
  flex-direction: row;

  height: 110px;

  gap: 8px;
`;

const HourMin = styled.div`
  font-family: "SUIT";
  font-style: normal;
  font-weight: 300;
  font-size: 88px;
  line-height: 110px;

  color: #333333;
`;

const Column = styled.div`
  font-family: "SUIT";
  font-style: normal;
  font-weight: 200;
  font-size: 28px;
  line-height: 35px;
  /* identical to box height */

  color: #333333;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 4px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #333333;
  opacity: 0.1;
`;
const Bottom = styled.div`
  font-family: "SUIT";
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 28px;
  /* identical to box height, or 156% */

  color: #333333;
`;

const Container = styled.div`
  width: 223px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Clock;
