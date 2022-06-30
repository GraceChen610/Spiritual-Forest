import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Canvas from './canvas';
import Todos, { List, Edit, Title } from '../components/todo';
import bg from './recordBg.png';
import listBg from './listBg2.png';
import backfrog from './frog.png';
import firebaseStores from '../firebase';

const Wrapper = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    ${'' /* justify-content: space-around; */}
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
  ${'' /* justify-content: space-between; */}
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
  ${'' /* top:350px; */}
  bottom:1rem;
  left:30px;
  z-index:1;
`;

export default function Record() {
  const collectionID = 'THwS7xjxkLtR5N7t8CRA';
  const [data, setData] = useState([]);

  useEffect(() => {
    firebaseStores.getOneDoc('users', collectionID)
      .then((res) => res.data())
      .then((resdata) => setData(resdata.gratitude));
  }, []);

  return (
    <Wrapper>
      <Link to="/">
        <Backfrog src={backfrog} />
      </Link>
      <LeftControl>
        <Canvas />
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
