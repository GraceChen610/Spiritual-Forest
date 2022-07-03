/* eslint-disable max-len */
import { useState } from 'react';
import { ReactMixitup } from 'react-mixitup';
import { shuffle, range } from 'lodash';
import Card from '../pages/card';

export default function Shuffle() {
  const NUM_CELLS = 9;
  const [keys, setKeys] = useState(() => range(NUM_CELLS));

  const goShuffle = () => {
    setKeys(shuffle(range(NUM_CELLS)));
  };

  const TRANSITION_DURATION = 250;

  return (
    <div>
      <button type="button" onClick={goShuffle}>Shuffle</button>
      <ReactMixitup
        keys={keys}
          // dynamicDirection is off because keys.length never changes
        dynamicDirection="off"
        transitionDuration={TRANSITION_DURATION}
        renderCell={(key, style, ref) => (
          <Card
            key={key}
            ref={ref}
            style={{
            //   width: 48,
            //   height: 48,
              border: '1px solid blue',
              margin: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              // transition-duration must be
              // same as transitionDuration prop
              transition: `transform ${TRANSITION_DURATION}ms ease`,
              ...style,
            }}
          >
            {/* <Card key={key}> {key} </Card> */}
          </Card>
        )}
        renderWrapper={(style, ref, children) => {
          const squareWidth = (800 + 4 * 3);
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
                height: wrapperWidth,
                border: '1px solid red',
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
// const getItems = () => shuffle(range(9)).map((s) => String(s));

// const duration = 300;

// export default function Shuffle() {
//   const [items, setItems] = useState(getItems());

//   const shuffleItems = () => {
//     setItems(getItems());
//   };

//   return (
//     <div
//       style={{
//         flex: 1,
//         width: '100%',
//         flexDirection: 'column',
//         alignItems: 'center',
//         position: 'relative',
//         height: 720,
//         paddingTop: 16,
//       }}
//     >
//       <div style={{ display: 'flex', justifyContent: 'center' }}>
//         <button type="button" className="button button--primary" onClick={shuffleItems}>
//           Shuffle
//         </button>
//       </div>
//       <ReactMixitup
//         keys={items}
//         renderCell={(key, style, ref) => (
//           <div
//             key={key}
//             ref={ref}
//             style={{
//               padding: '8px',
//               transition: `transform ${duration}ms linear`,
//               ...style,
//             }}
//           >
//             <Card
//               className="square"
//             >
//               {key}
//             </Card>
//           </div>
//         )}
//         dynamicDirection="off"
//         transitionDuration={duration}
//         renderWrapper={(style, ref, children) => (
//           <div
//             style={{
//               transition: `height ${duration}ms ease`,
//               display: 'flex',
//               flexWrap: 'wrap',
//               alignItems: 'flex-start',
//               justifyContent: 'center',
//               width: '75%',
//               margin: 'auto',
//               padding: '16px',
//               maxWidth: '1080px',
//               ...style,
//             }}
//             ref={ref}
//           >
//             {children}
//           </div>
//         )}
//       />
//     </div>
//   );
// }
