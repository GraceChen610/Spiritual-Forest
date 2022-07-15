import PropTypes from 'prop-types';
import './tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';
import {
  // eslint-disable-next-line no-unused-vars
  useEffect, useState, useRef, useContext,
} from 'react';
import {
  // eslint-disable-next-line no-unused-vars
  getStorage, ref, getDownloadURL, uploadString, uploadBytes,
} from 'firebase/storage';
import styled from 'styled-components/macro';
import Swal from 'sweetalert2';
import UserContext from '../../userContext';
import firebaseStores from '../../firebase';
import baseImg from './base.png';

const UploadBtn = styled.button`
    background-color: #fdba3b;
    border: 1px solid #fdba3b;
    color: #000;
    font-family: 'Noto Sans', sans-serif;
    font-size: 12px;
    display: inline-block;
    position: absolute;
    top: 7px;
    left: 50px;
    width: 120px;
    height: 40px;
    padding: 0;
    line-height: 40px;
    outline: none;
    border-radius: 20px;
    font-weight: bold;
    cursor: pointer;
    vertical-align: middle;
    letter-spacing: .3px;
    text-align: center;
`;

// const EditBtn = styled(UploadBtn)`
//     background-color: #fff;
//     border: 1px solid #ddd;
//     color: #222;
//     left: 2px;
//     display: none;
// `;

export default function Canvas({ setHistoryImg, setUpdataImg }) {
  const User = useContext(UserContext);
  const editorRef = useRef();
  // const [imgUrl, setImgUrl] = useState('');
  // console.log(imgUrl);
  function removeLogo() {
    const logoImg = document.querySelector('.tui-image-editor-header-logo > img');
    logoImg?.remove();
  }

  useEffect(() => {
    removeLogo();
  }, []);

  useEffect(() => {
    if (User.pic) {
      const storage = getStorage();
      getDownloadURL(ref(storage, User.pic))
        .then((url) => {
          // `url` is the download URL for 'images/name.jpg'
          setHistoryImg(url);
        });
    }
  }, [User.pic, setHistoryImg]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 抓編輯器的圖URL
    const editorInstance = editorRef.current.getInstance();
    const dataURL = editorInstance.toDataURL();

    // 存圖到storage
    const storage = getStorage();
    const uploadImg = async () => {
      const imgRef = ref(storage, `images/${User.uid}`);
      const snap = await uploadString(imgRef, dataURL, 'data_url');
      const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

      // 拿storge的URL > 存入Cloud Firestore
      firebaseStores.updateDoc(User.uid, { pic: url });
      setHistoryImg(url);
    };
    uploadImg();

    // 更新照片
    setUpdataImg(true);

    // 提醒送出
    Swal.fire({
      icon: 'success',
      showConfirmButton: false,
      timer: 1200,
      text: '照片已上傳',
    });
  };

  // const editPic = () => {
  //   // 從Cloud 拿歷史圖的網址
  //   firebaseStores.getOneDoc('users', User.uid)
  //     .then((res) => setImgUrl(res.data().pic))
  //     .catch((e) => console.log(e));

  //   // 把圖放入編輯器
  //   const editorInstance = editorRef.current.getInstance();
  //   editorInstance.loadImageFromURL(imgUrl, 'historyImg')
  //     .then((result) => { console.log(result); })
  //     .catch((error) => console.log(error));
  // };

  return (
    <div style={{ position: 'relative' }}>
      <div>
        <ImageEditor
          includeUI={{
            loadImage: {
              path: baseImg,
              name: 'SampleImage',
            },
            menu: ['crop', 'flip', 'rotate', 'draw', 'shape', 'icon', 'text', 'mask', 'filter'],
            initMenu: 'mask',
            uiSize: {
              width: '980px',
              height: '600px',
            },
            menuBarPosition: 'bottom',
          }}
          cssMaxHeight={300}
          cssMaxWidth={700}
          selectionStyle={{
            cornerSize: 20,
            rotatingPointOffset: 70,
          }}
          usageStatistics
          ref={editorRef}
        />
        <div>
          {/* <EditBtn type="button" onClick={editPic}> Edit</EditBtn> */}
          <UploadBtn type="submit" onClick={handleSubmit}>submit</UploadBtn>
        </div>
      </div>

    </div>
  );
}

Canvas.propTypes = {
  setHistoryImg: PropTypes.string.isRequired,
  setUpdataImg: PropTypes.bool.isRequired,
};
