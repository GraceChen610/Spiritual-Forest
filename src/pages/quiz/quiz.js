/* eslint-disable import/no-unresolved */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import firebaseStores from '../../firebase';
import MapApp from '../mapApp';

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
background: white;
`;

const QuizQuestion = styled.div`
width:200px;
margin-bottom:1rem;
`;

const QuizResult = styled.div`
border-radius: 10px;
border: black 1px solid;
margin:1rem;
padding:1rem;
opacity:${(prop) => ((prop.show) ? 1 : 0)};
width:500px;
`;

const MapControl = styled.div`
position:absolute; 
top:300px;
width:1280px;
height: 800px;
opacity:${(prop) => ((prop.show) ? 1 : 0)};
`;

function Quiz() {
  const [quiz, setQuiz] = useState([]);
  const [quizScore, setQuizScore] = useState(0);
  const [quizResults, setQuizResults] = useState([]);
  const [myQuizResult, setMyQuizResult] = useState('');
  const [showQuizResult, setShowQuizResult] = useState(false);

  useEffect(() => {
    firebaseStores.getData('quiz_questions')
      .then((res) => res[0].data())
      .then((data) => setQuiz(data.questions));
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
      setShowQuizResult(true);
    }
  };
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
      <QuizResult show={showQuizResult}>
        {`親愛的~您的分數為${quizScore}`}
        <p>{ myQuizResult }</p>
      </QuizResult>
      <MapControl show={showQuizResult}>
        <MapApp />
      </MapControl>

    </div>
  );
}

export default Quiz;
