import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as api from "./../network/api";
import "react-clock/dist/Clock.css";
import Button from "../components/Button";
import {
  getAmPm,
  getDate,
  getDayKorean,
  getHM,
  getMonth,
  getSecond,
  getYMDHM,
} from "../util/timeUtil";
import Input from "../components/Input";
import { Plan } from "../types/types";

const WritePlanPage = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const [plans, setPlans] = useState<Plan[]>([]);

  const [resultText, setResultText] = useState<string>("");
  const [resultColor, setResultColor] = useState<string>("");

  const [isConfirmable, setIsConfirmable] = useState<boolean>(false);

  const updateResult = () => {
    const date = new Date();
    setCurrentDate(date);

    const hour = date.getHours();
    const min = date.getMinutes();

    if (hour === 7 || hour === 8 || (hour === 9 && min === 0)) {
      setResultText("지금 인증하면 성공");
      setResultColor("#2F80ED");
      return;
    }

    if (
      hour === 9 ||
      hour === 10 ||
      hour === 11 ||
      (hour === 12 && min === 0)
    ) {
      setResultText("지금 인증하면 반절 성공");
      setResultColor("#39CA76");
      return;
    }

    setResultText("지금 인증하면 실패");
    setResultColor("#DF1525");
  };

  const initPlan = () => {
    const emptyPlan: Plan = {
      time: "",
      contents: "",
    };
    const emptyPlans: Plan[] = [];
    [...new Array(3)].forEach((item) => {
      emptyPlans.push({
        ...emptyPlan,
      });
    });
    setPlans(emptyPlans);
  };

  useEffect(() => {
    updateResult();
    initPlan();

    const interval = setInterval(() => {
      updateResult();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const updatePlans = (index: number, newPlan: Plan) => {
    const newPlans = [...plans];
    newPlans[index] = { ...newPlan };
    setPlans(newPlans);

    setIsConfirmable(
      newPlans.filter((item) => !item.time || !item.contents).length === 0
    );
  };

  return (
    <Root>
      <Container>
        <TimeLabel>
          {`${getMonth(currentDate)}월 ${getDate(currentDate)}일 ${getDayKorean(
            currentDate
          )} ${getHM(currentDate)}:${getSecond(currentDate)}${getAmPm(
            currentDate
          )}`}
        </TimeLabel>
        <Gap gap={60} />

        <SuccessLabel color={resultColor}>{resultText}</SuccessLabel>
        <Gap gap={12} />
        <Title>{`오늘의 가장 중요한 일\n3개를 작성해주세요`}</Title>

        <OrderLabel>첫번째</OrderLabel>
        <TimeAndPlan>
          <Input
            width={80}
            placeholder="언제"
            onChange={(input) => {
              updatePlans(0, {
                ...plans[0],
                time: input,
              });
            }}
          />
          <Input
            width={263}
            placeholder="ㅇㅇ하기"
            onChange={(input) => {
              updatePlans(0, {
                ...plans[0],
                contents: input,
              });
            }}
          />
        </TimeAndPlan>

        <Gap gap={20} />

        <OrderLabel>두번째</OrderLabel>
        <TimeAndPlan>
          <Input
            width={80}
            placeholder="언제"
            onChange={(input) => {
              updatePlans(1, {
                ...plans[1],
                time: input,
              });
            }}
          />
          <Input
            width={263}
            placeholder="ㅇㅇ하기"
            onChange={(input) => {
              updatePlans(1, {
                ...plans[1],
                contents: input,
              });
            }}
          />
        </TimeAndPlan>
        <Gap gap={20} />

        <OrderLabel>세번째</OrderLabel>
        <TimeAndPlan>
          <Input
            width={80}
            placeholder="언제"
            onChange={(input) => {
              updatePlans(2, {
                ...plans[2],
                time: input,
              });
            }}
          />
          <Input
            width={263}
            placeholder="ㅇㅇ하기"
            onChange={(input) => {
              updatePlans(2, {
                ...plans[2],
                contents: input,
              });
            }}
          />
        </TimeAndPlan>

        <Gap gap={143} />
        <Button
          disabled={!isConfirmable}
          onClick={async () => {
            const res = await axios.post(api.postPlan(), {
              creationTime: getYMDHM(new Date()),
              contents: {
                ...plans,
              },
            });

            navigate("/list-plan");
          }}
          text={"인증하기"}
          backgroundColor={resultColor}
        />
      </Container>
    </Root>
  );
};

const Root = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Gap = styled.div<{ gap: number }>`
  height: ${(props) => props.gap}px;
  width: 100%;
`;

const TimeLabel = styled.div`
  width: 100%;
  background: #f0f2f4;
  font-family: "SUIT";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.01em;

  color: #636366;

  padding: 10px;

  text-align: center;
`;

const SuccessLabel = styled.div<{ color: string }>`
  width: 100%;
  font-family: "SUIT";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  /* identical to box height */

  letter-spacing: -0.02em;

  color: ${(props) => props.color};

  text-align: start;
`;

const Title = styled.pre`
  width: 100%;
  font-family: "SUIT";
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 35px;
  letter-spacing: -0.025em;

  color: #333333;
  white-space: pre;
`;

const OrderLabel = styled.div`
  width: 100%;
  font-family: "SUIT";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  /* identical to box height */

  letter-spacing: -0.01em;

  color: #333333;

  opacity: 0.6;

  margin-bottom: 10px;
`;

const TimeAndPlan = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export default WritePlanPage;
