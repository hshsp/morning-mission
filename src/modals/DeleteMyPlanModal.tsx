import React from "react";
import styled, { css } from "styled-components";

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
      <Gap gap={16} />
      <Title>{props.title || "제목"}</Title>
      <Gap gap={4} />
      <Contents>
        {props.contents?.map((item) => (
          <span>{item}</span>
        ))}
      </Contents>
      <Gap gap={16} />
      <RowDivider />
      <Buttons>
        <Button
          onClick={() => props.onClickPositive && props.onClickPositive()}
        >
          {props.positiveText}
        </Button>
        <Button
          onClick={() => props.onClickNegative && props.onClickNegative()}
        >
          {props.negativeText}
        </Button>
      </Buttons>
    </Container>
  );
};

const Container = styled.div`
  width: 270px;
  min-height: 137px;
  background: rgba(242, 242, 242, 0.8);
  backdrop-filter: blur(11px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 14px;
`;

const Title = styled.div`
  font-family: "SUIT";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  /* identical to box height, or 138% */

  text-align: center;
  letter-spacing: -0.025em;

  color: #333333;
`;

const Contents = styled.div`
  font-family: "SUIT";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  /* or 129% */

  text-align: center;
  letter-spacing: -0.025em;

  color: #333333;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Gap = styled.div<{ gap: number }>`
  min-height: ${(props) => props.gap}px;
  width: 100%;
`;

const RowDivider = styled.div`
  min-height: 1px;
  width: 100%;
  background: rgba(60, 60, 67, 0.36);
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;

  button:not(:last-child) {
    border-right: 1px solid rgba(60, 60, 67, 0.36);
  }
`;
const Button = styled.button`
  flex: 1;
  font-family: "SUIT";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  /* identical to box height, or 138% */

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  letter-spacing: -0.025em;
  color: #2f80ed;

  padding: 10px;

  background: none;
  border: none;

  cursor: pointer;
`;

export default DeleteMyPlanModal;
