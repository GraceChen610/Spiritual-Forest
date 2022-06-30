/* eslint-disable no-bitwise */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import firebaseStores from '../firebase';
// import uuid from './uuid';

const collectionID = 'THwS7xjxkLtR5N7t8CRA';

const ItemControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Button = styled.button`
  display: flex; 
  justify-content: center; 
  align-items: center; 
`;

function Item({
  id, note, deleteData, data, keyName,
}) {
  function deleteItem() {
    deleteData((prev) => prev.filter((item) => item.id !== id));
    // eslint-disable-next-line prefer-const
    let newdata = data.filter((item) => item.id !== id);
    firebaseStores.updateDoc(collectionID, {
      [keyName]: newdata,
    });
  }

  return (
    <div>
      <ItemControl>
        <span>{note}</span>
        <Button onClick={() => deleteItem()}>－</Button>
      </ItemControl>
    </div>
  );
}

export function List({ data, deleteData, keyName }) {
  return (
    <div style={{ overflowY: 'scroll', height: '150px', 'margin-bottom': '0.5rem' }}>
      {data.map((item) => {
        const { content, id } = item;
        return (
          <Item
            key={id}
            id={id}
            note={content}
            deleteData={deleteData}
            data={data}
            keyName={keyName}
          />
        );
      })}
    </div>
  );
}

const Input = styled.input`
width:70%;
border-radius: 5px;
border:0;
padding:2px 10px;
background: #d5bfa4;
height:1.25rem;
`;

export function Edit({ add, data, keyName }) {
  const [note, setNote] = useState('');

  function uuidfun() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16).toUpperCase();
      },
    );
  }
  const uuid = uuidfun();

  function addItem(currNote) {
    add(
      (prevData) => [{ content: currNote, id: uuid }, ...prevData],
      firebaseStores.updateDoc(collectionID, {
        [keyName]: [{ content: currNote, id: uuid }, ...data],
      }),
    );
    setNote('');
  }

  return (
    <div style={{ display: 'flex', 'justify-content': 'space-between', 'align-items': 'center' }}>
      <Input type="text" value={note} onChange={(e) => setNote(e.target.value)} />
      <Button onClick={() => addItem(note)}>
        ＋
      </Button>
    </div>
  );
}

export const Title = styled.span`
    display: block;
    font-size: 1.5em;
    margin-bottom:0.5rem;
    font-weight: bold;
`;

export default function Todos() {
  const [data, setData] = useState([]);

  useEffect(() => {
    firebaseStores.getOneDoc('users', collectionID)
      .then((res) => res.data())
      .then((resdata) => setData(resdata.goals));
  }, []);

  return (
    <div>
      <Title>今日目標</Title>
      <List data={data} deleteData={setData} keyName="goals" />
      <Edit data={data} add={setData} keyName="goals" />
    </div>
  );
}
