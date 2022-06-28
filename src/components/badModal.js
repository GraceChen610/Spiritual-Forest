/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  bottom:-450px;
    left:-990px;
  z-index:3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  background: linear-gradient(130deg, #D7FFFE, #ace0f9, #ebc0fd);
  ${'' /* display: grid;
  grid-template-columns: 8fr 1fr; */}
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

// const ModalImg = styled.img`
//   width: 100%;
//   height: 100%;
//   border-radius: 10px 0 0 10px;
//   background: #000;
// `;

const ModalContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  line-height: 1;
  color: #141414;
  opacity: 0.8;
  width:70%;

  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
    align-self:flex-end;
    ${'' /* margin-right:15%; */}
    border-radius: 10px;
  }

  ${'' /* input {
    margin-bottom: 1rem;
    padding: 0.5rem;
    width:100%;
    height:30px;
    border-radius: 10px;
    font-size:1.3rem;
  } */}

 
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

export default function BadModal({
  showBadModal, setShowBadModal,
}) {
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showBadModal ? 1 : 0,
    transform: showBadModal ? 'translateY(0%)' : 'translateY(-100%)',
  });

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowBadModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === 'Escape' && showBadModal) {
        setShowBadModal(false);
        console.log('I pressed');
      }
    },
    [setShowBadModal, showBadModal],
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress],
  );

  return (
    <div>
      {showBadModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showBadModal}>
              {/* <ModalImg src={require('./modal.jpg')} alt="camera" /> */}
              <ModalContent>
                <Link to="/quiz">
                  <button
                    type="button"
                    onClick={() => {
                      setShowBadModal((prev) => !prev);
                    }}
                  >
                    心情檢測
                  </button>
                </Link>
                <Link to="/card">
                  <button
                    type="button"
                    onClick={() => {
                      setShowBadModal((prev) => !prev);
                    }}
                  >
                    抽卡活動
                  </button>
                </Link>
              </ModalContent>
              <CloseModalButton
                aria-label="Close modal"
                onClick={() => setShowBadModal((prev) => !prev)}
              />
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </div>
  );
}
