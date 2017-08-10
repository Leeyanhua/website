import React from 'react';
import { Link } from 'react-router';
import { Card } from 'antd';
// <img className="catalog-img"
// src={`/BackImg/images/${classImage[ele.policy_class[0]]}.jpg`} alt="" />

// const classImage = {
//   政策导向: 'zcdx',
//   创新创业: 'cxcy',
//   投资融资: 'tzrz',
//   税收优惠: 'ssyh',
//   项目申报: 'xmsb',
//   人才政策: 'rczc',
// };
export default class CatalogContent extends React.Component {
  static propTypes = {
    list: React.PropTypes.array.isRequired,
  }
  state
  render() {
    const { list } = this.props;
    const contentDiv = list && list.map((ele) => {
      const button = ele.keywords.map(key => (
        <button key={key.toString()}>{key}</button>
      ));

      console.log('ele.content', ele.content);
      // 获取所有 UTF-8 编码中文字符
      // const content = ele.content.replace(/[^\u4e00-\u9fa5]/gi, '');
      let contentTemp = ele.content;
      if (ele.content.indexOf('entityMap') > -1) {
        const temp = JSON.parse(ele.content);
        contentTemp = temp.blocks.slice(0, 6).map(e => e.text).join('');
        // console.log('temp', temp);
      }
      console.log('contentTemp', contentTemp);
      return (
        <Card key={ele._id}>
          <img className="catalog-img" src={`/BackImg/images/${ele.images[1]}.jpg`} alt="" />
          <div>
            <div className="catalog-policy">
              <div className="list-title">
                <h1>
                  <Link to={`/policy/${ele._id}`}>
                    {ele.policy_name.length > 20 ?
                      `${ele.policy_name.substr(0, 20)}……` :
                      ele.policy_name
                    }
                  </Link>
                </h1>
                <span>{ele.release_date}</span>
              </div>
              <span>发布单位：{ele.issue_organization}</span>
              {button}
              <br /><br />
              <p>
                {contentTemp.length > 200 ?
                  `${contentTemp.substr(0, 200)}……` :
                  contentTemp
                }
              </p>
            </div>
          </div>
        </Card>
      );
    });
    return <div>{contentDiv}</div>;
  }
}
