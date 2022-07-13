import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoArrowBackCircle } from 'react-icons/io5';
import { ReactMixitup } from 'react-mixitup';
import { shuffle, range } from 'lodash';
import firebaseStores from '../firebase';
import FlipCard from './FlipCard';

export default function Shuffle() {
  // card
  const [cardMap, setCardMap] = useState({});
  const [flipped, set] = useState(null);
  const [play, setPlay] = useState(false);

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
    setTimeout((() => goShuffle()), 500);
    setTimeout((() => goShuffle()), 1000);
    setPlay(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play]);

  const TRANSITION_DURATION = 250;

  return (
    <div>
      {/* <button type="button" onClick={goShuffle}>Shuffle</button> */}
      <Link to="/" title="back"><IoArrowBackCircle className="nav back" style={{ left: '30px', bottom: '35px' }} /></Link>
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
              background: 'url(/img/cardBg.png) no-repeat right top / 100% 100%',
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
