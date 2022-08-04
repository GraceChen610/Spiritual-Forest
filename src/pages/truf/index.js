import styled, { keyframes } from 'styled-components/macro';
import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Toast from '../../components/toastAlert';
import UserContext from '../../userContext';
import firebaseStores from '../../firebase';
import MessageModal from '../../components/BaseModal';

const Wrapper = styled.div`
    background: url(/img/155.jpg) no-repeat 0 bottom / cover ;
    width:100vw;
    height:100vh;
    scrollbar-width:none;
`;

const PlantsControl = styled.div`
  width: 85%;
  height: 15%;
  position: absolute;
  bottom: 0;
`;

const Control = styled.div`
 position: absolute;
 bottom: ${(props) => props.bottom || 0}%;
 left: ${(props) => props.left || 0}%;

  :hover div{
    opacity: 0.8;
    background:white;
  }
`;

const Message = styled.div`
opacity: 0;
font-size:16px;
border-radius: 10px;
text-align:center ;
padding:10px 20px;
margin-bottom: 20px;
box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
max-width:250px;
text-overflow: ellipsis;
overflow: hidden;
white-space: nowrap;

:hover{
    opacity: 0.85;
    background:white;
}
`;

const shake = keyframes`
  0%   {transform: rotate(10deg);}
  50% {transform: rotate(0deg);}
  100% {transform: rotate(10deg);}
`;

const Grass = styled.img`
 display:block; 
 margin:auto;
 height: ${(props) => props.height || 65}px;
 width:auto;
 animation: ${shake} 3s ease 0s alternate infinite;
 transform-origin: bottom center;

 :hover{
    transform: scale(1.2);
    cursor: pointer;
  }
`;

const Flower = styled.img`
 display:block; 
 margin:auto;
 height: ${(props) => props.height || 100}px;
 width:auto;
 animation: ${shake} 4s linear 0s alternate infinite;
 transform-origin: bottom center;

 :hover{
    transform: scale(1.2);
    cursor: pointer;
  }
`;

const Articles = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    margin:1rem;
    padding:1.5rem;
    padding-right:0.8rem;
    font-size:14px;
    width:400px;
    max-height:550px;
    text-align:center ;
    word-break: break-word;

    span{
      font-size: 1.4rem;
      font-weight: bold;
      color: #683F39;
      margin-top:1rem;
      margin-bottom: 1rem;
      width:95%;
    }

    p{
      text-align: justify;
      line-height: 1.8rem;
      font-size: 1.1rem;
      padding-right:0.7rem;
      width:95%;
      overflow-y: auto;
      ::-webkit-scrollbar {
        width: 10px;
      }

      ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey; 
        border-radius: 10px;
      }
      
      ::-webkit-scrollbar-thumb {
        background: #79b9c2; 
        border-radius: 10px;
      }


    }
`;

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const SignBack = styled.div`
  position: absolute;
  bottom: 30px;
  right: 50px;
  z-index: 9999;
  display:flex;
  justify-content: center;
  align-items: end;
  width: 10%;
  height:23%;
  box-sizing: border-box;
  background:url("/img/sign.png") no-repeat bottom LEFT / 100%;
  cursor: pointer;

 ::after{
   content: 'Back >';
   color: white;
   height: 70%;
   width:100%;
   padding-top: 32%;
   padding-left: 15%;
   text-align:center;
   font-size: 1.2rem;
   letter-spacing: 3px;
   text-shadow: black 0.1em 0.1em 0.2em;
  }

  &:hover::after{
  font-size: 1.5rem;
  cursor: pointer;
  }
  
  @media screen and (min-width: 1920px) { 
    height:30%;
    ::after{
      font-size: 2rem;
    }
    &:hover::after{
      font-size: 2.3rem;
    }
  }

  @media screen and (max-width: 1280px) { 
    height: 20%;
    ::after{
      height: 70%;
    }
  }

  @media screen and (max-width: 1180px) { 
    height: 18%;
    ::after{
      padding: 15% 0 15% 12%;
      height: 60%;
    }
  }

  @media screen and (max-width: 1024px) { 
    height: 15%;
    ::after{
      height: 60%;
      padding: 13% 0 15% 13%;
      bottom: 30px;
    }
  }

  @media screen and (max-width: 768px) { 
    height:12%;

    ::after{
      height:60%;
      font-size: 1rem;
      letter-spacing: 2px;
    }
    &:hover::after{
    font-size: 1.2rem;
    letter-spacing: 1px;

    }
  }
