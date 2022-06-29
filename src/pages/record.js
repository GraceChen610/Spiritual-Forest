import styled from 'styled-components';
import Canvas from './canvas';
import Todos from '../components/todo';

const Wrapper = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: space-between;
`;

const RightControl = styled.div`
    display: flex;
    flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const TodoList = styled.div`
height:50%;
border: 1px solid black;
`;

const Goal = styled.div`

`;

export default function Record() {
  return (
    <Wrapper>
      <Canvas />
      <RightControl>
        <TodoList><Todos /></TodoList>
        <Goal>222</Goal>
      </RightControl>
    </Wrapper>
  );
}
