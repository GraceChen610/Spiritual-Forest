/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import './card.css';
import $ from 'jquery';
// eslint-disable-next-line no-unused-vars
import { useRef, useEffect, useState } from 'react';

export default function Card() {
  const numberLists = [
    ['A', '2', '3', '4', '5'],
    ['6', '7', '8', '9', '10'],
  ];

  const suits = [
    {
      icon: '♥',
      color: 'red',
    },
  ];

  const positions = [];
  const spacing = 20;

  const refContainer = useRef();
  const reshuffleBtn = useRef();

  useEffect(() => {
    // const container = document.getElementById('container');
    const container = refContainer.current;
    console.log(container);

    //   const shuffleBtn = document.getElementById('shuffle');
    const shuffleBtn = reshuffleBtn.current;
    console.log(shuffleBtn);

    function createCard({
      number, suit, suit_idx, list_idx, number_idx,
    }) {
      const cardContainer = document.createElement('div');
      const cardEl = document.createElement('div');

      cardContainer.classList.add('card-container');
      cardEl.classList.add('card');

      if (suit.color === 'red') {
        cardEl.classList.add('red');
      }

      const TOP = `${suit_idx * 175 + spacing * suit_idx + list_idx * 175 + spacing * list_idx}px`;
      const LEFT = `${number_idx * 120 + spacing * number_idx}px`;

      positions.push([TOP, LEFT]);
      cardContainer.style.top = TOP;
      cardContainer.style.left = LEFT;

      cardEl.innerHTML = `
    <figure class="back">
        <span class="number top">
            ${number}
        </span>
        <p class="suit">
            ${suit.icon}
        </p>
        <span class="number bottom">
            ${number}
        </span>
    </figure>
    <figure class="front"></figure>
  `;

      cardContainer.append(cardEl);

      container.appendChild(cardContainer);
    }

    // Create the cards

    suits.forEach((suit, suit_idx) => {
      numberLists.forEach((numbers, list_idx) => {
        numbers.forEach((number, number_idx) => {
          const cardDetails = {
            number,
            suit,
            suit_idx,
            list_idx,
            number_idx,
          };
          createCard(cardDetails);
        });
      });
    });

    const cardContainers = document.querySelectorAll('.card-container');
    cardContainers.forEach((cardContainer, idx) => {
      // setTimeout(() => {
      cardContainer.style.zIndex = 10 - idx;
      cardContainer.style.top = '50%';
      cardContainer.style.left = '41%';
      // }, 0);
    });

    shuffleBtn.addEventListener('click', () => {
      cardContainers.forEach((cardContainer, idx) => {
        setTimeout(() => {
          cardContainer.style.zIndex = 10 - idx;
          cardContainer.style.top = '50%';
          cardContainer.style.left = '41%';
        }, idx * 20);
      });

      // eslint-disable-next-line no-use-before-define
      setTimeout(shuffleBack, 10 * 20 + 500);
    });

    function shuffleBack() {
      // reset card
      const cards = document.getElementsByClassName('card');
      for (let i = 0; i < cards.length; i + 1) {
        cards[i].classList.remove('clicked');
      }

      // shuffle the positions
      // eslint-disable-next-line no-use-before-define
      shufflePositions();

      cardContainers.forEach((cardContainer, idx) => {
        setTimeout(() => {
          cardContainer.style.top = positions[idx][0];
          cardContainer.style.left = positions[idx][1];
        }, idx * 20);
      });
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function shufflePositions() {
    for (let i = 0; i < 1000; i + 1) {
      const rand1 = Math.floor(Math.random() * 10);
      const rand2 = Math.floor(Math.random() * 10);

      const temp = positions[rand1];
      positions[rand1] = positions[rand2];
      positions[rand2] = temp;
    }
  }

  $('.card-container .card').on('click', function () {
    // turn white
    $(this).toggleClass('clicked');
    // turn red
  });

  return (
    <div className="page-wrap">
      <div className="buttonContainer">
        <div className="center">
          <button ref={reshuffleBtn} className="shuffleBtn" id="shuffle" type="button"><span>紅心王后的邀請</span></button>
        </div>
      </div>
      <div ref={refContainer} className="container" id="container" />
    </div>
  );
}
