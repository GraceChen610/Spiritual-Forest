/* eslint-disable no-console */
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  setPersistence, browserSessionPersistence,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import styled from 'styled-components/macro';
import firebaseStores, { auth } from '../firebase';
import Toast from '../components/toastAlert';
import UserContext from '../userContext';

const Wrapper = styled.div`
  `;

const ControlR = styled.div`
 position: absolute;
 left: 500px;
 top: 255px;
 ${'' /* border: 1px solid; */}

 input{
  margin-bottom:2.8rem;
  width: 176px;
  border-radius: 5px;
  height: 1.3rem;
  :last-of-type {
    margin-top: 6px;
  }
 }

 span{
  position: absolute;
  top: 220px;
  left: 15px;
  width: 70px;
  height:35px;
  opacity: 0;
  border: 1px solid;
  cursor: pointer;
 }
 `;

const ControlL = styled.div`

width: 300px;
    position: absolute;
    left: 111px;
    top: 368px;
    

  input{
  margin-bottom:3.55rem;
  width: 177px;
  border-radius: 5px;
  height:1.4rem;

 }

 span{
  position: absolute;
  top: 150px;
  left: 55px;
  width: 70px;
  height:35px;
  opacity: 0;
  border: 1px solid;
  cursor: pointer;
 }
 `;

// eslint-disable-next-line react/prop-types
function Login({ setShowModal }) {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userName, setUserName] = useState('');
  const User = useContext(UserContext);
  const navigate = useNavigate();

  function register(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const { user } = userCredential;
        console.log(user);
        firebaseStores.addUser(user.uid, {
          user_name: userName,
          account: userEmail,
          password: userPassword,
          flower: 0,
          grass: 0,
          quiz_results: 0,
          pic: '',
          goals: [],
          gratitude: [],
          favorite: [],
        });
        Toast.fire({
          title: '註冊成功啦~',
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ..
      });
  }

  function logIn(email, password) {
    // 透過firebase的功能，存用戶的資訊到local storage
    setPersistence(auth, browserSessionPersistence)
      .then(async () => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const userData = auth.currentUser;
        console.log('userData', userData);
        console.log(`目前狀態:${userCredential.operationType}`);
        Toast.fire({
          title: `${User ? (User.userData.user_name) : ''} 你回來啦~ 大家都在想你呢`,
        });
        setShowModal(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
    // firebaseStores.getData(collectionName);
  }

  return (
    <Wrapper>
      <ControlR>
        <input type="text" placeholder="請輸入暱稱" name="name" required onChange={(e) => setUserName(e.target.value)} />
        <input type="text" placeholder="請輸入E-mail" name="email" required onChange={(e) => setUserEmail(e.target.value)} />
        <input type="password" placeholder="請輸入密碼" name="psw" required onChange={(e) => setUserPassword(e.target.value)} />
        <span role="button" tabIndex={0} aria-hidden="true" onClick={() => { register(userEmail, userPassword); navigate('/'); }}>註冊</span>
      </ControlR>

      <ControlL>
        <input type="text" placeholder="請輸入E-mail" name="email" id="email" required onChange={(e) => setUserEmail(e.target.value)} />
        <input type="password" placeholder="請輸入密碼" name="psw" required onChange={(e) => setUserPassword(e.target.value)} />
        <span
          role="button"
          tabIndex={0}
          aria-hidden="true"
          onClick={() => {
            logIn(userEmail, userPassword);
          }}
        >
          登入

        </span>
      </ControlL>
    </Wrapper>
  );
}

export default Login;
