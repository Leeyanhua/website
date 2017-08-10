import React, { PropTypes } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import { getUser } from '../utils/Users';

class Commen extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      USER: {},
      equityRate: [],     // 股权计算
    };
  }
  // 向所有子 发送公共 context
  getChildContext() {
    const temp = {
      USER: this.state.USER,
    };
    return temp;
  }
  componentWillMount() {
    getUser(null, (result) => {
      if (result.code === 0) {
        this.setState({ USER: result.user });
        console.log('user info', result.user);
      }
    });
  }
  setEquity = (equityRate) => {
    this.setState({ equityRate });
  }
  render() {
    const childrenWithProps = React.Children.map(this.props.children,
      child => React.cloneElement(child, {
        equityRate: this.state.equityRate,
        setEquity: this.setEquity,
      }),
    );
    return (
      <div className="templates-wrapper">
        <Nav
          key="nav_0_0"
          style={{ backgroundColor: '#000' }}
        />
        { childrenWithProps }
        <Footer />
      </div>
    );
  }
}
Commen.childContextTypes = {
  USER: PropTypes.object,
};
export default Commen;
