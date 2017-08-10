import React from 'react';
import '../component/ToolBox/less/footer.less';

class Footer extends React.Component {
  state
  render() {
    const props = { ...this.props };
    console.log('prop id', props.id);
    return (<div
      className="footer0"
    >
      <hr />
      <div>
        <span className="span">关于我们</span>
        <span className="span">企业服务</span>
        <span className="span">法律声明</span>
        <span className="span">联系我们</span>
        <span className="Copyright">Copyright © 武汉唯理科技提供技术支持</span>
      </div>
    </div>);
  }
}

export default Footer;
