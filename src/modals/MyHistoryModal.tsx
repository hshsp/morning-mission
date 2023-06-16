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

  /**
   *
   * @param dayTerm 며칠간격으로 할 건지
   * @param referenceDate 기준일 (시작일) UTC
   * @param startHour 시작 시간 UTC
   * @param startMinutes 시작 분 UTC
   * @param startSeconds 시작 초 UTC
   * @returns
   */
  const utcGetStartTimeAndEndTimeRangeDayTerm = (
    dayTerm: number,
    referenceDate: Date,
    startHour: number,
    startMinutes: number,
    startSeconds: number
  ) => {
    // 시간,분만 비교하기 위해 년도, 월, 일은 같은 걸로 설정해준다.
    const goalTime = new Date();
    goalTime.setUTCHours(startHour);
    goalTime.setUTCMinutes(startMinutes);
    goalTime.setUTCSeconds(startSeconds);

    const referenceTime = new Date();
    referenceTime.setUTCHours(referenceDate.getUTCHours());
    referenceTime.setUTCMinutes(referenceDate.getUTCMinutes());
    referenceTime.setUTCSeconds(referenceDate.getUTCSeconds());

    const startTime = referenceDate;
    if (referenceTime < goalTime) {
      startTime.setUTCDate(startTime.getUTCDate() - 1);
    }

    startTime.setUTCHours(startHour, startMinutes, startSeconds);

    const endTime = new Date(startTime);
    endTime.setUTCDate(endTime.getUTCDate() + dayTerm);
    endTime.setUTCHours(startTime.getUTCHours());
    endTime.setUTCMinutes(startTime.getUTCMinutes());
    endTime.setUTCSeconds(startTime.getUTCSeconds());

    return { startTime, endTime };
  };

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
