import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import UserContext from '../userContext';
import firebaseStores from '../firebase';
import bird from './bird.png';
import sharehappy from './sharehappy.png';

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
  flex-direction: ${(props) => props.flexDirection || 'column'};
  justify-content: ${(props) => props.justify || 'center'};
  line-height: 1;
  color: #141414;
  opacity: 0.8;
  width:70%;
  position:relative;
  ${'' /* border: 1px solid; */}

  img{
    :hover{
    transform: scale(1.2);
    cursor: pointer;
    }
  }

  input {
    margin-bottom: 1rem;
    padding: 0.5rem;
    width:55%;
    height:20px;
    border-radius: 10px;
    font-size:1.2rem;
    position:relative;
    top: 75px;
    left:-25px;
  }
  textarea {
    margin-bottom: 1rem;
    font-size: 1.05rem;
    padding: 0.5rem;
    width:70%;
    height:215px;
    border-radius: 10px;
    position:relative;
    top: 75px;
    left:-67px;
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
export default function Cheerful({ setShowModal, refTitle, refContent }) {
  const User = useContext(UserContext);

  return (
    <>
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
    </>
  );
}

Cheerful.propTypes = {
  setShowModal: PropTypes.func.isRequired,
  refTitle: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
  refContent: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
};
