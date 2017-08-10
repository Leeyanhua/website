import React, { PropTypes } from 'react';
import { Card } from 'antd';
import { Link } from 'react-router';
import { getUserPolicyList } from '../../utils/Users';

export default class FavorPolicy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      policyList: [],
    };
  }
  componentWillMount() {
    getUserPolicyList(null, (result) => {
      this.setState({ policyList: result.result2 });
    });
  }
  render() {
    const { policyList } = this.state;
    console.log('policyList policy', policyList);
    return (<div>
      {policyList.length ?
        policyList.map((ele) => {
          const button = ele.keywords.map(key => (
            <button key={key.toString()}>{key}</button>
          ));
          return (
            <Card key={ele._id} className="user-policy-card">
              <div className="user-policy">
                <h1>
                  <Link to={`/policy/${ele._id}`}>
                    {ele.policy_name.length > 14 ?
                      `${ele.policy_name.substr(0, 14)}……` :
                      ele.policy_name
                    }
                  </Link>
                </h1>
                <small>{ele.release_date}</small><br />
                <span>发布单位：{ele.document_symbol}</span>
                {button}
                <br /><br />
                <p>
                  {ele.content.length > 128 ?
                    `${ele.content.substr(0, 128)}……` :
                    ele.content
                  }
                </p>
              </div>
            </Card>
          );
        }) :
        <h1>你还没有收藏任何政策解读信息</h1>
    }
    </div>
    );
  }
}
FavorPolicy.contextTypes = {
  USER: PropTypes.object,
};
