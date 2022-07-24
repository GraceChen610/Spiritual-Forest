import styled, { keyframes } from 'styled-components/macro';
import {
  useEffect, useState, useRef, useContext,
} from 'react';
import { Link } from 'react-router-dom';
import { GiChainedHeart } from 'react-icons/gi';
import { signOut } from 'firebase/auth';
import Toast from '../../components/toastAlert';
import UserContext from '../../userContext';
import firebaseStores, { auth } from '../../firebase';
import Modal from '../../components/BaseModal';
import Cheerful from '../../components/cheerful';
import Worry from '../../components/worry';
import Login from '../login';
import Tour from '../tour';
import CheerfulBgImg from '../../components/cheerful/cheerfulBoard.png';
import WorryBgImg from '../../components/worry/worryBoard.png';

const Wrapper = styled.div`
    height:100vh;
    width: 100vw;
    position: relative;
`;

const Sky = styled.div`
    background: linear-gradient(180deg, rgba(105, 194, 238, 1), rgba(255, 255, 255, 1));
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
    bottom:170px;
    left:-10px;

  @media screen and (max-width: 1280px) { 
    bottom:150px;
    width: 55%;
    left: 10px;
  }

  @media screen and (max-width: 1024px) { 
    bottom:110px;
    left: 10px;
    width: 57%;
  }
`;

const Base = styled.div`
position: absolute;
z-index:-45;
bottom:170px;
left:-10px;
`;

const Board = styled(Base)`
    bottom:50px;
    left:350px;

  @media screen and (max-width: 1280px) { 
    left:320px;
    bottom:45px;
    width:68%;
  }

  @media screen and (max-width: 1024px) { 
    left:250px;
    bottom:35px;
    width:65%;
  }
`;

const Title = styled.div`
    position: absolute;
    z-index:-40;
    bottom:100px;
    left:440px;
    width:415px;
    height:200px;
    display: flex;
    align-items: center;
    ${'' /* border: black solid 1px; */}

    span{
    text-align: justify;
    color:#491818;
    vertical-align: middle;
    font-size:1.4rem;
    font-weight: bold;
    }
    @media screen and (max-width: 1280px) { 
      width:370px;
      height:180px;
      left:400px;
      bottom:90px;
    }
    @media screen and (max-width: 1024px) { 
      bottom:75px;
      left:310px;
      width:290px;
      height:135px;
      span{
        font-size:1.2rem;
      }
    }
`;

const butterfly = keyframes`
   0% {transform: translate(550px, 60px); opacity: 0.8;}
  25% {transform: translate(400px, -45px); opacity: 1;}
  50% {transform: translate(200px, 0px); opacity: 1;}
  75% {transform: translate(0px, -45px); opacity: 1;}
  100% {transform: translate(-200px, 0px);opacity: 0.8;}
`;

const Butterfly = styled(Base)`
    animation: ${butterfly} 20s linear 0s infinite;
    bottom:120px;
    left:500px;
    z-index:-40;
  @media screen and (max-width: 1024px) { 
    left:200px;
    width:4%;
  }
`;

const bear = keyframes`
    0%   {transform: rotate(0deg);  opacity: 0;}
  50% {transform: rotate(75deg) translate(0px, 150px);}
  100% {transform: rotate(0deg);  opacity: 1;}
`;

const bear1024 = keyframes`
  0%   {transform: rotate(0deg);  opacity: 0;}
  50% {transform: rotate(75deg) translate(0px, 100px);}
  100% {transform: rotate(0deg);  opacity: 1;}
`;

const Bear = styled(Base)`
    animation: ${bear} 2s ease 4s alternate 1 forwards;
    transform-origin: bottom right;
    bottom:349px;
    left:700px;
    opacity: 0;

  @media screen and (max-width: 1280px) { 
    bottom: 302px;
    left: 600px;
  }
  @media screen and (max-width: 1024px) { 
    animation: ${bear1024} 2s ease 4s alternate 1 forwards;
    bottom: 233px;
    left: 500px;
    width: 10%;
  }
`;

