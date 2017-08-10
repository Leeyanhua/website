import React from 'react';
import { Upload, message, Icon } from 'antd';
import { getUser, putSelf } from '../../utils/Users';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg' || 'image/png';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

export default class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: '',
    };
  }
  componentWillMount() {
    getUser(null, (result) => {
      if (result.code === 0) {
        this.setState({ imageUrl: result.user.image });
      }
    });
  }
  handleChange = (info) => {
    if (info.file.status === 'done') {
      // console.log('info img', info);
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        putSelf({ image: imageUrl }, (result) => {
          if (result.code === 0) {
            this.setState({ imageUrl });
          }
        });
      });
    }
  }

  render() {
    const imageUrl = this.state.imageUrl;
    return (
      <Upload
        className="uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {
          imageUrl ?
            <img src={imageUrl} alt="" className="avatar" /> :
            <img src="/BackImg/favicon.png" alt="user" />
        }
        <div className="uploader-trigger">
          <Icon type="plus" />
        </div>
      </Upload>
    );
  }
}
Avatar.contextTypes = {    // 子组件
  USER: React.PropTypes.object,
};
