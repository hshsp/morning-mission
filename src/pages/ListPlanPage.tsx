import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import * as api from "./../network/api";
import { getAmPm, getHM, getYMDDate } from "../util/timeUtil";
import Card from "../components/Card";
import { PlanContainer, UserPlan } from "../types/types";
import { PxToVw } from "../util/styleUtil";
import Modal from "react-modal";
import EditPlanModal from "../modals/EditPlanModal";
import DeleteMyPlanModal from "../modals/DeleteMyPlanModal";
import MyHistoryModal from "../modals/MyHistoryModal";
import { MOBILE_DEFAULT_HEIGHT, MOBILE_DEFAULT_WIDTH } from "../data/constants";
import Button from "../components/Button";

const ListPlanPage = () => {
  const [value, setValue] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const [planList, setPlanList] = useState<UserPlan[]>();
  const [myPlan, setMyPlan] = useState<PlanContainer>();

  const [resultText, setResultText] = useState<string>("");
  const [resultColor, setResultColor] = useState<string>("");

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean>(false);

  const onClickDelete = async () => {
    try {
      const res = await axios.delete(api.deleteMyPlan(myPlan?.id || 0));

      setIsDeleteModalOpen(false);
      init();
    } catch (e) {
      console.log(e);
    }
  };

  const updateResult = () => {
    if (myPlan) {
      switch (myPlan.isSuccess) {
        case 1:
          setResultText("오늘 인증 성공");
          setResultColor("#2F80ED");
          return;
        case 2:
          setResultText("오늘 인증 반절 성공");
          setResultColor("#39CA76");
          return;
        case 3:
          setResultText("오늘 인증 실패");
          setResultColor("#DF1525");
          return;
      }
    }

    const date = new Date();

    const hour = date.getHours();
    const min = date.getMinutes();

    if (hour === 7 || hour === 8 || (hour === 9 && min === 0)) {
      setResultText("지금 인증하면 성공");
      setResultColor("#2F80ED");
      return;
    }

    if (
      hour === 9 ||
      hour === 10 ||
      hour === 11 ||
      (hour === 12 && min === 0)
    ) {
      setResultText("지금 인증하면 반절 성공");
      setResultColor("#39CA76");
      return;
    }

    setResultText("지금 인증하면 실패");
    setResultColor("#DF1525");
  };

  const init = async () => {
    const resAllPlanOthers = (await axios.get(api.getAllPlanOthers())).data;

    console.log(resAllPlanOthers);

    const defaultPlanList = resAllPlanOthers.map((item: any) => ({
      ...item,
      plan: item.plan.map((planItem: any) => {
        const obj = planItem.contents;
        const arr = [];
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (obj[key].plan.time) {
              arr.push(obj[key].plan);
            }
          }
        }
        return {
          ...planItem,
          contents: arr,
        };
      }),
    }));
    console.log(defaultPlanList);
    setPlanList(defaultPlanList);

    const resMyPlan = (await axios.get(api.getMyPlan())).data;

    console.log(resMyPlan);

    if (resMyPlan) {
      const obj = { ...resMyPlan.contents };
      const arr = [];
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          arr.push(obj[key].plan);
        }
      }
      const defaultMyPlan = {
        ...resMyPlan,
        contents: arr,
      };
      console.log(defaultMyPlan);
      setMyPlan(defaultMyPlan);
    } else {
      setMyPlan(undefined);
    }
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    updateResult();
  }, [myPlan]);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: 0,
      border: "none",
    },
    overlay: {
      background: "rgba(0,0,0,0.5)",
    },
  };

  return (
    <Root>
      <StickyContainer>
        <Container
          style={{
            overflow:
              isEditModalOpen || isDeleteModalOpen ? "hidden" : "scroll",
          }}
        >
          <Gap gap={40} />
          <DateLabel>{getYMDDate(value)}</DateLabel>
          <Gap gap={50} />

          <RowSpaceBetween>
            <ResultChip backgroundColor={resultColor}>{resultText}</ResultChip>

            {myPlan && (
              <EditDeleteButtons>
                <EditDeleteButton onClick={() => setIsDeleteModalOpen(true)}>
                  삭제하기
                </EditDeleteButton>
                <ColumnDivider height={12} />
                <EditDeleteButton
                  onClick={() => {
                    setIsEditModalOpen(true);
                  }}
                >
                  수정하기
                </EditDeleteButton>
              </EditDeleteButtons>
            )}
          </RowSpaceBetween>

          <Gap gap={20} />

          {myPlan &&
            myPlan.contents &&
            myPlan.contents.length > 0 &&
            myPlan.contents.map((item) => (
              <PlanBlock>
                <PlanTime>{item.time}</PlanTime>
                <PlanString>{item.contentsString}</PlanString>
              </PlanBlock>
            ))}
          <Gap gap={20} />

          <RowDivider />
          <Gap gap={10} />

          <RowSpaceBetween>
            {myPlan && myPlan.creationTime ? (
              <PlanWrittenTime>
                작성시간{" "}
                {`${getHM(new Date(myPlan.creationTime))}${getAmPm(
                  new Date(myPlan.creationTime)
                )}`}
              </PlanWrittenTime>
            ) : (
              <div />
            )}
            <MyHistoryButton
              onClick={() => setIsHistoryModalOpen(true)}
            >{`내 기록 보기 >`}</MyHistoryButton>
          </RowSpaceBetween>

          <Gap gap={30} />
          <List>
            {planList?.map((item) => (
              <Card data={item} width={353}></Card>
            ))}
          </List>

          {!myPlan && (
            <>
              <Gap gap={52 + 63} />

              <ButtonContainer>
                <Button
                  // onClick={onClickButton}
                  text={"인증하기"}
                  backgroundColor={resultColor}
                  width={353}
                />
              </ButtonContainer>
            </>
          )}
        </Container>

        {isEditModalOpen && (
          <EditPlanModal
            defaultPlans={myPlan?.contents}
            resultColor={resultColor}
            resultText={resultText}
            onClickClose={() => setIsEditModalOpen(false)}
            onRefresh={() => {
              init();
            }}
          />
        )}

        {isDeleteModalOpen && (
          <DeleteMyPlanModal
            title="삭제"
            contents={[
              "인증 기록을 삭제할까요?",
              "작성한 내용은 복구되지 않고 기록이 사라집니다.",
            ]}
            positiveText="삭제"
            onClickPositive={() => {
              onClickDelete();
            }}
            negativeText="취소"
            onClickNegative={() => setIsDeleteModalOpen(false)}
          />
        )}
      </StickyContainer>

      <Modal
        isOpen={isHistoryModalOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <MyHistoryModal onClickClose={() => setIsHistoryModalOpen(false)} />
      </Modal>
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

const StickyContainer = styled.div`
  width: ${PxToVw(MOBILE_DEFAULT_WIDTH)};
  height: ${PxToVw(MOBILE_DEFAULT_HEIGHT)};
  min-height: ${PxToVw(MOBILE_DEFAULT_HEIGHT)};
  max-height: ${PxToVw(MOBILE_DEFAULT_HEIGHT)};

  position: relative;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
  height: 100%;

  overflow: scroll;

  padding: 0 ${PxToVw(20)};
  box-sizing: border-box;

  position: relative;
`;

const Gap = styled.div<{ gap: number }>`
  min-height: ${(props) => props.gap}px;
  width: 100%;
`;

const DateLabel = styled.div`
  font-family: "SUIT";
  font-style: normal;
  font-weight: 400;
  font-size: ${PxToVw(28)};
  line-height: ${PxToVw(35)};
  /* identical to box height */

  letter-spacing: -0.01em;

  color: #333333;

  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const RowSpaceBetween = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ResultChip = styled.div<{ backgroundColor?: string }>`
  padding: ${PxToVw(8)} ${PxToVw(16)};
  border-radius: ${PxToVw(10)};
  background: ${(props) => props.backgroundColor || "#2F80ED"};

  font-family: "SUIT";
  font-style: normal;
  font-weight: 600;
  font-size: ${PxToVw(14)};
  line-height: ${PxToVw(17)};
  letter-spacing: -0.02em;

  color: #ffffff;
`;

const EditDeleteButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${PxToVw(12)};
`;

const EditDeleteButton = styled.button`
  font-family: "SUIT";
  font-style: normal;
  font-weight: 600;
  font-size: ${PxToVw(14)};
  line-height: ${PxToVw(17)};
  text-align: center;
  letter-spacing: -0.025em;

  color: #333333;

  opacity: 0.6;

  border: ${PxToVw(1)} solid transparent;
  background: none;
  padding: 0;

  cursor: pointer;
`;

const ColumnDivider = styled.div<{ height: number }>`
  width: ${PxToVw(1)};
  height: ${(props) => PxToVw(props.height)};
  background: #333333;
  opacity: 0.1;
  border-radius: ${PxToVw(100)};
`;

const RowDivider = styled.div<{ width?: number }>`
  min-height: 1px;
  width: ${(props) => (props.width ? `${PxToVw(props.width)}px` : "100%")};
  background: #333333;
  opacity: 0.1;
`;

const PlanBlock = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${PxToVw(20)};
  width: 100%;

  font-family: "SUIT";
  font-style: normal;
  font-weight: 400;
  font-size: ${PxToVw(20)};
  line-height: 140%;
  /* identical to box height, or 28px */

  letter-spacing: -0.025em;

  color: #333333;

  white-space: pre-wrap;
  word-break: break-word;
`;

const PlanTime = styled.div`
  width: ${PxToVw(60)};
`;

const PlanString = styled.div`
  flex: 1;
`;

const PlanWrittenTime = styled.div`
  font-family: "SUIT";
  font-style: normal;
  font-weight: 400;
  font-size: ${PxToVw(14)};
  line-height: 130%;
  /* or ${PxToVw(18)} */

  letter-spacing: -0.025em;

  color: #333333;

  opacity: 0.3;
`;

const MyHistoryButton = styled.button`
  border: ${PxToVw(1)} solid transparent;
  background: none;
  padding: 0;

  font-family: "SUIT";
  font-style: normal;
  font-weight: 600;
  font-size: ${PxToVw(14)};
  line-height: 130%;
  /* or ${PxToVw(18)} */

  text-align: right;
  letter-spacing: -0.025em;

  color: #2f80ed;

  cursor: pointer;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: ${PxToVw(10)};
`;

const ButtonContainer = styled.div`
  position: sticky;
  bottom: ${PxToVw(63)};
`;

const ModalContainer = styled.div`
  position: sticky;
  bottom: 0;
`;

export default ListPlanPage;