const Turf = styled(Base)`
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
  @media screen and (max-width: 1280px) { 
    bottom:40px;
    left:810px;
    width:22%
  }
  @media screen and (max-width: 1024px) { 
    bottom:40px;
    left:620px;
    width:20%
  }
`;

const Lion = styled(Base)`
bottom:30px;
left:1090px;

  @media screen and (max-width: 1280px) { 
    bottom:85px;
    left:970px;
    width:20%
  }

  @media screen and (max-width: 1024px) { 
    bottom:40px;
    left:750px;
    width:18%
  }
`;

const RedPanda = styled(Base)`
z-index:-42;
bottom:60px;
left:220px;
@media screen and (max-width: 1280px) { 
  bottom:60px;
  left:160px;
  width:23%
}
@media screen and (max-width: 1024px) { 
  bottom:60px;
  left:140px;
  width:20%
}

`;

const Owl = styled.div`
  position: absolute;
  z-index:0;
  bottom:520px;
  left:350px;
img{ 
  :hover{
    transform: scale(1.2);
    cursor: pointer;
  }
}
@media screen and (max-width: 1280px) { 
  bottom:460px;
  left:330px;
}
@media screen and (max-width: 1180px) { 
  bottom:435px;
  left:300px;
}
@media screen and (max-width: 1024px) { 
  bottom: 365px;
  left: 270px;
  width:25%
}
`;

const Grass = styled(Base)`
z-index:0;
bottom:0px;
left:0px;
`;

const Sign = styled.span`
  display: inline-block;
  position: absolute;
  z-index:0;
  bottom:100px;
  left:30px;
  width:150px;
  text-align:center;
  color: white;
  text-shadow: black 0.1em 0.1em 0.2em;
  font-size:1.2rem;
  padding: 30px 0;
  ${'' /* border: 1px solid black; */}
:hover{
  transform: scale(1.17);
  cursor: pointer;
}
 @media screen and (mix-width: 1920px) { 
    width: 180px;
    bottom: 110px;
    padding: 40px 0;
    font-size: 1.5rem;
  }
  @media screen and (max-width: 1440px) { 
    width: 140px;
    bottom: 90px;
  }
  @media screen and (max-width: 1280px) { 
    width: 120px;
    bottom: 85px;
    padding: 20px 0;
  }
  @media screen and (max-width: 1024px) { 
    bottom: 70px;
    left: 30px;
    width: 100px;
    padding: 20px 0;
    font-size: 1rem;
  }

`;

const SignR = styled(Sign)`
right:30px;
left: initial;
`;

const SignLog = styled(Sign)`
bottom:385px;
left:430px;
  @media screen and (min-width: 1920px) { 
    bottom: 380px;
    left: 430px;
    width:150px;
  }
  @media screen and (max-width: 1280px) { 
    bottom: 350px;
    left: 400px;
  }
  @media screen and (max-width: 1180px) { 
    bottom: 325px;
    left: 370px;
  }
  @media screen and (max-width: 1024px) { 
    bottom: 270px;
    left: 330px;
  }
`;

const bubble = keyframes`
    0%   { transform: rotateX(90deg);  opacity: 0;}
  100% {  transform: rotateX(0deg);  opacity: 0.9;}
`;

const QusitionControl = styled.div`
  opacity: 0;
  animation: ${bubble} 2s ease 2s 1 forwards;
  background: url("/img/bubble.png") no-repeat bottom left / 100%;
  height:30%;
  width:25%;
  position: absolute;
  bottom:400px;
  left:970px;
  z-index:1;
  ${'' /* border:1px solid black; */}
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(5px 5px 0.5rem #2c4919);

  @media screen and (min-width: 1920px) { 
    min-height:30%;
  }

  @media screen and (max-width: 1280px) { 
    bottom: 360px;
    height:25%;
    left:880px;
  }

  @media screen and (max-width: 1024px) { 
    min-height:20%;
    height:auto;
    bottom: 270px;
    left: 670px;
  }
`;

