import React from 'react';
import { Button } from 'antd';

export default class CaptchaButton extends React.Component {
  static propTypes = {
    getAuthCode: React.PropTypes.func.isRequired,
  }
  state = {
    describ: '获取验证码',
    disabled: false,
  }
  componentWillMount() {
    if (sessionStorage.captcha !== undefined &&
      sessionStorage.captcha !== 'NaN' &&
      sessionStorage.captcha !== 'null') {
      this.keepWait();
    }
  }
  getCaptcha = () => {
    this.props.getAuthCode(() => {
      sessionStorage.captcha = 60;
      this.keepWait();
    });
  }
  keepWait = () => {
    const a = setInterval(() => {
      if (sessionStorage.captcha === '0') {
        this.setState({ describ: '重新发送', disabled: false });
        clearInterval(a);
      } else {
        this.setState({ disabled: true, describ: `${sessionStorage.captcha}秒后重发` });
        const current = sessionStorage.captcha - 1;
        sessionStorage.captcha = current;
        console.log(sessionStorage.captcha);
      }
    }, 1000);
  }
  render() {
    const { describ, disabled } = this.state;
    return (
      <Button onClick={this.getCaptcha} disabled={disabled}>{describ}</Button>
    );
  }
}