`;

const sun = keyframes`
  0%   {transform: rotate(0deg);}
  100% {transform: rotate(360deg);}
`;

const Sun = styled.img`
  position: absolute;
  top: 40px;
  left: 80px;
  width: 140px;
  height: auto;
  animation: ${sun} 25s linear 0s infinite;
`;

const Sunface = styled.img`
position: absolute;
top: 105px;
left: 125px;
width: 60px;
height: auto;
z-index: 2;
`;

const butterfly = keyframes`
   0% {transform: translate(550px, 60px); opacity: 0.8;}
  25% {transform: translate(400px, -45px); opacity: 1;}
  50% {transform: translate(200px, 0px); opacity: 1;}
  75% {transform: translate(0px, -45px); opacity: 1;}
  100% {transform: translate(-200px, 0px);opacity: 0.8;}
`;

const Butterfly = styled.img`
    position: absolute;
    z-index:0;
    bottom:100px;
    right:900px;
    animation: ${butterfly} 20s linear 0s infinite;
    width:3%;
`;

const butterflyBlue = keyframes`
   0% {transform: translate(-550px, 60px); opacity: 0.8;}
  25% {transform: translate(-400px, -45px); opacity: 1;}
  50% {transform: translate(-200px, -0px); opacity: 1;}
  75% {transform: translate(0px, -60px); opacity: 1;}
  100% {transform: translate(300px, 30px);opacity: 0.8;}
`;

const ButterflyBlue = styled(Butterfly)`
  animation: ${butterflyBlue} 20s linear 0s infinite;
  bottom:150px;
  left:900px;
`;
export default function Truf() {
  const user = useContext(UserContext);
  const [worriesArticles, setWorriesArticles] = useState([]);
  const [cheerfulArticles, setCheerfulArticles] = useState([]);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [articleTitle, setArticleTitle] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const navigate = useNavigate();

  const openModal = () => {
    setShowMessageModal((prev) => !prev);
  };

  useEffect(() => {
    if (user === '') {
      Toast.fire({
        title: '稍等片刻，光速抓取資料中...',
      });
    }
    if (user === null) {
      Toast.fire({
        title: '親愛的~登入才能發文與綠植互動喔~',
      });
      setTimeout(() => {
        navigate('/');
      }, 4000);
    }
    if (user) {
      firebaseStores.getArticles('cheerful_articles', user.uid)
        .then((res) => setCheerfulArticles(
          (res.map((item) => ({ ...item, bottom: getRandom(0, 100), left: getRandom(0, 90) }))),
        ));
      firebaseStores.getArticles('worries_articles', user.uid)
        .then((res) => setWorriesArticles(
          (res.map((item) => ({ ...item, bottom: getRandom(0, 100), left: getRandom(0, 90) }))),
        ));
    }
  }, [user, navigate]);

  return (
    <Wrapper>
      <Sun src="/img/sun.png" />
      <Sunface src="/img/sunface.png" />

      <Link to="/">
        <SignBack />
      </Link>

      <PlantsControl>
        {worriesArticles?.map((item) => (
          <Control bottom={item.bottom} left={item.left} key={item.id}>
            <Message>{item.title}</Message>
            <Grass
              src="/img/singleGrass.png"
              height={getRandom(65, 120)}
              onClick={() => {
                setArticleTitle(item.title);
                setArticleContent(item.content);
                openModal();
              }}
            />
          </Control>
        ))}
        {cheerfulArticles?.map((item) => (
          <Control bottom={item.bottom} left={item.left} key={item.id}>
            <Message>{item.title}</Message>
            <Flower
              src="/img/flower.png"
              height={getRandom(65, 100)}
              onClick={() => {
                setArticleTitle(item.title);
                setArticleContent(item.content);
                openModal();
              }}
            />
          </Control>
        ))}
      </PlantsControl>
      <MessageModal
        showModal={showMessageModal}
        setShowModal={setShowMessageModal}
        content={(
          <Articles>
            <span>{articleTitle}</span>
            <p>{articleContent}</p>
          </Articles>
        )}
        bkc="rgba(0, 0, 0, 0)"
        width="450px"
        height="auto"
      />
      <Butterfly src="/img/Butterfly.png" alt="Butterfly" />
      <ButterflyBlue src="/img/Butterfly2.png" alt="Butterfly" />
    </Wrapper>
  );
}