const qusition = keyframes`
    0%   { transform: rotateX(90deg);  opacity: 0;}
  100% {  transform: rotateX(0deg);  opacity: 1;}
`;

const Qusition = styled.div`
    animation: ${qusition} 2s ease 1s 1 forwards;
    opacity: 0;
    width:100%;
    height:150px;
    text-align: center;
    font-size: 1.35rem;
    ${'' /* border: black solid 1px; */}
    font-weight: bold;
    display:flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom:3rem;

  span{
    color:#491818;
  }
  @media screen and (max-width: 1440px) { 
    height:auto;
    font-size: 1.2rem;
    margin-top:0rem;
    padding-bottom:2rem;
  }
  @media screen and (max-width: 1280px) { 
    height:auto;
    font-size: 1.2rem;
    margin-top:0rem;
    padding-bottom:2.5rem;
  }
  @media screen and (max-width: 1024px) { 
    height:auto;
    width:250px;
    font-size: 1.1rem;
    padding-bottom: 2rem;
  }
`;

const ButtonControl = styled.div`
    margin-top:0.6rem;
    display:flex;
    justify-content: space-around;
    button {
    background-color: #efddc5;
    border-radius: 100px;
    box-shadow: rgba(243, 158, 91, .2) 0 -25px 18px -14px inset,rgba(243, 158, 91, .15) 0 1px 2px,rgba(243, 158, 91, .15) 0 2px 4px,rgba(243, 158, 91, .15) 0 4px 8px,rgba(243, 158, 91, .15) 0 8px 16px,rgba(243, 158, 91, .15) 0 16px 32px;
    color: #491818;
    cursor: pointer;
    display: inline-block;
    padding: 7px 20px;
    text-align: center;
    text-decoration: none;
    transition: all 250ms;
    border: 0;
    font-size: 16px;
    font-weight: bold;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  :hover {
    box-shadow: rgba(243, 158, 91,.35) 0 -25px 18px -14px inset,rgba(243, 158, 91,.25) 0 1px 2px,rgba(243, 158, 91,.25) 0 2px 4px,rgba(243, 158, 91,.25) 0 4px 8px,rgba(243, 158, 91,.25) 0 8px 16px,rgba(243, 158, 91,.25) 0 16px 32px;
    transform: scale(1.05) rotate(-1deg);
  }

  @media screen and (max-width: 1024px) { 
    padding: 5px 15px;
    font-size: 14px;
  }

}

`;

function BadModalContent() {
  return (
    <>
      <Link
        to="/quiz"
        className="index-quiz"
      >
        <img src="img/signBorderR.png" alt="r" width="300px" />
      </Link>
      <Link
        to="/card"
        className="index-card"
      >
        <img src="img/signBorderL2.png" alt="r" width="300px" />
      </Link>
    </>
  );
}

