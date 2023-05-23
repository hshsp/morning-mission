import React from "react";
import styled, { css } from "styled-components";

import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";

import * as api from "../network/api";
import axios from "axios";
import { Cookies, useCookies } from "react-cookie";

interface Props {}
const LoginPage = ({}: Props) => {
  const navigate = useNavigate();
  return (
    <Root>
      <Container>
        <div className="title">로그인</div>
        <Gap gap={20} />
        <Input width={353} placeholder="메일주소를 입력해주세요." />
        <Gap gap={10} />
        <Input width={353} placeholder="비밀번호를 입력해주세요." />
        <Gap gap={90} />
        <Button
          onClick={async () => {
            const res = await axios.post(
              api.login(),
              {
                email: "hyun407407407@gmail.com",
                password: "1234",
              },
              {
                withCredentials: true,
              }
            );

            // console.log(res);
            // const cookies = new Cookies();
            // cookies.set("user", res.data.user, {
            //   path: "/",
            // });
            navigate("/write-plan");
          }}
          text="로그인"
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
  width: 393px;

  .title {
    font-family: "SUIT";
    font-style: normal;
    font-weight: 400;
    font-size: 28px;
    line-height: 35px;
    /* identical to box height */

    letter-spacing: -0.01em;

    color: #333333;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
`;

const Gap = styled.div<{ gap: number }>`
  height: ${(props) => props.gap}px;
  width: 100%;
`;

export default LoginPage;
