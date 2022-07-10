/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */

import React, {
  useRef, useEffect, useCallback, useState,
} from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import styled, { keyframes } from 'styled-components/macro';
import { MdClose } from 'react-icons/md';
import MapModal from './BaseModal';
import MapApp from '../pages/mapApp';

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0%;
  left: 0%;
  z-index:3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  background: linear-gradient(130deg, #D7FFFE, #ace0f9, #ebc0fd);
  position: relative;
  z-index: 10;
  border-radius: 20px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 2rem 3rem;
  background-color: hsl(280deg, 40%, calc(100% - var(--abs-offset) * 50%));
  border-radius: 1rem;
  color: $color-gray;
  text-align: justify;
  transition: all 0.3s ease-out;

  h3 {
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 1em 0 0.7em;
    color: $color-black;
  }
  
  h3 , p {
    transition: all 0.3s ease-out;
    opacity: var(--active);
  }

  p{
    line-height: 1.5rem;
    margin-top: 0;
  }

  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
    border-radius: 10px;
    width:100%;
    cursor: pointer;
  }
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

export default function Modal({
  showModal, setShowModal, myQuizScore, myQuizResult,
}) {
  const modalRef = useRef();
  const [showMapModal, setShowMapModal] = useState(false);
  const openModal = () => {
    setShowMapModal((prev) => !prev);
  };

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? 'translateY(0%)' : 'translateY(-100%)',
  });

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
        console.log('I pressed');
      }
    },
    [setShowModal, showModal],
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
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
              <ModalContent>
                <h3>
                  親愛的~ 測驗結果為
                  {myQuizScore}
                  分
                </h3>
                <p>
                  {myQuizResult}
                </p>
                {myQuizScore > 18
                  ? (
                    <button type="button" onClick={() => openModal()}>
                      前往諮詢
                    </button>
                  )
                  : (
                    <Link to="../card">
                      <button type="button">
                        抽卡放鬆
                      </button>
                    </Link>
                  )}
              </ModalContent>
              <CloseModalButton
                aria-label="Close modal"
                onClick={() => setShowModal((prev) => !prev)}
              />
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}

      <MapModal
        showModal={showMapModal}
        setShowModal={setShowMapModal}
        content={<MapApp />}
      />

    </div>
  );
}
