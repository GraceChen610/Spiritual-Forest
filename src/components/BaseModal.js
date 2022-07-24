import React, { useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components/macro';
import { MdClose } from 'react-icons/md';
import PropTypes from 'prop-types';

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${(props) => props.bkc || 'rgba(0, 0, 0, 0.8)'};
  position: fixed;
  top:0;
  left:0;
  z-index:5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: ${(props) => props.width || '800px'};
  height: ${(props) => props.height || '700px'};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  background: ${(props) => props.bg || 'linear-gradient(130deg, #D7FFFE, #ace0f9, #ace0c1)'};
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: ${(props) => props.flexDirection || 'column'};
  justify-content: ${(props) => props.justify || 'center'};
  align-items: center;
  line-height: 1;
  color: #141414;
  opacity: 1;
  width:100%;
  height:100%;
  position:relative;

  img{
    :hover{
    transform: scale(1.2);
    cursor: pointer;
    }
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
  showModal, setShowModal, content, bkc, width, height, bg, justify, flexDirection,
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
        <Background onClick={closeModal} ref={modalRef} bkc={bkc}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal} width={width} height={height} bg={bg}>
              <ModalContent justify={justify} flexDirection={flexDirection}>
                {content}
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

Modal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  content: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  bkc: PropTypes.string,
  bg: PropTypes.string,
  justify: PropTypes.string,
  flexDirection: PropTypes.string,
};

Modal.defaultProps = {
  width: null,
  height: null,
  bkc: null,
  bg: null,
  justify: null,
  flexDirection: null,
};
