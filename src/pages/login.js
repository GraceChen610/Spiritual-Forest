/* eslint-disable no-console */
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
  setPersistence, browserSessionPersistence,
} from 'firebase/auth';
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import firebaseStores, { auth } from '../firebase';

const Wrapper = styled.div`
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
      <form>
        <h3>註冊</h3>
        <label htmlFor="name">
          暱稱:
          <input type="text" placeholder="請輸入暱稱" name="name" required onChange={(e) => setUserName(e.target.value)} />
        </label>
        <br />
        <label htmlFor="email">
          E-mail:
          <input type="text" placeholder="請輸入E-mail" name="email" required onChange={(e) => setUserEmail(e.target.value)} />
        </label>
        <br />
        <label htmlFor="psw">
          Password:
          <input type="password" placeholder="請輸入密碼" name="psw" required onChange={(e) => setUserPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit" onClick={() => register(userEmail, userPassword)}>註冊</button>
      </form>

      <h3>登入</h3>
      <label htmlFor="email">
        E-mail:
        <input type="text" placeholder="請輸入E-mail" name="email" id="email" required onChange={(e) => setUserEmail(e.target.value)} />
      </label>
      <br />
      <label htmlFor="psw">
        Password:
        <input type="password" placeholder="請輸入密碼" name="psw" required onChange={(e) => setUserPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit" onClick={() => logIn(userEmail, userPassword)}>登入</button>

      <hr />
      <button
        type="submit"
        onClick={() => signOut(auth).then(() => {
          console.log('Sign-out successful.');
        }).catch((error) => {
          console.log(error);
        })}
      >
        登出
      </button>
    </Wrapper>
  );
}

export default Login;
