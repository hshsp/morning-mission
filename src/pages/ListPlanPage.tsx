import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import * as api from "./../network/api";
import { getYMDDate } from "../util/timeUtil";
import Card from "../components/Card";

interface Props {}
const ListPlanPage = ({}: Props) => {
  const [value, setValue] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const [planList, setPlanList] = useState<
    {
      name: string;
      plan: string;
      time: string;
    }[]
  >();
  const init = async () => {
    // TODO 리스트 받아오기
    // const res = await axios.get(api.temp());

    const res = [
      {
        name: "박현선",
        plan: "plan",
        time: "07:02",
      },
      {
        name: "홍길동",
        plan: "plan",
        time: "07:02",
      },
    ];

    setPlanList(res);
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <Root>
      <Container>
        <DateLabel>{getYMDDate(value)}</DateLabel>
        <Gap gap={40} />
        <List>
          {planList?.map((item) => (
            <Card data={item} width={353}></Card>
          ))}
        </List>
      </Container>
    </Root>
  );
};

const Gap = styled.div<{ gap: number }>`
  height: ${(props) => props.gap}px;
  width: 100%;
`;

const DateLabel = styled.div`
  font-family: "SUIT";
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 27px;
  letter-spacing: -0.01em;

  color: #333333;

  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 10px;
`;
const Root = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 393px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default ListPlanPage;
