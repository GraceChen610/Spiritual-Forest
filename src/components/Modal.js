/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, {
  useRef, useEffect, useCallback, useContext,
} from 'react';
import { useSpring, animated } from 'react-spring';
import styled, { keyframes } from 'styled-components';
import { MdClose } from 'react-icons/md';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import UserContext from '../userContext';
import firebaseStores from '../firebase';
import BgImg from './happyBoard.png';
import bird from './bird.png';
import sharehappy from './sharehappy.png';

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  bottom: 0px;
    left: 0px;
  z-index:3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 780px;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  background: linear-gradient(130deg, #D7FFFE, #ace0f9, #ebc0fd);
  background: url(${BgImg})  no-repeat left top / contain ;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const birdanimated = keyframes`
0%   { transform: translate(0, 0px);}
100% {transform: translate(0, -25px);}
`;

const Bird = styled.img`
  width: 8%;
  height: auto;
  position: absolute;
  top: 130px;
  left: 100px;
  z-index:-39;
  animation: ${birdanimated} 0.3s ease-out 1s alternate 6;
`;

const shareHappyAnimated = keyframes`
0%   { transform: translate(0, 0px) scale(0.7);}
100% {transform: translate(0, 0px) scale(1);opacity: 1;}
`;

const ShareHappy = styled.img`
  width: 25%;
  height: auto;
  position: absolute;
  top: 20px;
  left: 10px;
  z-index:-40;
  opacity: 0;
  animation: ${shareHappyAnimated} 2s ease 3s alternate infinite;

`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${'' /* align-items: center; */}
  line-height: 1;
  color: #141414;
  opacity: 0.8;
  width:70%;
  position:relative;

  
  input {
    margin-bottom: 1rem;
    padding: 0.5rem;
    width:53%;
    height:20px;
    border-radius: 10px;
    font-size:1.2rem;
    position:relative;
    top: 80px;
    left:-25px;
  }
  textarea {
    margin-bottom: 1rem;
    font-size: 1.05rem;
    padding: 0.5rem;
    width:68%;
    height:215px;
    border-radius: 10px;
    position:relative;
    top: 75px;
    left:-70px;
  }
  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
    align-self:flex-start;
    border-radius: 10px;
    position:relative;
    top: 100px;
    left:90px;
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
  showModal, setShowModal, refTitle, refContent,
}) {
  const User = useContext(UserContext);
  const modalRef = useRef();

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
              <Bird src={bird} alt="bird" />
              <ShareHappy src={sharehappy} alt="sharehappybubble" />
              <ModalContent>
                <input type="text" placeholder="標題" ref={refTitle} />
                <textarea placeholder="心情內容" ref={refContent} />
                <button
                  type="button"
                  onClick={() => {
                    setShowModal((prev) => !prev);
                    firebaseStores.postdata(
                      'cheerful_articles',
                      {
                        title: refTitle.current.value,
                        content: refContent.current.value,
                        user_id: User.uid,
                        id: uuidv4(),
                      },
                    );
                    Swal.fire({
                      icon: 'success',
                      showConfirmButton: false,
                      timer: 1200,
                      text: '心情已送出',
                    });
                  }}
                >
                  submit
                </button>
              </ModalContent>
              <CloseModalButton
                aria-label="Close modal"
                onClick={() => setShowModal((prev) => !prev)}
              />
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </div>
  );
}
