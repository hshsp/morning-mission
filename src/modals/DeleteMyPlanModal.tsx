import React from "react";
import styled, { css } from "styled-components";
import { PxToVw } from "../util/styleUtil";

interface Props {
  title?: string;
  contents?: string[];
  positiveText?: string;
  onClickPositive?: () => void;
  negativeText?: string;
  onClickNegative?: () => void;
}
const DeleteMyPlanModal = (props: Props) => {
  return (
    <Container>
      <ContentsContainer>
        <Gap gap={16} />
        <Title>{props.title || "제목"}</Title>
        <Gap gap={16} />
        <Contents>
          {props.contents?.map((item) => (
            <span>{item}</span>
          ))}
        </Contents>
        <Gap gap={16} />
        <Buttons>
          <Button
            onClick={() => props.onClickPositive && props.onClickPositive()}
            style={{
              color: "#D93441",
            }}
          >
            {props.positiveText}
          </Button>
          <Button
            onClick={() => props.onClickNegative && props.onClickNegative()}
            style={{
              color: "#333333",
            }}
          >
            {props.negativeText}
          </Button>
        </Buttons>
      </ContentsContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;

  bottom: 0;

  background: rgba(0, 0, 0, 0.5);
`;

const ContentsContainer = styled.div`
  position: absolute;

  width: ${PxToVw(312)};
  min-height: ${PxToVw(172)};

  padding: ${PxToVw(24)} ${PxToVw(24)} ${PxToVw(16)} ${PxToVw(24)};

  background: #fafafa;

  border-radius: ${PxToVw(10)};
  box-sizing: border-box;

  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  border: none;
`;

const Title = styled.div`
  font-family: "SUIT";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  letter-spacing: -0.025em;

  color: #333333;
`;

const Contents = styled.div`
  font-family: "SUIT";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  /* or 143% */

  letter-spacing: -0.025em;

  color: #7b7b7b;

  display: flex;
  flex-direction: column;
`;
const Gap = styled.div<{ gap: number }>`
  min-height: ${(props) => PxToVw(props.gap)};
  width: 100%;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: ${PxToVw(8)};
`;
const Button = styled.button`
  font-family: "SUIT";
  font-style: normal;
  font-weight: 500;
  font-size: ${PxToVw(14)};
  line-height: ${PxToVw(20)};
  /* identical to box height, or 143% */

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.025em;

  padding: ${PxToVw(10)} ${PxToVw(12)};

  background: none;
  border: none;

  cursor: pointer;
`;

export default DeleteMyPlanModal;
