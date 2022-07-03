/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import Swal from 'sweetalert2';
import firebaseStores from '../firebase';
import BgImg from './happyBoard.png';

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

// const ModalImg = styled.img`
//   width: 100%;
//   height: 100%;
//   border-radius: 10px 0 0 10px;
//   background: #000;
// `;

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
    height:28px;
    border-radius: 10px;
    font-size:1.3rem;
    position:relative;
    top: 80px;
    left:-25px;
  }
  textarea {
    margin-bottom: 1rem;
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
              {/* <ModalImg src={require('./modal.jpg')} alt="camera" /> */}
              <ModalContent>
                <input type="text" placeholder="標題" ref={refTitle} />
                <textarea placeholder="心情內容" ref={refContent} />
                <button
                  type="button"
                  onClick={() => {
                    setShowModal((prev) => !prev);
                    firebaseStores.postdata(
                      'cheerful_articles',
                      { title: refTitle.current.value, content: refContent.current.value, user_id: 'a123' },
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
