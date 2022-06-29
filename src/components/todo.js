/* eslint-disable no-bitwise */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import firebaseStores from '../firebase';
// import uuid from './uuid';

const collectionID = 'THwS7xjxkLtR5N7t8CRA';

function Item({
  id, note, deleteData, data,
}) {
  function deleteItem() {
    deleteData((prev) => prev.filter((item) => item.id !== id));
    // eslint-disable-next-line prefer-const
    let newdata = data.filter((item) => item.id !== id);
    firebaseStores.updateDoc(collectionID, {
      goals: newdata,
    });
  }

  return (
    <div className="item">
      <div style={{ display: 'flex' }}>
        <p>{note}</p>
        <button type="button" onClick={deleteItem} className="remove">刪除</button>
      </div>
    </div>
  );
}

function List({ data, deleteData }) {
  return (
    <div style={{ overflowY: 'scroll', height: '250px' }}>
      {data.map((item) => {
        const { content, id } = item;
        return (
          <Item
            key={id}
            id={id}
            note={content}
            deleteData={deleteData}
            data={data}
          />
        );
      })}
    </div>
  );
}

function Edit({ add, data }) {
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
        goals: [{ content: currNote, id: uuid }, ...data],
      }),
    );
    setNote('');
  }

  return (
    <div>
      <h2>今日目標</h2>
      <input type="text" value={note} onChange={(e) => setNote(e.target.value)} />
      <button type="button" onClick={() => addItem(note)}>
        新增
      </button>
    </div>
  );
}

export default function Todos() {
  const [data, setData] = useState([]);

  useEffect(() => {
    firebaseStores.getOneDoc('users', collectionID)
      .then((res) => res.data())
      .then((resdata) => setData(resdata.goals));
  }, []);

  return (
    <div className="app">
      <Edit data={data} add={setData} />
      <List data={data} deleteData={setData} />
    </div>
  );
}
