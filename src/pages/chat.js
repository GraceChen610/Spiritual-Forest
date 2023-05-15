/* eslint-disable no-bitwise */
/* eslint-disable no-mixed-operators */
import { useState } from 'react';
import { Configuration } from 'openai';
import styled from 'styled-components/macro';

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: #353740;
  height:100%;
`;

const H3 = styled.h3`
  font-size: 2rem;
  font-weight: bold;
  color: #683F39;
  margin-bottom: 1.5rem;
`;

const FormDiv = styled.div`
  display: flex;
  width: 80vw;
 margin-bottom: 1rem;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid #10a37f;
  border-radius: 4px;
  margin-bottom: 12px;
  outline-color: #10a37f;
  width: 80vw;
  z-index: 3;
  ::placeholder {
    color: #8e8ea0;
    opacity: 1;
  }
`;

const Button = styled.button`
  padding: 12px ;
  margin-left: 12px;
  color: #fff;
  background-color: #10a37f;
  border: none;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  height: 2.8rem;
  min-width: 10vw;
  z-index: 3;

`;

const MessageControl = styled(Main)`
  width:80vw;
  height: 70%;
  padding: 1rem;
  top: 15%;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey; 
    border-radius: 10px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #66aa99; 
    border-radius: 10px;
  } 
`;

const Message = styled.span`
    padding: 0.5rem 0.8rem;
    border-radius: 8px;
    margin: 8px 0;
    display: inline-block;
  ${'' /* background-color: aliceblue; */}
  background-color: ${(props) => (props.aiRes ? '#ffe6ea' : 'aliceblue')};
  align-self: ${(props) => (props.aiRes ? 'flex-start' : 'flex-end')};
`;

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

function generatePrompt(animal) {
  return `You are a psychiatrist with relevant knowledge and experience in psychological counseling. You can provide friendly, considerate and empathetic suggestions based on patients’ problems, and help patients divert their attention and adjust their emotions.
  
    patient: 我心情不好
    AI Doctor: 親愛的，發生甚麼事了? 你需要幫忙嗎?
  
    patient: 我感覺很差
    AI Doctor: 或許可以嘗試看影片、聽音樂、回想一些美好的事情，轉移注意力，把焦點集中在開心的事情上
  
    patient: ${animal}
    AI Doctor:`;
}

// eslint-disable-next-line prefer-const
let uuid = () => {
  let d = Date.now();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now(); // use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
};

export default function Chat() {
  const [animalInput, setAnimalInput] = useState('');
  const [messages, setMessages] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (animalInput.length === 0) {
      alert('請輸入內容');
      return;
    }

    try {
      const completion = {
        prompt: generatePrompt(animalInput),
        model: 'text-davinci-003',
        temperature: 0.8,
        max_tokens: 350,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.6,
        stop: [' Human:', ' AI:'],
      };
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${configuration.apiKey}`,
        },
        body: JSON.stringify(completion),
      };

      const response = await fetch('https://api.openai.com/v1/completions', requestOptions);

      const data = await response.json();

      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      const res = data.choices[0].text;
      setMessages((prev) => [...prev, { userMsg: ` ${animalInput}`, aiMsg: `ai: ${res}` }]);
      setAnimalInput('');
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <Main>
      <title>聊天功能</title>

      <H3>Chat with AI Doctor</H3>

      <MessageControl>
        {messages?.map((item) => (
          <>
            <Message key={() => uuid()}>{item.userMsg}</Message>
            <Message key={uuid()} aiRes>{item.aiMsg}</Message>
          </>
        ))}
      </MessageControl>

      <FormDiv>
        <Input
          type="text"
          name="content"
          placeholder="請輸入內容"
          value={animalInput}
          onChange={(e) => setAnimalInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key !== 'Enter') return;
            handleSubmit(e);
          }}
        />

        <Button
          type="button"
          onClick={(e) => handleSubmit(e)}
        >
          送出訊息
        </Button>
      </FormDiv>
    </Main>
  );
}
