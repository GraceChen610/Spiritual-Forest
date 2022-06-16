import './App.css';
import {
  // eslint-disable-next-line no-unused-vars
  collection, getDocs, addDoc, doc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import firebaseStores from './firebase';

const QuizWapper = styled.div`
display:flex;
overflow-y: scroll;
`;

const QuizContent = styled.div`
display:flex;
flex-direction: column;
border-radius: 10px;
border: black 1px solid;
margin:1rem;
padding:1rem;
`;

const QuizQuestion = styled.div`
width:200px;
margin-bottom:1rem;
`;

const QuizResult = styled.div`
padding:1rem;
opacity:${(prop) => ((prop.show) ? 1 : 0)};
`;

function App() {
  const [quiz, setQuiz] = useState([]);
  const [quizScore, setQuizScore] = useState(0);
  const [quizResults, setQuizResults] = useState([]);
  const [myQuizResult, setMyQuizResult] = useState('');

  useEffect(() => {
    firebaseStores.getData('quiz_questions')
      .then((res) => res[0].data())
      .then((data) => setQuiz(data.questions));
    // window.localStorage.setItem('quiz', quiz);
    // const newQuiz = [window.localStorage.getItem('quiz')];
  }, []);

  useEffect(() => {
    firebaseStores.getData('quiz_results')
      .then((res) => res.map((item) => item.data()))
      .then((data) => setQuizResults(data[0].grades));
  }, []);

  const handleScore = (e) => {
    if (e.target.checked) {
      setQuizScore((prevQuizScore) => (
        prevQuizScore + Number(e.target.value)));
    }
    e.target.parentNode.parentNode.remove();
    console.log(`獲得分數${e.target.value}`);

    const quizWapper = document.querySelector('#quizWapper');

    if (quizWapper.children.length <= 0) {
      if (quizScore <= 8) {
        setMyQuizResult(quizResults[4].content);
      } else if (quizScore > 8 && quizScore <= 14) {
        setMyQuizResult(quizResults[3].content);
      } else if (quizScore > 14 && quizScore <= 18) {
        setMyQuizResult(quizResults[2].content);
      } else if (quizScore > 18 && quizScore <= 28) {
        setMyQuizResult(quizResults[1].content);
      } else if (quizScore > 28) {
        setMyQuizResult(quizResults[0].content);
      }
      // eslint-disable-next-line no-alert
      // alert(`親愛的~您的分數為${quizScore}
      // ${myQuizResult}`);
    }
  };
  console.log(`累計分數${quizScore}`);
  return (
    <div className="App">
      <QuizWapper id="quizWapper">
        {quiz.map((item) => (
          <QuizContent key={item.id}>
            <QuizQuestion>{item.content}</QuizQuestion>
            <label htmlFor=" ">
              <input
                name="score"
                type="radio"
                value={0}
                onChange={handleScore}
              />
              1 天以下
            </label>
            <label htmlFor=" ">
              <input
                name="score"
                type="radio"
                value={1}
                onChange={handleScore}
              />
              1~2 天
            </label>
            <label htmlFor=" ">
              <input
                name="score"
                type="radio"
                value={2}
                onChange={handleScore}
              />
              3~4 天
            </label>
            <label htmlFor=" ">
              <input
                name="score"
                type="radio"
                value={3}
                checked={quizScore === '3'}
                onChange={handleScore}
              />
              5~7 天
            </label>
          </QuizContent>
        ))}
      </QuizWapper>
      <QuizResult show>
        {`親愛的~您的分數為${quizScore}
      ${myQuizResult}`}
      </QuizResult>
    </div>
  );
}

export default App;
