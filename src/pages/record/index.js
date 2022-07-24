/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import styled from 'styled-components/macro';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import Toast from '../../components/toastAlert';
import UserContext from '../../userContext';
import Todos, { List, Edit, Title } from '../../components/todo';
import bg from './recordBg.png';
import listBg from './listBg2.png';
import backfrog from './frog.png';
import firebaseStores from '../../firebase';
import Modal from '../../components/BaseModal';
import photoBg from './photoBg.png';
import baseImg from './base2.png';
import Canvas from './canvas';

const Wrapper = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background:  url(${bg}) no-repeat left top / 100% 100% ;
    position:relative;
`;

const Contain = styled.div`
    display: flex;
    height: calc((700/1080)*100vh);
    width: calc((1350/1920)*100vw);
    margin-left: 2rem;
    box-sizing: content-box;
`;

const LeftControl = styled.div`
height:100%;
`;

const RightControl = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TodoList = styled.div`
  width:23vw;
  height:35vh;
  ${'' /* border: 1px solid red; */}
  background: url(${listBg}) no-repeat top right / 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
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
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background:  url(${photoBg}) no-repeat left top / 100% 100% ;
  img{
    cursor: pointer;
  }
`;

export default function Record() {
  const User = useContext(UserContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [historyImg, setHistoryImg] = useState();
  const [updataImg, setUpdataImg] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  useEffect(() => {
    if (User === '') {
      // eslint-disable-next-line no-console
      console.log('Loading...');
    }

    if (User === null) {
      Toast.fire({
        title: '親愛的~登入才能紀錄資料喔~',
      });
      setTimeout(() => {
        navigate('/');
      }, 4000);
    }

    if (User) {
      firebaseStores.getOneDoc('users', User.uid)
        .then((res) => {
          setData(res.data().gratitude);
          setHistoryImg(res.data().pic);
        })
        // eslint-disable-next-line no-console
        .catch((e) => console.log(e));
    }
  }, [User, updataImg, historyImg, navigate]);

  return (
    <Wrapper>
      <Link to="/">
        <Backfrog src={backfrog} />
      </Link>
      <Contain>
        <LeftControl>
          <ImgBg>
            {
            historyImg
              ? (
                <img
                  src={historyImg}
                  alt="myImg"
                  height={380}
                  style={{
                    maxHeight: '80%', maxWidth: '80%', height: 'auto', width: 'auto', cursor: 'pointer',
                  }}
                  title="點擊可更換新圖片"
                  onClick={() => openModal()}
                  onKeyDown={() => openModal()}
                />
              )
              : <img src={baseImg} alt="點擊製作夢想圖" title="點擊可製作夢想圖" height={380} onClick={() => openModal()} onKeyDown={() => openModal()} />
          }
            <Modal
              showModal={showModal}
              setShowModal={setShowModal}
              content={(
                <Canvas
                  setHistoryImg={setHistoryImg}
                  setUpdataImg={setUpdataImg}
                  setShowModal={setShowModal}
                />
              )}
              width="1080px"
              height="650px"
            />
          </ImgBg>
        </LeftControl>
        <RightControl>
          <TodoList><Todos /></TodoList>
          <Goal>
            <div style={{ width: '65%' }}>
              <Title>感恩小語</Title>
              <List data={data} deleteData={setData} keyName="gratitude" />
              <Edit data={data} add={setData} keyName="gratitude" />
            </div>
          </Goal>
        </RightControl>
      </Contain>
    </Wrapper>
  );
}
