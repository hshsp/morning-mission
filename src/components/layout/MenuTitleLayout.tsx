import React, { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { ReactComponent as ButtonBack } from "../../svg/ButtonBack.svg";
import { PxToVw } from "../../util/styleUtil";

interface Props {
  title: string;
}

const MenuTitleLayout: React.FC<PropsWithChildren<Props>> = (
  props: PropsWithChildren<Props>
) => {
  const navigate = useNavigate();
  return (
    <Root>
      <Gap gap={40} />
      <Title>
        <ButtonBack onClick={() => navigate(-1)} />
        <span>{props.title}</span>
      </Title>
      {props.children}
    </Root>
  );
};

const Root = styled.div`
  width: 100%;
`;

const Gap = styled.div<{ gap: number }>`
  height: ${(props) => PxToVw(props.gap)};
  width: 100%;
`;

const Title = styled.div`
  position: relative;
  text-align: center;
  height: ${PxToVw(32)};

  svg {
    position: absolute;
    left: ${PxToVw(20)};
    top: ${PxToVw(2)}; // TODO 아이콘과 제목이 가운데 정렬 되어야 하는데......
    height: ${PxToVw(32)};
    width: ${PxToVw(32)};

    cursor: pointer;
  }

  span {
    line-height: ${PxToVw(32)};

    font-family: "SUIT";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    /* line-height: 20px; */
    /* identical to box height */

    text-align: center;
    letter-spacing: -0.025em;

    color: #333333;
  }
`;

export default MenuTitleLayout;
