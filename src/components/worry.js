import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components/macro';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import UserContext from '../userContext';
import firebaseStores from '../firebase';
import groundhog from './groundhog.png';
import deer from './deer.png';

const deerAnimated = keyframes`
0%   { transform: translate(100px, -50px);}
100% {transform: translate(0, 0px); opacity: 1;}
`;

const Deer = styled.img`
  width: 40%;
  height: auto;
  position: absolute;
  bottom: 00px;
  left: 460px;
  z-index:1;
  opacity: 0;
  animation: ${deerAnimated} 1.5s ease 1s alternate 1 forwards;

`;

const groundhogAnimated = keyframes`
0%   { transform: translate(0, 10px);opacity: 1;}
100% {transform: translate(0, 0px); opacity: 1;}
`;

const Groundhog = styled.img`
  width: 10%;
  height: auto;
  position: absolute;
  bottom: 10px;
  left: 60px;
  z-index:-40;
  opacity: 0;
  animation: ${groundhogAnimated} 0.3s ease 3s alternate 8 forwards;

`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1;
  color: #141414;
  opacity: 0.8;
  width:70%;
  position:relative;

  
  input {
    margin-bottom: 1rem;
    padding: 0.5rem;
    width:48%;
    height:20px;
    border-radius: 10px;
    font-size:1.2rem;
    position:relative;
    top: 30px;
    left:-20px;
  }
  textarea {
    margin-bottom: 1rem;
    font-size: 1.05rem;
    padding: 0.5rem;
    width:48%;
    height:310px;
    border-radius: 10px;
    position:relative;
    top: 25px;
    left:-20px;
  }
  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
    align-self:flex-start;
    border-radius: 10px;
    position:relative;
    top: 15px;
    left:285px;
    cursor: pointer;
  }
`;

export default function Worry({
  setShowModal, refTitle, refContent,
}) {
  const User = useContext(UserContext);

  return (
    <>
      <Groundhog src={groundhog} alt="groundhog" />
      <Deer src={deer} alt="deer" />
      <ModalContent>
        <input type="text" placeholder="標題" ref={refTitle} />
        <textarea placeholder="把壞心情寫出來吧，我會保守秘密" ref={refContent} />
        <button
          type="button"
          onClick={() => {
            setShowModal((prev) => !prev);
            firebaseStores.postdata(
              'worries_articles',
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
            console.log(uuidv4());
          }}
        >
          submit
        </button>
      </ModalContent>
    </>
  );
}

Worry.propTypes = {
  setShowModal: PropTypes.func.isRequired,
  refTitle: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
  refContent: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
};
