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
import { MOBILE_DEFAULT_HEIGHT, MOBILE_DEFAULT_WIDTH } from "../data/constants";

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
  const [result, setResult] = useState<"success" | "half-success" | "fail">(
    "success"
  );

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
      if (resultText) return;

      switch (defaultResult.current) {
        case 1:
          setResultText("지금 인증하면 성공");
          setResult("success");
          return;
        case 2:
          setResultText("지금 인증하면 반절 성공");
          setResult("half-success");
          return;
        case 3:
          setResultText("지금 인증하면 실패");
          setResult("fail");
          return;
      }
    }

    const date = new Date();
    setCurrentDate(date);

    const hour = date.getHours();
    const min = date.getMinutes();

    if (
      hour === 5 ||
      hour === 6 ||
      hour === 7 ||
      hour === 8 ||
      (hour === 9 && min === 0)
    ) {
      setResultText("지금 인증하면 성공");
      setResult("success");
      return;
    }

    if (
      hour === 9 ||
      hour === 10 ||
      hour === 11 ||
      (hour === 12 && min === 0)
    ) {
      setResultText("지금 인증하면 반절 성공");
      setResult("half-success");
      return;
    }

    setResultText("지금 인증하면 실패");
    setResult("fail");
  };

  const initPlan = async () => {
    const res = (await axios.get(api.getMyPlan())).data;

    console.log(res);

    if (
      res &&
      Object.keys(res).length > 0 &&
      process.env.REACT_APP_ENV !== undefined
    ) {
      navigate("/list-plan");
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

        <SuccessLabel result={result}>{resultText}</SuccessLabel>
        <Gap gap={12} />
        <Title>{`오늘의 가장 중요한 일\n3개를 작성해주세요`}</Title>

        <ReactSortable list={plans} setList={setPlans} handle=".handle">
          {plans.map((plan, index) => (
            <TimeAndPlan key={plan.id}>
              <Input
                width={102}
                maxLength={5}
                placeholder="언제"
                onChange={(input) => {
                  updatePlans(index, {
                    ...plans[index].plan,
                    time: input,
                  });
                }}
                value={plan.plan.time}
              />
              <ColumnGap flex={2} />
              <Input
                width={213}
                maxLength={13}
                placeholder="ㅇㅇ하기(13자 이내)"
                onChange={(input) => {
                  updatePlans(index, {
                    ...plans[index].plan,
                    contentsString: input,
                  });
                }}
                value={plan.plan.contentsString}
              />
              <ColumnGap flex={1} />
              <DragButton className={`handle`} />
            </TimeAndPlan>
          ))}
        </ReactSortable>

        <Gap gap={143} />
        <ButtonContainer>
          <Button
            size="large"
            colorType={result}
            disabled={!isConfirmable}
            onClick={onClickButton}
            text={"인증하기"}
          />
        </ButtonContainer>
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
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: ${PxToVw(MOBILE_DEFAULT_WIDTH)};
  max-height: ${PxToVw(MOBILE_DEFAULT_HEIGHT)};
  box-sizing: border-box;
`;

const Gap = styled.div<{ gap: number }>`
  height: ${(props) => PxToVw(props.gap)};
  width: 100%;
`;

const ColumnGap = styled.div<{ flex: number }>`
  flex: ${(props) => props.flex};
  height: 100%;
`;

const TimeLabel = styled.div`
  width: 100%;
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

const SuccessLabel = styled.div<{
  result: "success" | "half-success" | "fail";
}>`
  width: 100%;
  font-family: "SUIT";
  font-style: normal;
  font-weight: 600;
  font-size: ${PxToVw(16)};
  line-height: ${PxToVw(20)};
  /* identical to box height */

  letter-spacing: -0.02em;

  color: ${(props) => {
    switch (props.result) {
      case "success":
        return "#2F80ED";
      case "half-success":
        return "#39CA76";
      case "fail":
        return "#DF1525";
    }
  }};

  text-align: start;

  padding: 0 ${PxToVw(20)};
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

  padding: 0 ${PxToVw(20)};
`;

const TimeAndPlan = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${PxToVw(10)} ${PxToVw(20)};

  svg {
    cursor: pointer;

    &:hover {
      background: #f2f4f6;

      border-radius: ${PxToVw(10)};
    }
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export default WritePlanPage;
