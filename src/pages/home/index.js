/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import styled, { keyframes } from 'styled-components';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import firebaseStores from '../../firebase';
import Modal from '../../components/Modal';
import BadModal from '../../components/badModal';
import WorryModal from '../../components/ModalWorry';

const Wrapper = styled.div`
    height:100vh;
    width: 100vw;
    position: relative;
`;

const Sky = styled.div`
    background: linear-gradient(180deg, rgba(105, 194, 238, 1), rgba(255, 255, 255, 1)), url('') no-repeat center center fixed;
    width:100%;
    height:60%;
    position: relative;
    z-index:-50;
`;

const cloud = keyframes`
    0%   { transform: translate(10%, 0px);}
  100% {transform: translate(100%, 90px);}
  
`;

const cloud2 = keyframes`
    0%   { transform: translate(100%, 90px);}
  100% {transform: translate(0, 150px);}
`;

const cloud3 = keyframes`
    0%   { transform: translate(100%, 150px);}
  100% {transform: translate(0%, 200px);}
`;

const Cloud = styled.div`
    animation: ${cloud} 40s linear 0s alternate infinite;
    position: absolute;
    z-index:-48;
    top:0;
    left:0;
`;

const Cloud2 = styled(Cloud)`
    animation: ${cloud2} 30s linear 0s alternate infinite;
    z-index:-47;
`;

const Cloud3 = styled(Cloud)`
    animation: ${cloud3} 50s linear 0s alternate infinite;
    z-index:-49;
`;

const Tree = styled.div`
    position: absolute;
    z-index:-45;
    bottom:100px;
    left:-10px;
`;

const Board = styled(Tree)`
    bottom:50px;
    left:350px;
`;

const butterfly = keyframes`
   0% {transform: translate(550px, 60px); opacity: 0.8;}
  25% {transform: translate(400px, -45px); opacity: 1;}
  50% {transform: translate(200px, 0px); opacity: 1;}
  75% {transform: translate(0px, -45px); opacity: 1;}
  100% {transform: translate(-150px, 0);opacity: 0.8;}
`;

const Butterfly = styled(Tree)`
    animation: ${butterfly} 20s linear 0s infinite;
    bottom:120px;
    left:500px;
    z-index:-42;
`;

const bear = keyframes`
    0%   {transform: rotate(0deg);  opacity: 0;}
  50% {transform: rotate(75deg) translate(0px, 150px);}
  100% {transform: rotate(0deg);  opacity: 1;}
`;

const Bear = styled(Tree)`
    animation: ${bear} 2s ease 4s alternate 1 forwards;
    transform-origin: bottom right;
    opacity: 0;
    bottom:340px;
    left:700px;
`;

const Turf = styled(Tree)`
bottom:0px;
left:0px;
z-index:-50;
`;

const zebra = keyframes`
    0%   {transform: rotate(10deg);}
  70% {transform: rotate(0deg);}
  100% {transform: rotate(0deg);}
`;

const Zebra = styled(Board)`
    animation: ${zebra} 2s ease 0s 1;
    transform-origin: bottom center;
    bottom:50px;
    left:900px;
`;

const bubble = keyframes`
    0%   { transform: rotateX(90deg);  opacity: 0;}
  100% {  transform: rotateX(0deg);  opacity: 1;}
`;
const Bubble = styled(Board)`
opacity: 0;
    animation: ${bubble} 2s ease 2s 1 forwards;
    ${'' /* transform-origin: bottom center; */}
    bottom:380px;
    left:970px;
    z-index:0;
`;

const Lion = styled(Tree)`
bottom:30px;
left:1090px;
`;

const RedPanda = styled(Tree)`
z-index:-42;
bottom:60px;
left:220px;
`;

const Giraffe = styled(Tree)`
bottom:100px;
left:20px;
`;

const Owl = styled.div`
position: absolute;
z-index:0;
bottom:285px;
left:220px;
`;

const Grass = styled(Tree)`
z-index:0;
bottom:0px;
left:0px;
`;

const Sign = styled.span`
display: inline-block;
position: absolute;
z-index:0;
bottom:130px;
left:30px;
${'' /* border: 1px solid black; */}
width:150px;
text-align:center;
color: white;
text-shadow: black 0.1em 0.1em 0.2em;
`;

const SignR = styled(Sign)`
right:30px;
left: initial;
`;

const Title = styled.div`
    position: absolute;
    z-index:-40;
    bottom:100px;
    left:450px;
    width:400px;
    height:200px;
    ${'' /* border: black solid 1px; */}
    ${'' /* overflow-x: scroll; */}
`;

const qusition = keyframes`
    0%   { transform: rotateX(90deg);  opacity: 0;}
  100% {  transform: rotateX(0deg);  opacity: 1;}
`;

