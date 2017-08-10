import React from 'react';
import { notification, Icon } from 'antd';

const Notification = window.Notification || window.mozNotification || window.webkitNotification;

const innerMessage = (message) => {
  notification.open({
    message: '您有一条新的消息',
    description: '有新的监控异常事件.',
    icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
  });
}

const newMessage = (message) => {
  if (Notification) { // h5 系统通知
    Notification.requestPermission((permission) => {
      if (permission === "granted") {
        const notify = new Notification("您有一条新的消息",{
            dir: "auto",
            lang: "zh-CN",
            tag: "testNotice",
            icon:'ant.png',
            body: '有新的监控异常事件'
        });
        notify.onclick=function(){
          //如果通知消息被点击,通知窗口将被激活
          window.focus();
        };
        notify.onerror = function () {
          console.log("桌面消息出错！！！");
        };
        notify.onshow = function () {
          setTimeout(function(){
            notify.close();
          },5000)
        };
        notify.onclose = function () {
          // console.log("桌面消息关闭！！！");
        };
      } else {
        innerMessage(message)
      };
    })
  } else {
    innerMessage(message)
  };
}

export default newMessage;
