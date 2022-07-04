/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { ReactMixitup } from 'react-mixitup';
import { shuffle, range } from 'lodash';
import styled from 'styled-components/macro';
import firebaseStores from '../firebase';
import FlipCard from './FlipCard';
import Card from './card';

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
    width:20px;
    min-width: 200px;
    a{
      color: black;
    }
`;

// [{ title: '' }]
// { 1: { title: '' } }
export default function Shuffle() {
  // card
  const [cards, setCards] = useState([]);
  const [cardMap, setCardMap] = useState({});
  const [flipped, set] = useState(null);
  console.log(cardMap);

  useEffect(() => {
    firebaseStores.getData('cards')
      .then((res) => res[0].data())
      .then((data) => {
        const result = data.content.reduce((arr, item, index) => {
          // eslint-disable-next-line no-param-reassign
          arr[index] = item;
          return arr;
        }, {});
        console.log({ result });
        setCardMap(result);
      });
  }, []);

  // Shuffle
  const NUM_CELLS = 10;
  const [keys, setKeys] = useState(() => range(NUM_CELLS));

  const goShuffle = () => {
    setKeys(shuffle(keys));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => { goShuffle(); }, []);

  const TRANSITION_DURATION = 250;
  console.log(cards);

  return (
    <div>
      <button type="button" onClick={goShuffle}>Shuffle</button>
      {}
      <ReactMixitup
        keys={keys}
          // dynamicDirection is off because keys.length never changes
        dynamicDirection="off"
        transitionDuration={TRANSITION_DURATION}
        renderCell={(key, style, ref) => cardMap[key] && (
          <FlipCard
            key={key}
            innerRef={ref}
            setfun={() => { set(key); }}
            flipped={flipped === key}
            style={{
              transition: `transform ${TRANSITION_DURATION}ms ease`,
              ...style,
            }}
            item={cardMap[key]}
          />
          //   {/* <p>{cardMap[key]?.title}</p>
          //   <p>{cardMap[key]?.content}</p>
          //   <a href={cardMap[key]?.resource} target="_blank" title="更多資源" rel="noreferrer">更多資源</a> */}
          // </FlipCard>
        )}
        renderWrapper={(style, ref, children) => {
          const squareWidth = (250 + 4 * 3);
          const wrapperWidth = squareWidth
              * Math.ceil(Math.sqrt(NUM_CELLS));
          return (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                // if wrapper height or width never changes
                // we can have set boxSizing to anything
                boxSizing: 'content-box',
                width: wrapperWidth,
                height: '100%',
                // border: '1px solid red',
                padding: '12px 0',
                ...style,
              }}
              ref={ref}
            >
              {children}
            </div>
          );
        }}
      />
    </div>
  );
}
