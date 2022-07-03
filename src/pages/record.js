/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-console */
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Todos, { List, Edit, Title } from '../components/todo';
import bg from './recordBg.png';
import listBg from './listBg2.png';
import backfrog from './frog.png';
import firebaseStores from '../firebase';
import Modal from '../components/ModalCan';
import photoBg from './photoBg.png';
import baseImg from './base2.png';

const Wrapper = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    background:  url(${bg}) no-repeat left top / contain ;
    padding-top:180px;
    padding-left:300px;
    position:relative;
`;
const LeftControl = styled.div`
height:60%;
`;

const RightControl = styled.div`
    display: flex;
    flex-direction: column;
  align-items: center;
`;

const TodoList = styled.div`
  width:25vw;
  height:37vh;
  ${'' /* border: 1px solid red; */}
  background:  url(${listBg}) no-repeat top right / 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Goal = styled(TodoList)`
  text-align: center;
`;

const Backfrog = styled.img`
  height:30vw;
  position: absolute;
  bottom:1rem;
  left:30px;
  z-index:1;
`;

const ImgBg = styled.div`
  width: 45vw;
  height: 75vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background:  url(${photoBg}) no-repeat left top / 100% 100% ;
  cursor: pointer;
`;

export default function Record() {
  const collectionID = 'THwS7xjxkLtR5N7t8CRA';
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [historyImg, setHistoryImg] = useState();
  const [updataImg, setUpdataImg] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  useEffect(() => {
    firebaseStores.getOneDoc('users', collectionID)
      .then((res) => res.data())
      .then((res) => setData(res.gratitude))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    firebaseStores.getOneDoc('users', collectionID)
      .then((res) => setHistoryImg(res.data().pic))
      .catch((e) => console.log(e));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updataImg, historyImg]);

  return (
    <Wrapper>
      <Link to="/">
        <Backfrog src={backfrog} />
      </Link>
      <LeftControl>
        {/* <Canvas /> */}
        <ImgBg>
          {
            historyImg
              ? <img src={historyImg} alt="myImg" height={380} onClick={() => openModal()} />
              : <img src={baseImg} alt="myImg" height={380} onClick={() => openModal()} />
          }
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            setHistoryImg={setHistoryImg}
            setUpdataImg={setUpdataImg}
          />
        </ImgBg>
      </LeftControl>
      <RightControl>
        <TodoList><Todos /></TodoList>
        <Goal>
          <div>
            <Title>感恩小語</Title>
            <List data={data} deleteData={setData} keyName="gratitude" />
            <Edit data={data} add={setData} keyName="gratitude" />
          </div>
        </Goal>
      </RightControl>
    </Wrapper>
  );
}
