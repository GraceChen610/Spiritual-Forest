/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components/macro';
import { useSpring, a } from 'react-spring';

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
    min-width: 250px;
    cursor: pointer;
    a{
      color: black;
    }
`;

function FlipCard({
  setfun, item, flipped, innerRef, style,
}) {
// console.log(flipped)

  const { transform, opacity, background } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 0 : 180}deg) scale(${flipped ? 1 : 1})`,
    config: { mass: 1, tension: 300, friction: 120 },
    // background: flipped ? 'white' : 'blue',
  });

  return (
    <div onClick={setfun} ref={innerRef} style={style}>
      <a.div
        style={{
          opacity: opacity.to((o) => 1 - o), transform, backgroundColor: 'black', position: 'relative', height: '245px', 'border-radius': '10px', margin: '5px',
        }}
      >
        <CardControl />
      </a.div>
      <a.div
        style={{
          opacity,
          transform,
          background,
          position: 'relative',
          top: '-265px',
        }}
      >
        <CardControl>
          <p>{item.title}</p>
          <p>{item.content}</p>
          <a href={item.resource} target="_blank" title="更多資源" rel="noreferrer">更多資源</a>
        </CardControl>
      </a.div>
    </div>
  );
}

export default FlipCard;
