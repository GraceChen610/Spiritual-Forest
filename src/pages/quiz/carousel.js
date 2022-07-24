import React, { useState } from 'react';
import { TiChevronLeftOutline, TiChevronRightOutline } from 'react-icons/ti';
import styled from 'styled-components/macro';
import { createGlobalStyle } from 'styled-components';
import PropTypes from 'prop-types';

const CARDS = 10;
const maxVisibility = 3;

const GlobalStyle = createGlobalStyle`
    body {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-image: linear-gradient(45deg, #8B5CF6, #EC4899);
    font-family: 'Montserrat', sans-serif;
    }

    * {
    box-sizing: border-box;
    }
`;

const CarouselWapper = styled.div`
  position: relative;
  width: 23rem;
  height: 23rem;
  perspective: 500px;
  transform-style: preserve-3d;
`;

const CardContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events:${(props) => (props.active ? 'auto' : 'none')};
  transform: ${(props) => `
    rotateY(calc(${props.offset} * 50deg))
    scaleY(calc(1 + ${props.absOffset} * -0.4))
    translateZ(calc(${props.absOffset} * -30rem))
    translateX(calc(${props.offset} / ${props.absOffset} * -5rem))`
};
  filter: ${(props) => `blur(calc(${props.absOffset} * 1rem))`
};
  transition: all 0.3s ease-out;
`;

const CardStyle = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
  background-color: ${(props) => `hsl(280deg, 40%, calc(100% - ${props.absOffset} * 50%))`};
  border-radius: 1rem;
  color: #9CA3AF;
  text-align: justify;
  transition: all 0.3s ease-out;
  
  h2 {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    margin: 0 0 0.7em;
    color: #1F2937;
  }
  
  p, h2 {
    transition: all 0.3s ease-out;
    opacity: ${(props) => (props.active ? 1 : 0)};
  }
`;

const ButtonLeft = styled.button`
  color: white;
  font-size: 5rem;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  z-index: 2;
  cursor: pointer;
  user-select: none;
  background: unset;
  border: unset;
  transform: translateX(-100%) translatey(-50%);
`;

const ButtonRight = styled(ButtonLeft)`
  right: 0;
  transform: translateX(100%) translatey(-50%);
`;

function Card({ title, content }) {
  return (
    <CardStyle>
      <h2>{title}</h2>
      <p>{content}</p>
    </CardStyle>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

function Carousel({ children }) {
  const [active, setActive] = useState(2);
  const count = React.Children.count(children);

  return (
    <CarouselWapper>

      {active > 0 && (
      <ButtonLeft onClick={() => setActive((i) => i - 1)}>
        <TiChevronLeftOutline />
      </ButtonLeft>
      )}

      {React.Children.map(children, (child, i) => (
        <CardContainer
          style={
            {
              transform: (i === active) ? 'translate:(0,0)' : '',
              opacity: (Math.abs(active - i) >= maxVisibility) ? '0' : '1',
              display: (Math.abs(active - i) > maxVisibility) ? 'none' : 'block',
              'pointer-events': active === i ? 'auto' : 'none',
            }
           }
          active={i === active ? 1 : 0}
          offset={(active - i) / 3}
          absoffset={Math.abs(active - i) / 3}
        >

          {child}
        </CardContainer>
      ))}

      {active < count - 1 && (
      <ButtonRight onClick={() => setActive((i) => i + 1)}>
        <TiChevronRightOutline />
      </ButtonRight>
      )}

    </CarouselWapper>
  );
}

export default function QuizApp() {
  return (
    <>
      <GlobalStyle />
      <Carousel>
        {[...new Array(CARDS)].map((_, i) => (
          <Card title={`Card ${i + 1}`} content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
        ))}
      </Carousel>
    </>
  );
}

Carousel.propTypes = {
  children: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
};
