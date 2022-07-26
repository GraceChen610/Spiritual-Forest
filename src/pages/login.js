import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  setPersistence, browserSessionPersistence,
} from 'firebase/auth';
import { useState, useContext, useRef } from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import firebaseStores, { auth } from '../firebase';
import Toast from '../components/toastAlert';
import UserContext from '../userContext';

const Wrapper = styled.div`
  `;

const ControlR = styled.div`
 position: absolute;
 left: 500px;
 top: 255px;

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
  &:last-of-type{
    left: 110px;
  }
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

function Login({ setShowModal }) {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userName, setUserName] = useState('');
  const refLoginEmail = useRef('');
  const refLoginPassword = useRef('');
  const User = useContext(UserContext);

  function register(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const { user } = userCredential;

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
          title: '恭喜您註冊成功~ 嘗試探索新功能吧！',
        });

        setShowModal(false);
      })

      .catch((error) => {
        const errorCode = error.code;
        Toast.fire({
          title: errorCode,
        });
      });
  }

  function logIn(email, password) {
    setPersistence(auth, browserSessionPersistence)
      .then(async () => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // eslint-disable-next-line no-console
        console.log(`目前狀態:${userCredential.operationType}`);
        Toast.fire({
          title: `${User ? (User.userData.user_name) : ''} 你回來啦~ 大家都在想你呢`,
        });
        setShowModal(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        Toast.fire({
          title: errorCode,
        });
      });
  }

  const handleClick = () => {
    setUserName('');
    setUserEmail('');
    setUserPassword('');
  };

  return (
    <Wrapper>
      <ControlR>
        <input type="text" placeholder="請輸入暱稱" name="name" required onChange={(e) => setUserName(e.target.value)} value={userName} />
        <input type="text" placeholder="請輸入E-mail" name="email" required onChange={(e) => setUserEmail(e.target.value)} value={userEmail} />
        <input type="password" placeholder="請輸入密碼" name="psw" required onChange={(e) => setUserPassword(e.target.value)} value={userPassword} />
        <span role="button" tabIndex={0} aria-hidden="true" onClick={() => { register(userEmail, userPassword); }}>註冊</span>
        <span role="button" tabIndex={0} aria-hidden="true" onClick={() => handleClick()}>取消</span>
      </ControlR>

      <ControlL>
        <input type="text" placeholder="直接點擊ok使用體驗帳號登入" name="email" id="email" required ref={refLoginEmail} defaultValue="test@mail.com" />
        <input type="password" name="psw" required ref={refLoginPassword} defaultValue="test123" />
        <span
          role="button"
          tabIndex={0}
          aria-hidden="true"
          onClick={() => {
            logIn(refLoginEmail.current.value, refLoginPassword.current.value);
          }}
        >
          登入

        </span>
      </ControlL>
    </Wrapper>
  );
}

export default Login;

Login.propTypes = {
  setShowModal: PropTypes.func,
};

Login.defaultProps = {
  setShowModal: null,
};
