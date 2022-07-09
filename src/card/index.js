/* eslint-disable no-console */
/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { ReactMixitup } from 'react-mixitup';
import { shuffle, range } from 'lodash';
// import styled from 'styled-components/macro';
import firebaseStores from '../firebase';
import FlipCard from './FlipCard';
import cardPageBg from './cardPageBg2.gif';

// const CardControl = styled.div`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     border-radius: 10px;
//     border: black 1px solid;
//     margin:1rem;
//     padding:1rem;
//     font-size:14px;
//     width:20px;
//     min-width: 200px;
//     a{
//       color: black;
//     }
// `;

export default function Shuffle() {
  // card
  const [cardMap, setCardMap] = useState({});
  const [flipped, set] = useState(null);
  const [play, setPlay] = useState(false);
  console.log(cardMap);

  useEffect(() => {
    firebaseStores.getData('cards')
      .then((res) => res[0].data())
      .then((data) => {
        // [{ title: '' }] => { 1: { title: '' } }
        const result = data.content.reduce((arr, item, index) => {
          // eslint-disable-next-line no-param-reassign
          arr[index] = item;
          return arr;
        }, {});
        console.log({ result });
        setCardMap(result);
        setPlay(true);
      });
  }, []);

  // Shuffle
  const NUM_CELLS = 10;
  const [keys, setKeys] = useState(() => range(NUM_CELLS));

  const goShuffle = () => {
    setKeys(shuffle(keys));
  };

  useEffect(() => {
    if (!play) return;
    goShuffle();
    setTimeout((() => goShuffle()), 800);
    setTimeout((() => goShuffle()), 1600);
    setPlay(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play]);

  const TRANSITION_DURATION = 250;

  return (
    <div>
      {/* <button type="button" onClick={goShuffle}>Shuffle</button> */}
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
              height: '350px',
              ...style,
            }}
            item={cardMap[key]}
          />
        )}
        renderWrapper={(style, ref, children) => (
          // const squareWidth = (245 + 4 * 3);
          // const wrapperWidth = squareWidth
          //     * Math.ceil(Math.sqrt(NUM_CELLS));
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              // if wrapper height or width never changes
              // we can have set boxSizing to anything
              boxSizing: 'content-box',
              width: '100vw',
              height: '100vh',
              // border: '1px solid red',
              background: `url(${cardPageBg})`,
              padding: '0',
              ...style,
            }}
            ref={ref}
          >
            {children}
          </div>
        )}
      />
    </div>
  );
}
