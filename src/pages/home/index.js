import styled, { keyframes } from 'styled-components';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import firebaseStores from '../../firebase';

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
  100% {transform: translate(180%, 90px);}
  
`;

const cloud2 = keyframes`
    0%   { transform: translate(200%, 90px);}
  100% {transform: translate(0, 150px);}
`;

const cloud3 = keyframes`
    0%   { transform: translate(180%, 150px);}
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
    bottom:30px;
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

// const bear = keyframes`
//     0%   { transform: translate(0, -20px);}
//   ${'' /* 25% {transform: translate(-15px, 0px);}
//   50% {transform: translate(-30px, -20px);} */}
//   100% {transform: translate(0px, 0px);}
// `;

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
bottom:-5px;
left:0px;
z-index:-50;
height:105%;
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
`;

const Lion = styled(Tree)`
bottom:30px;
left:1090px;
`;

const RedPanda = styled(Tree)`
bottom:60px;
left:1300px;
`;

const Baboon = styled(Tree)`
z-index:-42;
bottom:30px;
left:250px;
`;
const Giraffe = styled(Tree)`
bottom:50px;
left:20px;
`;

const Grass = styled(Tree)`
z-index:0;
bottom:-110px;
left:0px;
`;

const SignWord = styled.div`
z-index:0;
position: absolute;
bottom:15px;
left:60px;
font-weight: bold;
`;

const Sign = styled.div`
z-index:-40;
position: absolute;
bottom:-80px;
left:35px;
`;

const SignWordR = styled(SignWord)`
  right:60px;
  text-align:right;
  color: 'withe',
`;

const SignR = styled.div`
z-index:-40;
position: absolute;
bottom:-80px;
right:-550px;
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
    z-index:-40;
    top:130px;
    left:1000px;
    width:330px;
    height:130px;
    text-align: center;
    font-size: 1.3rem;
    ${'' /* border: black solid 1px; */}
    font-size: 1.17em;
    font-weight: bold;
`;

const Button = styled.button`
    position: absolute;
    bottom:0px;
    left:30px;
`;

const Button2 = styled.button`
    position: absolute;
    bottom:0px;
    right:30px;
`;

// const newPage = styled.div`
//     opacity:${(props) => (props.show ? 1 : 0)};;
//     background-color: black;
//     width: 100vw;
//     height:100vh;
// `;

export default function Home() {
  const [positive, setPositive] = useState([]);
  useEffect(() => {
    firebaseStores.getData('all_positives')
      .then((res) => res[0].data())
      .then((data) => setPositive(data.positives[10]));
  }, []);

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
          <br />
          親愛的~
          <br />
          <span>今天感覺如何?</span>
        </span>
        <Link to="/post">
          <Button>
            很棒
          </Button>
        </Link>
        <Button2>
          不好
        </Button2>
      </Qusition>

      <Bubble>
        <img src="/img/bubble.png" alt="turf" width="70%" />
      </Bubble>
      <Lion>
        <img src="/img/lion.png" alt="turf" width="80%" />
      </Lion>
      <RedPanda>
        <img src="/img/red-panda.png" alt="turf" width="80%" />
      </RedPanda>
      <Baboon>
        <img src="/img/baboon.png" alt="turf" width="70%" />
      </Baboon>
      <Giraffe>
        <img src="/img/giraffe.png" alt="turf" width="60%" />
      </Giraffe>
      <Grass>
        <img src="/img/grass.png" alt="turf" width="100%" />
      </Grass>
      <div>
        <Sign>
          <img src="/img/signs.png" alt="turf" width="20%" />
        </Sign>
        <SignWord>
          <Link
            to="/post"
            style={{
              color: 'withe',
              textDecoration: 'none',
              ':visited': {
                color: 'black',
              },
            }}
          >
            ＜前往草坪
          </Link>
        </SignWord>
      </div>
      <div>
        <SignR>
          <img src="/img/signs.png" alt="turf" width="20%" />
        </SignR>
        <SignWordR>
          <Link
            to="/post"
            style={{
              color: 'withe',
              textDecoration: 'none',
              ':visited': {
                color: 'black',
              },
            }}
          >
            紀錄今天＞
          </Link>
        </SignWordR>
      </div>
    </Wrapper>
  );
}
