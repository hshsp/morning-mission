import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { PxToVw } from "../util/styleUtil";

import { ReactComponent as Close } from "../svg/Close.svg";
import axios from "axios";
import * as api from "../network/api";
import { Plan, PlanContainer } from "../types/types";
import HistoryCard from "../components/HistoryCard";
import { utcGetStartTimeAndEndTimeRangeDayTerm } from "../util/timeUtil";

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
        // const historyArr = res.map((item: any) => {
        //   const obj = item.contents;
        //   const arr = [];
        //   for (let key in obj) {
        //     if (obj.hasOwnProperty(key)) {
        //       if (obj[key].plan.time) {
        //         arr.push(obj[key].plan);
        //       }
        //     }
        //   }
        //   return {
        //     ...item,
        //     contents: arr,
        //   };
        // });
        let historyArr: any[] = [];
        let currentDate = new Date();
        const startDate = new Date(res[0].createdAt); // 제일 최신 (서버에서 내림차순으로 내려줌)
        const endDate = new Date(res[res.length - 1].createdAt); // 제일 오래된 거
        let i = 0;

        while (currentDate >= endDate) {
          const { startTime, endTime } = utcGetStartTimeAndEndTimeRangeDayTerm(
            1,
            currentDate,
            20, // 새벽 5시 UTC로
            0, // 분
            0 // 초
          );

          const itemDate = new Date(res[i].createdAt);

          if (
            // itemDate.toISOString().split("T")[0] === dateString
            // // && itemDate.toISOString().split("T")[1].split(".")[0] === timeString
            itemDate >= startTime &&
            itemDate < endTime
          ) {
            const obj = res[i].contents;
            const arr = [];
            for (let key in obj) {
              if (obj.hasOwnProperty(key)) {
                if (obj[key].plan.time) {
                  arr.push(obj[key].plan);
                }
              }
            }
            historyArr.push({
              ...res[i],
              contents: arr,
            });

            i++;
          } else {
            historyArr.push({
              createdAt: new Date(currentDate),
              creationTime: new Date(currentDate),
            });
          }

          currentDate.setDate(currentDate.getDate() - 1);
        }

        // 마지막꺼 추가
        if (
          historyArr[historyArr.length - 1].createdAt >
          new Date(res[res.length - 1].createdAt)
        ) {
          const obj = res[i].contents;
          const arr = [];
          for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
              if (obj[key].plan.time) {
                arr.push(obj[key].plan);
              }
            }
          }
          historyArr.push({
            ...res[i],
            contents: arr,
          });
        }

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
      <Contents>
        <Top>
          <span className="title">내 기록 보기</span>
          <Close
            className="close"
            onClick={() => props.onClickClose && props.onClickClose()}
          />
        </Top>
        <Gap gap={24} />

        {planHistory && planHistory.length > 0 ? (
          <ListContainer>
            <List>
              {planHistory.map((item) => (
                <HistoryCard data={item} width={353}></HistoryCard>
              ))}
            </List>
          </ListContainer>
        ) : (
          <EmptyHistory>
            <Gap gap={294} />
            <div className="label">작성한 내용이 없습니다.</div>
          </EmptyHistory>
        )}
      </Contents>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;

  bottom: 0;

  box-sizing: border-box;

  background: rgba(0, 0, 0, 0.5);
`;

const Contents = styled.div`
  position: absolute;
  bottom: 0;
  height: ${PxToVw(774)};
  max-height: 70vh;
  width: 100%;
  background: rgba(250, 250, 250, 0.93);
  backdrop-filter: blur(40px);
  padding: ${PxToVw(20)} ${PxToVw(20)} 0 ${PxToVw(20)};
  border-radius: ${PxToVw(13)} ${PxToVw(13)} ${PxToVw(0)} ${PxToVw(0)};
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  position: sticky;
  top: 0;

  .title {
    font-family: "SUIT";
    font-style: normal;
    font-weight: 600;
    font-size: ${PxToVw(18)};
    line-height: ${PxToVw(22)};
    letter-spacing: -0.025em;

    color: #333333;

    opacity: 0.6;
  }

  .close {
    cursor: pointer;
  }
`;

const Gap = styled.div<{ gap: number }>`
  min-height: ${(props) => PxToVw(props.gap)};
  width: 100%;
`;

const ListContainer = styled.div`
  flex: 1;
  overflow: scroll;
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${PxToVw(10)};
`;

const EmptyHistory = styled.div`
  .label {
    text-align: center;

    font-family: "SUIT";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;
    /* identical to box height */

    letter-spacing: -0.02em;

    color: #333333;

    opacity: 0.3;
  }
`;

export default MyHistoryModal;
