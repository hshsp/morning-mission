import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import * as api from "./../network/api";
import { getYMDDate } from "../util/timeUtil";
import Card from "../components/Card";
import { Plan, UserPlan } from "../types/types";

const ListPlanPage = () => {
  const [value, setValue] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const [planList, setPlanList] = useState<UserPlan[]>();
  const init = async () => {
    const res = (await axios.get(api.getAllPlan())).data;

    console.log(res);

    const defaultPlanList = res.map((item: any) => ({
      ...item,
      plan: item.plan.map((planItem: any) => {
        const obj = planItem.contents;
        const arr = [];
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (obj[key].time) {
              arr.push(obj[key]);
            } else if (obj[key].plan) {
              arr.push({
                time: "00:00",
                contentsString: `${obj[key].plan}`,
              });
            }
          }
        }
        return {
          ...planItem,
          contents: arr,
        };
      }),
    }));
    console.log(defaultPlanList);
    setPlanList(defaultPlanList);
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
