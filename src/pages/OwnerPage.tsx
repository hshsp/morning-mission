import React from "react";
import styled, { css } from "styled-components";
import MenuTitleLayout from "../layout/MenuTitleLayout";
import { MOBILE_DEFAULT_HEIGHT, MOBILE_DEFAULT_WIDTH } from "../data/constants";
import { PxToVw } from "../util/styleUtil";

interface Props {}

const OwnerPage: React.FC<Props> = (props: Props) => {
  return (
    <Root>
      <Container>
        <MenuTitleLayout title="Creator" />
        <Gap gap={40} />
        <Box>
          <RoleAndNameRow>
            <div className="role">Co founder</div>
            <div className="name">임재현 / 박현선 / 박소영</div>
          </RoleAndNameRow>
          <RoleAndNameRow>
            <div className="role">Design, Branding</div>
            <div className="name">박소영</div>
          </RoleAndNameRow>
          <RoleAndNameRow>
            <div className="role">PM, Front-end</div>
            <div className="name">박현선</div>
          </RoleAndNameRow>
          <RoleAndNameRow>
            <div className="role">CFO, Back-end</div>
            <div className="name">임재현</div>
          </RoleAndNameRow>
        </Box>
        <Gap gap={40} />
        <Box>
          <Row>임재현</Row>
          <Row>xhwogusxh@gmail.com</Row>
        </Box>
        <Gap gap={20} />
        <Box>
          <Row>박현선</Row>
          <Row>hyun407407407@gmail.com</Row>
        </Box>
        <Gap gap={20} />
        <Box>
          <Row>박소영</Row>
          <Row>zaribcontact@gmail.com</Row>
        </Box>
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

const Box = styled.div`
  border-width: 0 0 0 2px;
  border-style: solid;
  border-color: rgba(51, 51, 51, 0.1);

  font-family: "SUIT";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 160%;
  /* or 26px */

  letter-spacing: -0.005em;
  color: #333333;
  margin: 0 ${PxToVw(20)};
`;

const RoleAndNameRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${PxToVw(24)};

  padding: 0 ${PxToVw(10)};

  .role {
    opacity: 0.5;
    width: ${PxToVw(123)};
  }

  .name {
    flex: 1;
  }
`;

const Row = styled.div`
  padding: 0 ${PxToVw(10)};
`;

export default OwnerPage;