export default function Home() {
  const [positive, setPositive] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showBadModal, setShowBadModal] = useState(false);
  const [showWorryModal, setShowWorryModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const refTitle = useRef();
  const refContent = useRef();
  const user = useContext(UserContext);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const openBadModal = () => {
    setShowBadModal((prev) => !prev);
  };

  const openWorryModal = () => {
    setShowWorryModal((prev) => !prev);
  };

  const openLoginModal = () => {
    setShowLoginModal((prev) => !prev);
  };

  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    firebaseStores.getData('all_positives')
      .then((res) => res[0].data())
      .then((data) => setPositive(data.positives[getRandom(0, 40)]));
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
      {user || showLoginModal || showBadModal ? null : <Tour />}

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
        <img src="/img/tree2.png" alt="tree" width="80%" />
      </Tree>
      <Bear>
        <img src="/img/bear.png" alt="board" width="60%" />
      </Bear>
      <Board>
        <img src="/img/board.png" alt="board" width="60%" />
      </Board>

      <Title className="step-1">
        <span>{positive}</span>
      </Title>

      <Butterfly>
        <img src="/img/Butterfly.png" alt="board" width="80%" />
      </Butterfly>
      <Turf>
        <img src="/img/turf.png" alt="turf" width="100%" />
      </Turf>
      <Zebra>
        <img src="/img/zebra.png" alt="zebra" width="70%" />
      </Zebra>
      <QusitionControl>
        <Qusition>
          <span>
            親愛的
            {' '}
            {user ? (user.userData.user_name) : '~'}
            {' '}
            {user ? <GiChainedHeart /> : null}
            <br />
            <span>今天感覺如何?</span>
          </span>
          <ButtonControl>
            <button
              className="step-4"
              type="button"
              onClick={() => {
                openModal();
                if (!user) {
                  Toast.fire({
                    title: '親愛的~登入才能紀錄心情喔~',
                  });
                  openModal();
                }
              }}
            >
              很 棒
            </button>

            <button className="step-3" type="button" onClick={() => openBadModal()}>
              不 好
            </button>

          </ButtonControl>

        </Qusition>
      </QusitionControl>
      <Lion>
        <img src="/img/lion.png" alt="lion" width="80%" />
      </Lion>
      <RedPanda>
        <img src="/img/red-panda.png" alt="panda" width="60%" />
      </RedPanda>

      <Owl
        type="button"
        onClick={() => {
          openWorryModal();
          if (!user) {
            Toast.fire({
              title: '親愛的~登入才能紀錄心情喔~',
            });
            openWorryModal();
          }
        }}
      >
        <img className="step-5" src="/img/owl.png" alt="owl" title="讓我替你分憂吧~" width="25%" />
      </Owl>

      <Grass>
        <img src="/img/grass.png" alt="turf" width="100%" />
      </Grass>

      <img src="/img/signs.png" alt="turf" width="10%" style={signLStyle} />
      <Sign className="step-6">
        <Link to="/truf">
          ＜前往草坪
        </Link>
      </Sign>

      <img src="/img/signs.png" alt="turf" width="10%" style={signRStyle} />

      <Link to="/record">
        <SignR className="step-2">紀錄今天＞ </SignR>
      </Link>

      {user
        ? (
          <SignLog onClick={() => signOut(auth).then(() => {
            Toast.fire({
              title: '登出成功，常回來看我們哦~',
            });
          }).catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error);
          })}
          >
            登
            {'　'}
            出
          </SignLog>
        )
        : (
          <SignLog className="step-7" onClick={() => openLoginModal()}>
            登入/註冊
          </SignLog>
        )}

      <Modal
        showModal={showLoginModal}
        setShowModal={setShowLoginModal}
        bg="url(/img/loginBg.png) no-repeat left top / 100% 100% "
        bkc="linear-gradient(130deg, #D7FFFE, #ace0f9, #ace0c1)"
        content={<Login setShowModal={setShowLoginModal} />}
      />

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        bg={`url(${CheerfulBgImg})  no-repeat left top / contain`}
        width="780px"
        height="700px"
        content={(
          <Cheerful
            refTitle={refTitle}
            refContent={refContent}
            setShowModal={setShowModal}
          />
        )}
      />

      <Modal
        showModal={showWorryModal}
        setShowModal={setShowWorryModal}
        bg={`url(${WorryBgImg})  no-repeat left top / contain`}
        width="755px"
        height="700px"
        content={(
          <Worry
            refTitle={refTitle}
            refContent={refContent}
            setShowModal={setShowWorryModal}
          />
        )}
      />

      <Modal
        showModal={showBadModal}
        setShowModal={setShowBadModal}
        width="100vw"
        height="100vh"
        justify="space-evenly"
        flexDirection="row"
        content={<BadModalContent />}
      />

    </Wrapper>
  );
}
