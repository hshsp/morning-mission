import React from "react";
import styled, { css } from "styled-components";
import MenuTitleLayout from "../components/layout/MenuTitleLayout";
import { MOBILE_DEFAULT_HEIGHT, MOBILE_DEFAULT_WIDTH } from "../data/constants";
import { PxToVw } from "../util/styleUtil";
import { ReactComponent as ArrowRight } from "../svg/ArrowRight.svg";
import { MoreMenu } from "../types/types";
import { useNavigate } from "react-router-dom";

interface Props {}

const MoreMenuPage: React.FC<Props> = (props: Props) => {
  const menus: MoreMenu[] = [
    { title: "비밀번호 변경하기", goToPath: "/change-password" },
    { title: "FAQ", goToPath: "/faq" },
    { title: "Creator", goToPath: "/creator" },
  ];
  const navigate = useNavigate();

  return (
    <Root>
      <Container>
        <MenuTitleLayout title="더보기" />
        <Gap gap={40} />
        {menus.map((menu) => (
          <Menu onClick={() => navigate(menu.goToPath)}>
            <div className="title">{menu.title}</div>
            <ArrowRight />
          </Menu>
        ))}
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
  width: 100%;
  height: 100%;
  max-height: ${PxToVw(MOBILE_DEFAULT_HEIGHT)};
  max-width: ${PxToVw(MOBILE_DEFAULT_WIDTH)};
`;

const Gap = styled.div<{ gap: number }>`
  height: ${(props) => PxToVw(props.gap)};
  width: 100%;
`;

const Menu = styled.div`
  padding: ${PxToVw(20)} ${PxToVw(32)};
  display: flex;
  flex-direction: row;
  align-items: center;

  background: #ffffff;
  border-bottom: 1px solid rgba(242, 242, 242, 0.8);

  cursor: pointer;

  .title {
    flex: 1;

    font-family: "SUIT";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    /* identical to box height */

    letter-spacing: -0.025em;

    color: #333333;
  }

  svg {
    width: ${PxToVw(16)};
    height: ${PxToVw(16)};
  }
`;

export default MoreMenuPage;
