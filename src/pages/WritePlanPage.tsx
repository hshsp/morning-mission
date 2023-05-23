import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import * as api from "./../network/api";
import "react-clock/dist/Clock.css";
import Textarea from "../components/Textarea";
import Button from "../components/Button";
import Clock from "../components/Clock";
import { Cookies, useCookies } from "react-cookie";

interface Props {}
const WritePlanPage = ({}: Props) => {
  const [value, setValue] = useState<Date>(new Date());
  // const [cookies, setCookie, removeCookie] = useCookies(["myInfo"]);

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    console.log(document.cookie);
  }, []);
  const navigate = useNavigate();
  return (
    <Root>
      <Container>
        <Clock date={value} />
        <Gap gap={155} />
        <Textarea
          placeholder="오늘의 계획을 50자 이상 입력해주세요."
          width={353}
        />

        <Gap gap={20} />
        <Button
          onClick={async () => {
            // TODO 계획 제출
            const res = await axios.post(
              api.postPlan(),
              {
                creationTime: "2023-05-18 17:00",
                contents: {
                  plan: "plan33",
                },
              },
              { withCredentials: true }
            );
            // setCookie("myInfo", res.data);

            navigate("/list-plan");
          }}
          text="지금 인증하면 성공"
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Gap = styled.div<{ gap: number }>`
  height: ${(props) => props.gap}px;
  width: 100%;
`;

export default WritePlanPage;
