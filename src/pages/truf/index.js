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
  ${'' /* border: 1px solid; */}
  height: 15%;
  position: absolute;
  bottom: 0;
`;

const Control = styled.div`
 position: absolute;
 bottom: ${(props) => props.bottom || 0}%;
 left: ${(props) => props.left || 0}%;
  ${'' /* border: 1px solid black; */}

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

// const Apple = styled.img`
//  position: absolute;
//  bottom: ${(props) => props.bottom || 230}px;
//  right: ${(props) => props.left || 0}px;
//  width:200px;
//  height:300px;
//  ${'' /* Y:230,530
//  X:0,200 */}
//  ${'' /* background:white; */}
// `;

const Articles = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    margin:1rem;
    padding:1.5rem;
    font-size:14px;
    ${'' /* border: black 1px dotted; */}
    background: #EDE8D6;
    background: linear-gradient(130deg, #D7FFFE, #ace0f9, #ace0c1);

    span{
      font-size: 1.4rem;
      font-weight: bold;
      color: #683F39;
      margin-bottom: 1rem;
    }

    p{
      text-align: justify;
      line-height: 1.8rem;
      font-size: 1.1rem;
    }
`;

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function getRound(x, y, r) {
//     let x2 = x * x;
//     let y2 = y * y;
//     let newRound = r * r * 3.14;
//     if (x2 * y2 <= newRound) {
//       return `x=${x} , y=${y}`;
//     }else{
//         getRound(x, y, r);
//     }
//   }
//   getRound(getRandom(0, 10), getRandom(0, 10), 25);

const SignBack = styled.div`
${'' /* border: 1px solid; */}
  position: absolute;
  bottom: 30px;
  right: 50px;
  z-index: 9999;
  display:flex;
  justify-content: center;
  width: 10%;
  height:23%;
  box-sizing: border-box;
  background:url("/img/sign.png") no-repeat bottom LEFT / 100%;
  cursor: pointer;

 ::after{
   content: 'Back >';
   color: white;
   height: 30%;
   padding-top: 32%;
   padding-left: 10%;
   font-size: 1.2rem;
   letter-spacing: 3px;
   text-shadow: black 0.1em 0.1em 0.2em;
   ${'' /* border: 1px solid; */}

  }

  &:hover::after{
  font-size: 1.5rem;
  
  }
  @media screen and (max-width: 1280px) { 
    height:18%;
  }
  @media screen and (max-width: 1024px) { 
    height:15%;
  }
  @media screen and (max-width: 768px) { 
    height:12%;
    ::after{
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

// eslint-disable-next-line no-unused-vars
const Suneye = styled.div`
  position: absolute;
    top: 100px ;
    left:130px;
    z-index: 2;
    width: 10px;
    height: 10px;
    padding-bottom: 0.5%;
    border-radius: 50%;
    background: black;
    ${'' /* animation: blink 1s ease-in-out 0s infinite alternate forwards; */}
`;

export default function Truf() {
  const User = useContext(UserContext);
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
    if (User === '') {
      // eslint-disable-next-line no-console
      console.log('Loading...');
      Toast.fire({
        title: '稍等片刻，光速抓取資料中...',
      });
    }
    if (User === null) {
      Toast.fire({
        title: '親愛的~登入才能發文與綠植互動喔~',
      });
      setTimeout(() => {
        navigate('/');
      }, 4000);
    }
    if (User) {
      firebaseStores.getArticles('cheerful_articles', User.uid)
        .then((res) => setCheerfulArticles(
          (res.map((item) => ({ ...item, bottom: getRandom(0, 100), left: getRandom(0, 90) }))),
        ));
      firebaseStores.getArticles('worries_articles', User.uid)
        .then((res) => setWorriesArticles(
          (res.map((item) => ({ ...item, bottom: getRandom(0, 100), left: getRandom(0, 90) }))),
        ));
    }
  }, [User, navigate]);

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
        width="400px"
        height="auto"
      />
    </Wrapper>
  );
}
