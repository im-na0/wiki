import React from "react";
import { styled } from "styled-components";
import { ActiveDot, Dot, SlideCounter } from "../Pagination";
import { useNavigation } from "../Navigation";
import { EndSubTitle, EndTitle } from "../Title";
import { motion } from "framer-motion";
const Container = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 80px;
`;
const EndContainer = styled.div`
  width: 50%;
  margin: 100px auto;
  text-align: center;
`;
const EndBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  gap: 20px;
`;
const EndBtn = styled.button`
  width: 200px;
  height: 50px;
  border-radius: 10px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: #fff;
    background-color: #000;
  }
`;
export default function EndRegister() {
  const { moveMain, moveMyTeam } = useNavigation();
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <EndContainer>
          <EndTitle>
            이제 Wiki를 통해
            <br />
            일의 능률을 향상시켜보세요!
          </EndTitle>
          <EndSubTitle>아래 버튼을 누르시면 이동됩니다!</EndSubTitle>
          <EndBtnContainer>
            <EndBtn onClick={moveMain}>Home</EndBtn>
            <EndBtn onClick={moveMyTeam}>My Team</EndBtn>
          </EndBtnContainer>
        </EndContainer>
        <SlideCounter>
          <Dot />
          <Dot />
          <ActiveDot />
        </SlideCounter>
      </Container>
    </motion.div>
  );
}
