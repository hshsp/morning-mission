import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { PxToVw } from "../util/styleUtil";
import { ReactSortable } from "react-sortablejs";

import { ReactComponent as Close } from "../svg/Close.svg";
import { ReactComponent as DragButton } from "../svg/DragButton.svg";
import Input from "../components/Input";
import Button from "../components/Button";
import { getISOStringUtc } from "../util/timeUtil";
import axios from "axios";
import * as api from "../network/api";
import { Plan, PlanContainer } from "../types/types";
import Card from "../components/Card";
import HistoryCard from "../components/HistoryCard";

interface Props {
  onClickClose?: () => void;
}
const MyHistoryModal = (props: Props) => {
  const [planHistory, setPlanHistory] = useState<PlanContainer[]>();

  const init = async () => {
    try {
      const res = (
        await axios.get(api.getMyPlanHistory(), {
          params: {
            startTime: "2000-05-01T15:00:00.000Z",
            endTime: "3000-06-03T15:00:00.000Z",
          },
        })
      ).data;

      if (res) {
        const historyArr = res.map((item: any) => {
          const obj = item.contents;
          const arr = [];
          for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
              if (obj[key].plan.time) {
                arr.push(obj[key].plan);
              }
            }
          }
          return {
            ...item,
            contents: arr,
          };
        });
        setPlanHistory(historyArr);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Container className="scroll__invisible">
      <Top>
        <span className="title">내 기록 보기</span>
        <Close
          className="close"
          onClick={() => props.onClickClose && props.onClickClose()}
        />
      </Top>
      <Gap gap={24} />

      <List>
        {planHistory?.map((item) => (
          <HistoryCard data={item} width={353}></HistoryCard>
        ))}
        {planHistory?.map((item) => (
          <HistoryCard data={item} width={353}></HistoryCard>
        ))}
        {planHistory?.map((item) => (
          <HistoryCard data={item} width={353}></HistoryCard>
        ))}
        {planHistory?.map((item) => (
          <HistoryCard data={item} width={353}></HistoryCard>
        ))}
        {planHistory?.map((item) => (
          <HistoryCard data={item} width={353}></HistoryCard>
        ))}
        {planHistory?.map((item) => (
          <HistoryCard data={item} width={353}></HistoryCard>
        ))}
        {planHistory?.map((item) => (
          <HistoryCard data={item} width={353}></HistoryCard>
        ))}
        {planHistory?.map((item) => (
          <HistoryCard data={item} width={353}></HistoryCard>
        ))}
        {planHistory?.map((item) => (
          <HistoryCard data={item} width={353}></HistoryCard>
        ))}
        {planHistory?.map((item) => (
          <HistoryCard data={item} width={353}></HistoryCard>
        ))}
        {planHistory?.map((item) => (
          <HistoryCard data={item} width={353}></HistoryCard>
        ))}
        {planHistory?.map((item) => (
          <HistoryCard data={item} width={353}></HistoryCard>
        ))}
        {planHistory?.map((item) => (
          <HistoryCard data={item} width={353}></HistoryCard>
        ))}
        {planHistory?.map((item) => (
          <HistoryCard data={item} width={353}></HistoryCard>
        ))}
        {planHistory?.map((item) => (
          <HistoryCard data={item} width={353}></HistoryCard>
        ))}
        {planHistory?.map((item) => (
          <HistoryCard data={item} width={353}></HistoryCard>
        ))}
      </List>
    </Container>
  );
};

const Container = styled.div`
  max-height: 100vh;
  width: ${PxToVw(393)};
  background: rgba(250, 250, 250, 0.93);
  backdrop-filter: blur(40px);

  border-radius: 13px 13px 0px 0px;
  box-sizing: border-box;

  overflow: scroll;
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: rgba(250, 250, 250, 0.93);
  padding: 20px;

  position: sticky;
  top: 0;

  .title {
    font-family: "SUIT";
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: -0.025em;

    color: #333333;

    opacity: 0.6;
  }

  .close {
    cursor: pointer;
  }
`;

const Gap = styled.div<{ gap: number }>`
  min-height: ${(props) => props.gap}px;
  width: 100%;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
`;

export default MyHistoryModal;
