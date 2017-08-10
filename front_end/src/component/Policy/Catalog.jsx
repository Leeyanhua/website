import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Pagination, Input } from 'antd';
import './less/together.less';
import Content from './CatalogContent';
import { getPolicySearch, getTags } from '../../utils/Policy';

export default class Catalog extends React.Component {
  static propTypes = {
    location: React.PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      prefer: 0,
      list: [],
      amount: 0,
      tags: [],
      loading: true,
      // inputValue: '',
    };
  }
  componentDidMount() {
    const { page = 1, value = '' } = this.props.location.query;
    this.search(page, value);
    getTags(null, (result) => {
      this.setState({ tags: result.keywords });
    });
  }
  onChange = (page) => {
    const { value = '' } = this.props.location.query;
    browserHistory.push(`/policy?page=${page}&value=${value}`);
    this.search(page, value);
  }
  handleChange = (event) => {
    // this.setState({ inputValue: event.target.value });
    browserHistory.push(`/policy?page=1&value=${event.target.value}`);
    this.search(1, event.target.value);
  }
  search = (page, value) => {
    getPolicySearch({ page, value }, (result) => {
      this.setState({
        list: result.data,
        amount: result.count,
        loading: false,
      });
    });
  }
  tagChange = (value) => {
    browserHistory.push(`/policy?page=1&value=${value}`);
    this.search(1, value);
  }
  handleSearch = () => {
    // const { inputValue } = this.state;
    // browserHistory.push(`/policy?page=1&value=${inputValue}`);
    // this.search(1, inputValue);
  }
  render() {
    const { list, amount, tags, loading } = this.state;
    const { page = 1, value = '' } = this.props.location.query;
    return (
      <div className="catalog">
        <div className="input">
          <Input type="text" value={value} onChange={this.handleChange} />
          <input
            name="button"
            type="image"
            src="/BackImg/search.png"
            alt="search"
            onClick={this.handleSearch}
          />
          <p>Tips:如果搜索不到您想要的内容，可以和<Link to="/">小创智能机器人</Link>聊聊~</p>
        </div>
        {loading ? null :
        <div className="main">
          {list.length ?
            <div className="optional">
              <div className="optionalLink">
                <span>
                  <Link to="/policy/like/like">猜你喜欢</Link>
                  <Link activeStyle={{ color: '#3ac1bd' }} to="/policy">全部</Link>
                </span>
                <span>找到{this.state.amount}条相关政策</span>
              </div>
              <Content list={list} /><br />
              <Pagination current={parseInt(page, 10)} onChange={this.onChange} total={amount} />
            </div> :
            <h1 className="no-result">找不到您想要的内容，可以和<Link to="/">小创智能机器人</Link>聊聊~
            </h1>
          }
          <div className="sidebar">
            <p>热门标签</p>
            <div className="tags">
              {tags.map(ele => (
                <button
                  key={ele._id}
                  onClick={() => this.tagChange(ele._id)}
                >{ele._id}</button>
              ))}
            </div>
          </div>
        </div>
      }
      </div>
    );
  }
}
