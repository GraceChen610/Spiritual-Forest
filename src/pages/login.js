/* eslint-disable no-console */
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { auth } from '../firebase';

const Wrapper = styled.div`
  `;

function Login() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  //   const auth = getAuth();
  //   const auth = getAuth(app);

  function register(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const { user } = userCredential;
        console.log(user);
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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const { uid } = user;
        console.log(uid);
        // ...
      } else {
        // User is signed out
        // ...
        console.log('User is signed out');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function logIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const { user } = userCredential;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  }

  return (
    <Wrapper>
      <h3>註冊</h3>
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
      <button type="submit" onClick={() => register(userEmail, userPassword)}>註冊</button>
      <br />
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
