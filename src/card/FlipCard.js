/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components/macro';
import { useSpring, a } from 'react-spring';
import cardBg from './cardBg.gif';

const CardControl = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    margin:1rem;
    padding:1rem;
    font-size:14px;
    height: 264px;
    width: 192px;
    border: black 1px dotted;
    background: #EDE8D6;
    cursor: pointer;
    span{
      font-size: 1.2rem;
      font-weight: bold;
      color: #683F39;
    }

    p{
      text-align: justify;
      line-height: 1.2rem;
    }

    a{
      color: black;

      button{
        padding: 5px 24px;
        background: #DB8758;
        color: #fff;
        border: none;
        border-radius: 10px;
        width: 192px;
        cursor: pointer;
        font-size: 0.7rem;
      }
    }

`;

const CardBack = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin:1rem;
  padding:1rem;
  font-size:14px;
  height: 264px;
  width: 192px;
  background: url(${cardBg}) no-repeat right top / contain ;
`;

function FlipCard({
  setfun, item, flipped, innerRef, style,
}) {
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
          transform,
          opacity: 'opacity.to((o) => 1 - o)',
        }}
      >
        <CardBack />
      </a.div>
      <a.div
        style={{
          opacity,
          transform,
          background,
          position: 'relative',
          top: '-326px',
        }}
      >
        <CardControl>
          <span>{item.title}</span>
          <p>{item.content}</p>
          <a href={item.resource} target="_blank" title="更多資源" rel="noreferrer"><button type="button">更多資源</button></a>
        </CardControl>
      </a.div>
    </div>
  );
}

export default FlipCard;
