/* eslint-disable import/no-unresolved */
import { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import FlipCard from './FlipCard';
import firebaseStores from '../firebase';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default function Card() {
  // eslint-disable-next-line no-unused-vars
  const [cards, setCards] = useState([]);
  // spring
  const [flipped, set] = useState(null);

  useEffect(() => {
    firebaseStores.getData('cards')
      .then((res) => res[0].data())
      .then((data) => setCards(data.content));
  }, []);

  return (
    <Wrapper>

      {
        cards.map((item, index) => (
          <FlipCard item={item} setfun={() => set(index)} flipped={flipped === index} />

        ))
      }

    </Wrapper>
  );
}
