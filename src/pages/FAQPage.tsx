import React from "react";
import styled, { css } from "styled-components";
import Button from "../components/Button";
import MenuTitleLayout from "../layout/MenuTitleLayout";
import { MOBILE_DEFAULT_HEIGHT, MOBILE_DEFAULT_WIDTH } from "../data/constants";
import { PxToVw } from "../util/styleUtil";

interface Props {}

const FAQPage: React.FC<Props> = (props: Props) => {
  return (
    <Root>
      <Container>
        <MenuTitleLayout title="FAQ" />
        <Gap gap={250} />

        <ButtonContainer>
          <Button
            size="large"
            colorType="success"
            text="FAQ로 이동하기"
            onClick={() => {
              const link = `https://joey.team/block?block_id=VdVvtB0F3eNbkKqCoxGT&id=9cU5pLkasKPZCLb5piwAqg3C9OF2`;
              window.open(link);
            }}
            disabled={false}
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
  width: 100%;
  height: 100%;
  max-height: ${PxToVw(MOBILE_DEFAULT_HEIGHT)};
  max-width: ${PxToVw(MOBILE_DEFAULT_WIDTH)};
`;

const Gap = styled.div<{ gap: number }>`
  height: ${(props) => PxToVw(props.gap)};
  width: 100%;
`;

const ButtonContainer = styled.div`
  width: 100%;

  padding: 0 ${PxToVw(20)};
  box-sizing: border-box;
`;

export default FAQPage;
