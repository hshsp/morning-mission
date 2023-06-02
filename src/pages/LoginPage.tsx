import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";

import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";

import * as api from "../network/api";
import axios from "axios";
import { PxToVw } from "../util/styleUtil";

interface Props {}
const LoginPage = ({}: Props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isError, setIsError] = useState<boolean>(false);

  return (
    <Root>
      <Container>
        <div className="title">로그인</div>
        <Gap gap={20} />
        <Input
          width={353}
          placeholder="메일주소를 입력해주세요."
          onChange={(input) => setEmail(input)}
          borderColor={isError ? "#DF1525" : undefined}
        />
        <Gap gap={10} />
        <Input
          width={353}
          isPassword={true}
          placeholder="비밀번호를 입력해주세요."
          onChange={(input) => setPassword(input)}
          borderColor={isError ? "#DF1525" : undefined}
        />
        <Gap gap={10} />
        <ErrorMessage isError={isError}>
          메일주소 또는 비밀번호를 다시 확인해주세요.
        </ErrorMessage>
        <Gap gap={28} />
        <Button
          onClick={async () => {
            try {
              const res = await axios.post(api.login(), {
                email: email,
                password: password,
              });

              console.log(res);

              navigate("/write-plan");
            } catch (e) {
              setIsError(true);
            }
          }}
          text="로그인"
          disabled={!email || !password}
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
  width: ${PxToVw(353)};

  .title {
    font-family: "SUIT";
    font-style: normal;
    font-weight: 400;
    font-size: ${PxToVw(28)};
    line-height: ${PxToVw(35)};
    /* identical to box height */

    letter-spacing: -0.01em;

    color: #333333;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
`;

const Gap = styled.div<{ gap: number }>`
  height: ${(props) => PxToVw(props.gap)};
  width: 100%;
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

export default LoginPage;
