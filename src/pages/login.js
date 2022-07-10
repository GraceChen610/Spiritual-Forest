/* eslint-disable no-console */
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  setPersistence, browserSessionPersistence,
} from 'firebase/auth';
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import firebaseStores, { auth } from '../firebase';

const Wrapper = styled.div`
  `;

const ControlR = styled.div`
 position: absolute;
 left: 500px;
 top: 255px;

 input{
  margin-bottom:2.3rem;
  width: 175px;
  border-radius: 5px;
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
    top: 369px;
    

  input{
  margin-bottom:2.9rem;
  width: 175px;
  border-radius: 5px;
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

function Login() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userName, setUserName] = useState('');

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
        // ...
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
        // eslint-disable-next-line no-alert
        alert(`目前狀態:${userCredential.operationType}`);
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
        <span role="button" tabIndex={0} aria-hidden="true" onClick={() => register(userEmail, userPassword)}>註冊</span>
      </ControlR>

      <ControlL>
        <input type="text" placeholder="請輸入E-mail" name="email" id="email" required onChange={(e) => setUserEmail(e.target.value)} />
        <input type="password" placeholder="請輸入密碼" name="psw" required onChange={(e) => setUserPassword(e.target.value)} />
        <span role="button" tabIndex={0} aria-hidden="true" onClick={() => logIn(userEmail, userPassword)}>登入</span>
      </ControlL>
    </Wrapper>
  );
}

export default Login;
