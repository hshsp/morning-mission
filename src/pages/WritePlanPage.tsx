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
import { getYMDHM } from "../util/timeUtil";

interface Props {}
const WritePlanPage = ({}: Props) => {
  const [value, setValue] = useState<Date>(new Date());

  const [planString, setPlanString] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
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
          onChange={(input) => setPlanString(input)}
        />

        <Gap gap={20} />
        <Button
          disabled={planString.length < 50}
          onClick={async () => {
            const res = await axios.post(api.postPlan(), {
              creationTime: getYMDHM(new Date()),
              contents: {
                plan: planString,
              },
            });

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
