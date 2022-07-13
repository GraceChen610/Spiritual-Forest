/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components/macro';
import { MdClose } from 'react-icons/md';

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.8);
  position: fixed;
  bottom: 0px;
    left: 0px;
  z-index:5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  background: linear-gradient(130deg, #D7FFFE, #ace0f9, #ace0c1);
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const ModalContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  line-height: 1;
  color: #141414;
  opacity: 0.8;
  width:80vw;

  .index-quiz{
    &:after{
    ${'' /* content:"心情檢測"; */}
    position:absolute;
    top: 0px;
    left: 0px;
    color: brown;
    width: 100px;
  }
  }

  .index-card{
    &:after{
    ${'' /* content:"抽卡放鬆"; */}
    position: relative;
    top: -220px;
    left: 0px;
    color: brown;
    width: 100px;
    padding:0;
    }
  }
  img{
    :hover{
    transform: scale(1.2);
    cursor: pointer;
    }
  }
`;

const Rside = styled.img`
  width: 300px;

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
              <ModalContent>
                <Link
                  to="/quiz"
                  className="index-quiz"
                  onClick={() => {
                    setShowBadModal((prev) => !prev);
                  }}
                >
                  <Rside src="img/signBorderR.png" alt="r" />
                </Link>
                <Link
                  to="/card"
                  className="index-card"
                  onClick={() => {
                    setShowBadModal((prev) => !prev);
                  }}
                >
                  <Rside src="img/signBorderL2.png" alt="r" />
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
