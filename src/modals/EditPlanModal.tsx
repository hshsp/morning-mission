import React, { useState } from "react";
import styled, { css } from "styled-components";
import { PxToVw } from "../util/styleUtil";
import { ReactSortable } from "react-sortablejs";

import { ReactComponent as Close } from "../svg/Close.svg";
import { ReactComponent as DragButton } from "../svg/DragButton.svg";
import Input from "../components/Input";
import Button from "../components/Button";
import { getISOStringUtc } from "../util/timeUtil";
import axios from "axios";
import * as api from "./../network/api";
import { Plan } from "../types/types";

interface Props {
  defaultPlans?: Plan[];
  resultText?: string;
  resultColor?: string;
  onClickClose?: () => void;
  onRefresh?: () => void;
}
const EditPlanModal = (props: Props) => {
  const [plans, setPlans] = useState<{ id: number | string; plan: Plan }[]>(
    props.defaultPlans
      ? props.defaultPlans.map((item, index) => ({
          id: `${index}-plan`,
          plan: {
            time: item.time,
            contentsString: item.contentsString,
          },
        }))
      : []
  );
  const [isConfirmable, setIsConfirmable] = useState<boolean>(true);

  const onClickButton = async () => {
    try {
      const patchRes = await axios.patch(api.patchMyPlan(), {
        creationTime: getISOStringUtc(new Date()),
        contents: {
          ...plans,
        },
      });

      props.onRefresh && props.onRefresh();
      props.onClickClose && props.onClickClose();
    } catch (e) {
      console.log(e);
    }
  };

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
    <Container>
      <Top>
        <span className="title">수정하기</span>
        <Close
          className="close"
          onClick={() => props.onClickClose && props.onClickClose()}
        />
      </Top>
      <Gap gap={66} />

      <SuccessLabel color={props.resultColor || ""}>
        {props.resultText}
      </SuccessLabel>
      <Gap gap={12} />
      <Title>{`오늘의 가장 중요한 일\n3개를 작성해주세요`}</Title>

      <ReactSortable list={plans} setList={setPlans} handle=".handle-edit">
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
              className="handle-edit"
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
        backgroundColor={props.resultColor}
      />
    </Container>
  );
};

const Container = styled.div`
  min-height: min(${PxToVw(774)}, 600px);
  width: ${PxToVw(393)};
  background: rgba(250, 250, 250, 0.93);
  backdrop-filter: blur(40px);

  border-radius: ${PxToVw(13)} ${PxToVw(13)} ${PxToVw(0)} ${PxToVw(0)};
  padding: ${PxToVw(20)};
  box-sizing: border-box;
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

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

const ColumnGap = styled.div<{ gap: number }>`
  width: ${(props) => PxToVw(props.gap)};
  height: 100%;
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

export default EditPlanModal;
