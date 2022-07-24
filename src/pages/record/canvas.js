import PropTypes from 'prop-types';
import './tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';
import {
  useEffect, useRef, useContext,
} from 'react';
import {
  getStorage, ref, getDownloadURL, uploadString,
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

export default function Canvas({ setHistoryImg, setUpdataImg, setShowModal }) {
  const user = useContext(UserContext);
  const editorRef = useRef();

  function removeLogo() {
    const logoImg = document.querySelector('.tui-image-editor-header-logo > img');
    logoImg?.remove();
  }

  useEffect(() => {
    removeLogo();
  }, []);

  useEffect(() => {
    if (user.pic) {
      const storage = getStorage();
      getDownloadURL(ref(storage, user.pic))
        .then((url) => {
          setHistoryImg(url);
        });
    }
  }, [user.pic, setHistoryImg]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const editorInstance = editorRef.current.getInstance();
    const dataURL = editorInstance.toDataURL();

    const storage = getStorage();
    const uploadImg = async () => {
      const imgRef = ref(storage, `images/${user.uid}`);
      const snap = await uploadString(imgRef, dataURL, 'data_url');
      const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

      firebaseStores.updateDoc(user.uid, { pic: url });
      setHistoryImg(url);
    };

    uploadImg();
    setUpdataImg(true);
    setShowModal((prev) => !prev);

    Swal.fire({
      icon: 'success',
      showConfirmButton: false,
      timer: 1200,
      text: '照片已上傳',
    });
  };

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
            initMenu: 'icon',
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
          <UploadBtn type="submit" onClick={handleSubmit}>submit</UploadBtn>
        </div>
      </div>

    </div>
  );
}

Canvas.propTypes = {
  setHistoryImg: PropTypes.func.isRequired,
  setUpdataImg: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
};
