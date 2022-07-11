/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TiChevronLeftOutline, TiChevronRightOutline, TiTickOutline } from 'react-icons/ti';
import { IoArrowBackCircle } from 'react-icons/io5';
import firebaseStores from '../../firebase';
import './quiz.css';
import Modal from '../../components/quizModal';

function Card({
  id, title, content, handleScore,
}) {
  return (
    <div className="card" id={id}>
      <span>{content}</span>
      <h3>{title}</h3>
      <div className="options" id={id}>
        <label htmlFor=" ">
          <input
            name="score"
            type="radio"
            value={0}
            onChange={handleScore}
          />
          {' '}
          1 天以下
        </label>
        <label htmlFor=" ">
          <input
            name="score"
            type="radio"
            value={1}
            onChange={handleScore}
          />
          {' '}
          1 ~ 2 天
        </label>
        <label htmlFor=" ">
          <input
            name="score"
            type="radio"
            value={2}
            onChange={handleScore}
          />
          {' '}
          3 ~ 4 天
        </label>
        <label htmlFor=" ">
          <input
            name="score"
            type="radio"
            value={3}
            onChange={handleScore}
          />
          {' '}
          5 ~ 7 天
        </label>
      </div>
      <span>單位: 週</span>
    </div>
  );
}

function Carousel({ children, handleQuizResults }) {
  const [active, setActive] = useState(2);
  const count = React.Children.count(children);

  const MAX_VISIBILITY = 3;
  return (
    <div className="carousel">
      {active > 0 && <button type="button" className="nav left" onClick={() => setActive((i) => i - 1)}><TiChevronLeftOutline /></button>}
      {React.Children.map(children, (child, i) => {
        if (i === active) {
          const abs = Math.abs(active - i) / 3;
          const showCard = `translate3d(0,0,${abs * -30}rem)`;
          return (
            <div
              className="card-container"
              style={{
                '--active': 1,
                '--offset': (active - i) / 3,
                '--abs-offset': Math.abs(active - i) / 3,
                pointerEvents: 'auto',
                opacity: Math.abs(active - i) >= MAX_VISIBILITY ? '0' : '1',
                display: Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block',
                transform: showCard,
              }}
            >
              {child}
            </div>
          );
        }
        return (
          <div
            className="card-container"
            style={{
              '--active': i === active ? 1 : 0,
              '--offset': (active - i) / 3,
              '--abs-offset': Math.abs(active - i) / 3,
              pointerEvents: active === i ? 'auto' : 'none',
              opacity: Math.abs(active - i) >= MAX_VISIBILITY ? '0' : '1',
              display: Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block',
            }}
          >
            {child}
          </div>
        );
      })}
      {active < count - 1 && <button type="button" className="nav right" onClick={() => setActive((i) => i + 1)}><TiChevronRightOutline /></button>}
      {active === count - 1 && <button className="nav finish" type="button" onClick={() => handleQuizResults()}><TiTickOutline /></button>}
    </div>
  );
}

export default function QuizApp() {
  const [quiz, setQuiz] = useState([]);
  const [quizScore, setQuizScore] = useState([]);
  const [myQuizScore, setMyQuizScore] = useState(0);
  console.log(`當前總分:${myQuizScore}`);
  const [quizResults, setQuizResults] = useState([]);
  const [myQuizResult, setMyQuizResult] = useState('');
  const [showModal, setShowModal] = useState(false);

  const CARDS = quiz.length;

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  useEffect(() => {
    firebaseStores.getData('quiz_questions')
      .then((res) => res[0].data())
      .then((data) => {
        setQuiz(data.questions);
        setQuizScore(data.questions.map((item) => ({ id: item.id, score: 0 })));
      });
  }, []);

  useEffect(() => {
    firebaseStores.getData('quiz_results')
      .then((res) => res.map((item) => item.data()))
      .then((data) => setQuizResults(data[0].grades));
  }, []);

  const handleScore = (e) => {
    if (e.target.checked) {
      const targetId = Number(e.target.parentNode.parentNode.id);
      const score = Number(e.target.value);
      const newArr = quizScore.map((item) => {
        if (item.id === targetId) {
          return { id: targetId, score };
        }
        return item;
      });
      setQuizScore(newArr);
      const myScore = newArr.reduce((prev, curr) => (prev + curr.score), 0);
      setMyQuizScore(myScore);
    }
  };

  const handleQuizResults = () => {
    if (myQuizScore <= 8) {
      setMyQuizResult(quizResults[4].content);
    } else if (myQuizScore > 8 && myQuizScore <= 14) {
      setMyQuizResult(quizResults[3].content);
    } else if (myQuizScore > 14 && myQuizScore <= 18) {
      setMyQuizResult(quizResults[2].content);
    } else if (myQuizScore > 18 && myQuizScore <= 28) {
      setMyQuizResult(quizResults[1].content);
    } else if (myQuizScore > 28) {
      setMyQuizResult(quizResults[0].content);
    }
    console.log(`結果:${myQuizResult}`);
    openModal();
    // setShowQuizResult(true);
  };

  return (
    <div className="wrapping">
      <Link to="/" title="back"><IoArrowBackCircle className="nav back" /></Link>
      <Carousel handleQuizResults={handleQuizResults}>
        {[...new Array(CARDS)].map((_, i) => (
          <Card title={quiz[i].content} id={quiz[i].id} key={quiz[i].id} content={`題目 ${i + 1}/18`} handleScore={handleScore} />
        ))}

      </Carousel>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        myQuizResult={myQuizResult}
        myQuizScore={myQuizScore}
      />
    </div>
  );
}
