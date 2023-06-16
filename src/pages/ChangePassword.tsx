import React, { useState } from "react";
import styled, { css } from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import MenuTitleLayout from "../components/layout/MenuTitleLayout";
import { MOBILE_DEFAULT_HEIGHT, MOBILE_DEFAULT_WIDTH } from "../data/constants";
import { PxToVw } from "../util/styleUtil";

interface Props {}

const ChangePassword: React.FC<Props> = (props: Props) => {
  const [originalPassword, setOriginalPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const [isError, setIsError] = useState<boolean>(false);

  return (
    <Root>
      <Container>
        <MenuTitleLayout title="비밀번호 변경하기" />
        <Gap gap={40} />
        <Block>
          <div className="label">현재 비밀번호</div>
          <Gap gap={10} />
          <Input
            width={353}
            placeholder="현재 비밀번호를 입력해주세요."
            onChange={(input) => setOriginalPassword(input)}
            isPassword={true}
            borderColor={isError ? "#df1525" : ""}
          />
          {isError && (
            <ErrorMessage isError={isError}>
              <Gap gap={10} />
              <div>다시 확인해 주세요.</div>
            </ErrorMessage>
          )}
        </Block>
        <Gap gap={20} />
        <Block>
          <div className="label">새 비밀번호</div>
          <Gap gap={10} />
          <Input
            width={353}
            placeholder="변경할 비밀번호를 입력해주세요."
            onChange={(input) => setNewPassword(input)}
            isPassword={true}
          />
        </Block>
        <Gap gap={40} />
        <ButtonContainer>
          <Button
            width={353}
            text="비밀번호 변경하기"
            backgroundColor="#2F80ED"
            disabled={!originalPassword || !newPassword}
            onClick={() => {
              // TODO api 호출
              setIsError(true);
            }}
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
`;

const Gap = styled.div<{ gap: number }>`
  height: ${(props) => PxToVw(props.gap)};
  width: 100%;
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 ${PxToVw(20)};

  .label {
    font-family: "SUIT";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.025em;

    color: #333333;

    opacity: 0.6;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  padding: 0 ${PxToVw(20)};
`;

const ErrorMessage = styled.div<{ isError?: boolean }>`
  font-family: "SUIT";
  font-style: normal;
  font-weight: 400;
  font-size: ${PxToVw(14)};
  line-height: ${PxToVw(22)};
  /* identical to box height, or 157% */

  letter-spacing: -0.01em;

  color: #df1525;

  visibility: ${(props) => (props.isError ? "visible" : "hidden")};
`;

export default ChangePassword;
