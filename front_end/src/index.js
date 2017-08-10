import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, IndexRoute, Route } from 'react-router';

import registerServiceWorker from './registerServiceWorker';
import App from './component/ToolBox/index';
import Commen from './routes/Commen';

import Catalog from './component/Policy/Catalog';
import Article from './component/Policy/Article';
import Apply from './component/Policy/Apply';

import Calculate from './component/Calculate/Home';
import Finance from './component/Calculate/Finance';
import Equity from './component/Calculate/Equity';
import EquityOut from './component/Calculate/EquityOut';

import Incubator from './component/Space/Incubator';
import MapAddress from './component/Space/MapAddress';
import Panorama from './component/Space/Panorama';
import ApplySpace from './component/Space/Apply';

import User from './component/UserInf/Sidebar';
import UserInf from './component/UserInf/UserInf';
import MyFavor from './component/UserInf/MyFavor';
import MyService from './component/UserInf/Service';

import { getUser } from './utils/Users'; // 判断是否登陆

ReactDOM.render((
  <Router history={browserHistory} >
    <Route path="/" remark="首页展示" component={App} />
    <Route path="/" remark="首页展示" component={Commen}>
      <Route path="policy" remark="政策解读" component={Catalog} />
      <Route path="policy/apply/:id" component={Apply} />
      <Route path="policy/:name" component={Article} />
      <Route path="calculate" remark="股权计算" component={Calculate} />
      <Route path="calculate/finance" component={Finance} />
      <Route path="calculate/equity" component={Equity} />
      <Route path="calculate/equityIn" component={EquityOut} />
      <Route path="space" remark="空间选址" component={MapAddress} />
      <Route path="space/incubator/:id" component={Incubator} />
      <Route path="space/apply/:id" component={ApplySpace} />
      <Route path="space/panorama/:id" component={Panorama} />
      <Route
        path="user"
        remark="用户中心"
        component={User}
        onEnter={() => {
          getUser('null', (result) => {
            console.log('on enter', result);
            if (result.code === 1) {
              browserHistory.push('/');
            }
          });
        }}
      >
        <IndexRoute component={UserInf} />
        <Route path="favor" component={MyFavor} />
        <Route path="service" component={MyService} />
      </Route>
    </Route>
  </Router>
  ), document.getElementById('root'));
registerServiceWorker();
