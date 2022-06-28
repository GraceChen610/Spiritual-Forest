import { useEffect, useState } from 'react';
import styled from 'styled-components';
import firebaseStores from '../firebase';

const Wrapper = styled.div`
  display: flex;
  ${'' /* justify-content: space-evenly; */}
  ${'' /* width:100vw; */}
  flex-wrap: wrap;
`;

const CardControl = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: black 1px solid;
    margin:1rem;
    padding:1rem;
    font-size:14px;
    width:200px;
    min-width: 100px;
`;

export default function Card() {
  // eslint-disable-next-line no-unused-vars
  const [cards, setCards] = useState([]);

  useEffect(() => {
    firebaseStores.getData('cards')
      .then((res) => res[0].data())
      .then((data) => setCards(data.content));
  }, []);

  return (
    <Wrapper>

      {
        cards.map((item) => (
          <CardControl>
            <p>{item.title}</p>
            <p>{item.content}</p>
            <a href={item.resource} target="_blank" title="更多資源" rel="noreferrer">更多資源</a>
          </CardControl>
        ))
      }

    </Wrapper>
  );
}
