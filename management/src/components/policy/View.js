import React, { Component } from 'react';

import { policyById } from '../../axios/policy.js'

class PolicyView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }
  componentWillMount() {
    const { id } = this.props.params;
    policyById(id).then(res => {
      this.setState({ data: res.data });
    });
  }
  render() {
    return (
      <div >
        demo
      </div>
    );
  }
}

export default PolicyView;
