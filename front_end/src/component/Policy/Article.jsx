import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Icon, message } from 'antd';
import { getPolicyArticle, getTags } from '../../utils/Policy';
import { putColPo, deleteCollect } from '../../utils/Users';
import rich2html from '../../utils/rich2html';

class Article extends React.Component {
  static propTypes = {
    params: React.PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      favor: false,
      content: {},
      tags: [],
    };
  }
  componentWillMount() {
    getPolicyArticle(this.props.params.name, (result) => {
      if (result.code === 0) {
        console.log('article result', result);
        this.setState({ content: result.data, favor: result.liked });
      }
    });
    getTags(null, (result) => {
      this.setState({ tags: result.keywords });
    });
  }
  changeColor = () => {
    const { content, favor } = this.state;
    if (!this.context.USER._id) {
      message.error('请登录后再试！');
    } else if (favor) {
      deleteCollect(content._id, (result) => {
        if (result.code === 0) {
          this.setState({ favor: false });
        }
      });
    } else {
      putColPo(content._id, (result) => {
        if (result.code === 0) {
          this.setState({ favor: true });
        }
      });
    }
  }
  render() {
    const { favor, content, tags } = this.state;
    const { name } = this.props.params;
    const color = favor ? '#3ac1bd' : '#111';
    const button = content.keywords &&
      content.keywords.map(key => (
        <button key={key}>{key}</button>
    ));
    return (
      <div className="article">
        <div className="header">
          <div className="title">
            <h1>{content.policy_name}</h1>
            <span>{content.issue_organization}</span>
            <span>{content.document_symbol}</span><br />
            {button}
          </div>
          <div className="note">
            <Icon type="heart" style={{ cursor: 'pointer', color }} onClick={this.changeColor} />
            &nbsp;&nbsp;&nbsp;<span style={{ color }}>收藏</span>
          </div>
        </div>
        {content.images && content.images[0] &&
          <div className="article-img">
            <img src={`/BackImg/policy/${content.images[0]}.jpg`} alt="policy img" />
          </div>
        }
        <p className="content">{content.simplify}</p>
        <div className="content">{rich2html(content.content)}</div>
        <img className="arrow" src="/BackImg/Bitmap.png" alt="arrow" />
        <Link className="apply" to={`/policy/apply/${name}`}>立刻申请</Link>
        <div className="share">
          <span>分享到：</span>
          <Link><img src="/BackImg/qq.png" alt="QQ" /></Link>
          <Link><img src="/BackImg/wechat.png" alt="微信" /></Link>
          <Link><img src="/BackImg/weibo.png" alt="微博" /></Link>
        </div>
        <p className="subtitle">热门标签</p>
        <div className="tags">
          {tags.map(ele => (
            <Link to={`/policy?page=1&value=${ele._id}`} key={ele._id}>{ele._id}</Link>
          ))}
        </div>
        <p className="subtitle">相关推荐</p>
        <div className="recommend">
          <div>
            <img src="/BackImg/policy.png" alt="recommend" />
            <p>科技创业者应拥有与其业务规模</p>
          </div>
          <div>
            <img src="/BackImg/policy.png" alt="recommend" />
            <p>科技创业者应拥有与其业务规模</p>
          </div>
          <div>
            <img src="/BackImg/policy.png" alt="recommend" />
            <p>科技创业者应拥有与其业务规模</p>
          </div>
        </div>
      </div>
    );
  }
}
Article.contextTypes = {    // 子组件
  USER: PropTypes.object,
};

export default Article;