const Qusition = styled.div`
    animation: ${qusition} 2s ease 2s 1 forwards;
    opacity: 0;
    position: absolute;
    z-index:1;
    bottom:450px;
    left:990px;
    width:330px;
    height:120px;
    text-align: center;
    font-size: 1.2rem;
    ${'' /* border: black solid 1px; */}
    font-weight: bold;
    display:flex;
    flex-direction: column;
    padding:0.5rem;

`;

const ButtonControl = styled.div`
    margin-top:1rem;
    display:flex;
    justify-content: space-around;
    ${'' /* border: black solid 1px; */}
`;

export default function Home() {
  const [positive, setPositive] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showBadModal, setShowBadModal] = useState(false);
  const [showWorryModal, setShowWorryModal] = useState(false);
  const refTitle = useRef('');
  const refContent = useRef('');

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const openBadModal = () => {
    setShowBadModal((prev) => !prev);
  };

  const openWorryModal = () => {
    setShowWorryModal((prev) => !prev);
  };

  useEffect(() => {
    firebaseStores.getData('all_positives')
      .then((res) => res[0].data())
      .then((data) => setPositive(data.positives[10]));
  }, []);

  const signLStyle = {
    position: 'absolute',
    zIndex: -1,
    bottom: '30px',
    left: '30px',
  };

  const signRStyle = {
    position: 'absolute',
    zIndex: -1,
    bottom: '30px',
    right: '30px',
    // transform: 'scaleX(-1)',
  };

  return (
    <Wrapper>
      <Sky />
      <Cloud>
        <img src="/img/cloud.png" alt="Cloud" width="10%" />
        <img src="/img/cloud.png" alt="Cloud" width="25%" />
        <img src="/img/cloud.png" alt="Cloud" width="15%" />
      </Cloud>
      <Cloud2>
        <img src="/img/cloud.png" alt="Cloud" width="25%" />
        <img src="/img/cloud.png" alt="Cloud" width="10%" />
      </Cloud2>
      <Cloud3>
        <img src="/img/cloud.png" alt="Cloud" width="35%" />
        <img src="/img/cloud.png" alt="Cloud" width="20%" />
      </Cloud3>
      <Tree>
        <img src="/img/tree.png" alt="tree" width="55%" />
      </Tree>
      <Bear>
        <img src="/img/bear.png" alt="board" width="60%" />
      </Bear>
      <Board>
        <img src="/img/board.png" alt="board" width="60%" />
      </Board>

      <Title>
        <h2>{positive}</h2>
      </Title>

      <Butterfly>
        <img src="/img/Butterfly.png" alt="board" width="80%" />
      </Butterfly>
      <Turf>
        <img src="/img/turf.png" alt="turf" width="100%" />
      </Turf>
      <Zebra>
        <img src="/img/zebra.png" alt="turf" width="70%" />
      </Zebra>
      <Qusition>
        <span>
          親愛的~
          <br />
          <span>今天感覺如何?</span>
        </span>
        <ButtonControl>

          <button type="button" onClick={() => openModal()}>
            很棒
          </button>
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            refTitle={refTitle}
            refContent={refContent}
          />

          <BadModal
            showBadModal={showBadModal}
            setShowBadModal={setShowBadModal}
            refTitle={refTitle}
            refContent={refContent}
          />
          <button type="button" onClick={() => openBadModal()}>
            不好
          </button>

        </ButtonControl>

      </Qusition>
      <Bubble>
        <img src="/img/bubble.png" alt="turf" width="70%" />
      </Bubble>
      <Lion>
        <img src="/img/lion.png" alt="turf" width="80%" />
      </Lion>
      <RedPanda>
        <img src="/img/red-panda.png" alt="turf" width="60%" />
      </RedPanda>
      <Giraffe>
        <img src="/img/giraffe.png" alt="turf" width="60%" />
      </Giraffe>
      <Owl type="button" onClick={() => openWorryModal()}>
        <img src="/img/owl2.png" alt="owl" width="60%" />
      </Owl>
      <WorryModal
        showWorryModal={showWorryModal}
        setShowWorryModal={setShowWorryModal}
        refTitle={refTitle}
        refContent={refContent}
      />
      <Grass>
        <img src="/img/grass.png" alt="turf" width="100%" />
      </Grass>

      <img src="/img/signs.png" alt="turf" width="10%" style={signLStyle} />
      <Sign>
        <Link to="/post">
          ＜登入
        </Link>
      </Sign>

      <img src="/img/signs.png" alt="turf" width="10%" style={signRStyle} />
      <SignR>
        <Link to="/record">
          紀錄今天＞
        </Link>
      </SignR>
    </Wrapper>
  );
}
