import React, { useEffect, useRef, useState } from "react";
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
  getISOStringUtc,
  getMonth,
  getSecond,
  getYMDHM,
} from "../util/timeUtil";
import Input from "../components/Input";
import { Plan } from "../types/types";
import { ReactSortable } from "react-sortablejs";

import { ReactComponent as DragButton } from "../svg/DragButton.svg";
import { PxToVw } from "../util/styleUtil";

const WritePlanPage = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const [plans, setPlans] = useState<{ id: number | string; plan: Plan }[]>(
    [...new Array(3)].map((_, index) => ({
      id: `${index}-plan`,
      plan: {
        time: "",
        contentsString: "",
      },
    }))
  );

  const [resultText, setResultText] = useState<string>("");
  const [resultColor, setResultColor] = useState<string>("");

  const defaultResult = useRef<number>();

  const [isConfirmable, setIsConfirmable] = useState<boolean>(false);

  const onClickButton = async () => {
    if (defaultResult.current) {
      const patchRes = await axios.patch(api.patchMyPlan(), {
        creationTime: getISOStringUtc(new Date()),
        contents: {
          ...plans,
        },
      });
    } else {
      const res = await axios.post(api.postPlan(), {
        creationTime: getISOStringUtc(new Date()),
        contents: {
          ...plans,
        },
      });
    }

    navigate("/list-plan");
  };

  const updateResult = () => {
    if (defaultResult.current && defaultResult.current > 0) {
      if (resultColor && resultText) return;

      switch (defaultResult.current) {
        case 1:
          setResultText("지금 인증하면 성공");
          setResultColor("#2F80ED");
          return;
        case 2:
          setResultText("지금 인증하면 반절 성공");
          setResultColor("#39CA76");
          return;
        case 3:
          setResultText("지금 인증하면 실패");
          setResultColor("#DF1525");
          return;
      }
    }

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

  const initPlan = async () => {
    const res = (await axios.get(api.getMyPlan())).data;

    if (res) {
      const defaultPlans = [];
      const obj = res.contents;
      for (let key in obj) {
        defaultPlans.push({
          id: `${key}`,
          plan: obj[key].plan,
        });
      }
      setPlans(defaultPlans);
      defaultResult.current = res.isSuccess;

      setIsConfirmable(
        defaultPlans.filter(
          (item) => !item.plan.time || !item.plan.contentsString
        ).length === 0
      );
    }
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
    newPlans[index].plan = { ...newPlan };

    setPlans(newPlans);

    setIsConfirmable(
      newPlans.filter((item) => !item.plan.time || !item.plan.contentsString)
        .length === 0
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

        <ReactSortable list={plans} setList={setPlans} handle=".handle">
          {plans.map((plan, index) => (
            <TimeAndPlan key={plan.id}>
              <Input
                width={74}
                placeholder="언제"
                onChange={(input) => {
                  updatePlans(index, {
                    ...plans[index].plan,
                    time: input,
                  });
                }}
                value={plan.plan.time}
              />
              <ColumnGap gap={10} />
              <Input
                width={240}
                maxLength={20}
                placeholder="ㅇㅇ하기(20자 이내)"
                onChange={(input) => {
                  updatePlans(index, {
                    ...plans[index].plan,
                    contentsString: input,
                  });
                }}
                value={plan.plan.contentsString}
              />
              <ColumnGap gap={5} />
              <DragButton
                className="handle"
                style={{
                  cursor: "pointer",
                }}
              />
            </TimeAndPlan>
          ))}
        </ReactSortable>

        <Gap gap={143} />
        <Button
          disabled={!isConfirmable}
          onClick={onClickButton}
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
  width: ${PxToVw(393)};
  padding: ${PxToVw(20)};
  box-sizing: border-box;
`;

const Gap = styled.div<{ gap: number }>`
  height: ${(props) => PxToVw(props.gap)};
  width: 100%;
`;

const ColumnGap = styled.div<{ gap: number }>`
  width: ${(props) => PxToVw(props.gap)};
  height: 100%;
`;

const TimeLabel = styled.div`
  width: calc(100% + ${PxToVw(40)});
  background: #f0f2f4;
  font-family: "SUIT";
  font-style: normal;
  font-weight: 400;
  font-size: ${PxToVw(14)};
  line-height: ${PxToVw(17)};
  letter-spacing: -0.01em;

  color: #636366;

  padding: ${PxToVw(10)} 0;

  text-align: center;
`;

const SuccessLabel = styled.div<{ color: string }>`
  width: 100%;
  font-family: "SUIT";
  font-style: normal;
  font-weight: 600;
  font-size: ${PxToVw(16)};
  line-height: ${PxToVw(20)};
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
  font-size: ${PxToVw(28)};
  line-height: ${PxToVw(35)};
  letter-spacing: -0.025em;

  color: #333333;
  white-space: pre;
`;

const TimeAndPlan = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${PxToVw(10)};
`;

export default WritePlanPage;
