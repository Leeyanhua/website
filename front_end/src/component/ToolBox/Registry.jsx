import React, { PropTypes } from 'react';
import Registry from '../../routes/Registry';

class ContentRegistry extends React.Component {
  state
  render() {
    const className = 'content1';
    const userInfo = this.context.USER;
    console.log('Registry user', userInfo);
    return (
      <div
        className={`content-template-wrapper content-half-wrapper ${className}-wrapper`}
      >
        {userInfo._id ?
          <button>我的小创</button> :
          <Registry><button>免费注册</button></Registry>
        }
      </div>
    );
  }
}
ContentRegistry.contextTypes = {    // 子组件
  USER: PropTypes.object,
};

export default ContentRegistry;
