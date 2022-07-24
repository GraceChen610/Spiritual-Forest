import { useState, useEffect, useContext } from 'react';
import { BiMessageSquareAdd, BiMessageSquareMinus } from 'react-icons/bi';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import UserContext from '../userContext';
import firebaseStores from '../firebase';

const ItemControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  span{
    font-size: 1.1rem;
  }
`;

function Item({
  id, note, deleteData, data, keyName,
}) {
  const user = useContext(UserContext);

  function deleteItem() {
    deleteData((prev) => prev.filter((item) => item.id !== id));
    // eslint-disable-next-line prefer-const
    let newdata = data.filter((item) => item.id !== id);
    firebaseStores.updateDoc(user.uid, {
      [keyName]: newdata,
    });
  }

  return (
    <div>
      <ItemControl>
        <span>{note}</span>
        <BiMessageSquareMinus onClick={() => deleteItem()} style={{ fontSize: '1.8rem', color: '#491818', cursor: 'pointer' }} />
      </ItemControl>
    </div>
  );
}

export function List({ data, deleteData, keyName }) {
  return (
    <div style={{ overflowY: 'auto', height: '115px', marginBottom: '0.5rem' }}>
      {data?.map((item) => {
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
  const User = useContext(UserContext);
  const [note, setNote] = useState('');

  function uuidfun() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      (c) => {
        const r = (Math.random() * 16) || 0;
        const v = c === 'x' ? r : (r && 0x3) || 0x8;
        return v.toString(16).toUpperCase();
      },
    );
  }
  const uuid = uuidfun();

  function addItem(currNote) {
    add(
      (prevData) => (
        prevData ? ([{ content: currNote, id: uuid }, ...prevData])
          : ([{ content: currNote, id: uuid }])
      ),
      data
        ? firebaseStores.updateDoc(User.uid, {
          [keyName]: [{ content: currNote, id: uuid }, ...data],
        })
        : firebaseStores.updateDoc(User.uid, {
          [keyName]: [{ content: currNote, id: uuid }],
        }),

    );
    setNote('');
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Input type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="輸入內容後 請按＋" />
      <BiMessageSquareAdd onClick={() => addItem(note)} style={{ fontSize: '1.8rem', color: '#491818', cursor: 'pointer' }} />
    </div>
  );
}

export const Title = styled.span`
  display: block;
  font-size: 1.5em;
  margin-bottom:0.5rem;
  font-weight: bold;
`;

const ItemWapper = styled.div`
  width:65%;
  height:75%;
`;

export default function Todos() {
  const User = useContext(UserContext);

  const [data, setData] = useState([]);

  useEffect(() => {
    if (User) {
      firebaseStores.getOneDoc('users', User.uid)
        .then((res) => res.data())
        .then((resdata) => setData(resdata.goals));
    }
  }, [User]);

  return (
    <ItemWapper>
      <Title>今日目標</Title>
      <List data={data} deleteData={setData} keyName="goals" />
      <Edit data={data} add={setData} keyName="goals" />
    </ItemWapper>
  );
}

Item.propTypes = {
  id: PropTypes.number.isRequired,
  note: PropTypes.string.isRequired,
  deleteData: PropTypes.func.isRequired,
  data: PropTypes.arrayOf({
    id: PropTypes.number,
  }).isRequired,
  keyName: PropTypes.string.isRequired,
};

List.propTypes = {
  deleteData: PropTypes.func.isRequired,
  data: PropTypes.arrayOf({ id: PropTypes.number }).isRequired,
  keyName: PropTypes.string.isRequired,
};

Edit.propTypes = {
  add: PropTypes.func.isRequired,
  data: PropTypes.arrayOf({
    id: PropTypes.number,
  }).isRequired,
  keyName: PropTypes.string.isRequired,
};
