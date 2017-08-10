/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SiderCustom extends Component {
  state = {
    collapsed: false,
    mode: 'inline',
    openKey: '',
    selectedKey: ''
  };
  componentDidMount() {
    this.setMenuOpen(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.onCollapse(nextProps.collapsed);
    this.setMenuOpen(nextProps)
  }
  setMenuOpen = props => {
    const {path} = props;
    this.setState({
      openKey: path.substr(0, path.lastIndexOf('/')),
      selectedKey: path
    });
  };
  onCollapse = (collapsed) => {
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    });
  };
  menuClick = e => {
    this.setState({
        selectedKey: e.key
    });
    console.log(this.state);
  };
  openMenu = v => {
    console.log(v);
    this.setState({
      openKey: v[v.length - 1]
    })
  };
  render() {
    const title = this.props.collapsed ? '创' : '小创管理平台';
    return (
      <Sider
        trigger={null}
        breakpoint="lg"
        collapsed={this.props.collapsed}
        style={{overflowY: 'auto'}}
      >
        <div className="logo" >
          {title}
        </div>
        <Menu
          onClick={this.menuClick}
          theme="dark"
          mode={this.state.mode}
          selectedKeys={[this.state.selectedKey]}
          openKeys={[this.state.openKey]}
          onOpenChange={this.openMenu}
        >
          <Menu.Item key="/admin/dashboard/index">
            <Link to={'/admin/dashboard/index'}><Icon type="mobile" /><span className="nav-text">首页</span></Link>
          </Menu.Item>

          <Menu.Item key="/admin/chat-record">
            <Link to={'/admin/ai'}><Icon type="rocket" /><span className="nav-text">AI</span></Link>
          </Menu.Item>


          <SubMenu
            key="/admin/policy"
            title={<span><Icon type="scan" /><span className="nav-text">政策管理</span></span>}
          >
            <Menu.Item key="/admin/policy/list"><Link to={'/admin/policy/list'}>政策列表</Link></Menu.Item>
            <Menu.Item key="/admin/policy/supply"><Link to={'/admin/policy/supply'}>政策申请</Link></Menu.Item>
          </SubMenu>

          <SubMenu
            key="/admin/space"
            title={<span><Icon type="rocket" /><span className="nav-text">空间</span></span>}
          >
            <Menu.Item key="/admin/space/list"><Link to={'/admin/space/list'}>空间列表</Link></Menu.Item>
            <Menu.Item key="/admin/space/supply"><Link to={'/admin/space/supply'}>空间管理</Link></Menu.Item>
          </SubMenu>


          <Menu.Item key="/admin/chat-record">
            <Link to={'/admin/chat-record'}><Icon type="rocket" /><span className="nav-text">聊天记录</span></Link>
          </Menu.Item>



          <SubMenu
            key="/admin/ui"
            title={<span><Icon type="scan" /><span className="nav-text">UI</span></span>}
          >
            <Menu.Item key="/admin/ui/buttons"><Link to={'/admin/ui/buttons'}>按钮</Link></Menu.Item>
            <Menu.Item key="/admin/ui/icons"><Link to={'/admin/ui/icons'}>图标</Link></Menu.Item>
            <Menu.Item key="/admin/ui/spins"><Link to={'/admin/ui/spins'}>加载中</Link></Menu.Item>
            <Menu.Item key="/admin/ui/modals"><Link to={'/admin/ui/modals'}>对话框</Link></Menu.Item>
            <Menu.Item key="/admin/ui/notifications"><Link to={'/admin/ui/notifications'}>通知提醒框</Link></Menu.Item>
            <Menu.Item key="/admin/ui/tabs"><Link to={'/admin/ui/tabs'}>标签页</Link></Menu.Item>
            <Menu.Item key="/admin/ui/banners"><Link to={'/admin/ui/banners'}>轮播图</Link></Menu.Item>
            <Menu.Item key="/admin/ui/wysiwyg"><Link to={'/admin/ui/wysiwyg'}>富文本</Link></Menu.Item>
            <Menu.Item key="/admin/ui/drags"><Link to={'/admin/ui/drags'}>拖拽</Link></Menu.Item>
            <Menu.Item key="/admin/ui/gallery"><Link to={'/admin/ui/gallery'}>画廊</Link></Menu.Item>
          </SubMenu>



            {/*
            <SubMenu
                key="/admin/animation"
                title={<span><Icon type="rocket" /><span className="nav-text">动画</span></span>}
            >

                <Menu.Item key="/admin/animation/basicAnimations"><Link to={'/admin/animation/basicAnimations'}>基础动画</Link></Menu.Item>
                <Menu.Item key="/admin/animation/exampleAnimations"><Link to={'/admin/animation/exampleAnimations'}>动画案例</Link></Menu.Item>
            </SubMenu>
            <SubMenu
                key="/admin/table"
                title={<span><Icon type="copy" /><span className="nav-text">表格</span></span>}
            >

                <Menu.Item key="/admin/table/basicTable"><Link to={'/admin/table/basicTable'}>基础表格</Link></Menu.Item>
                <Menu.Item key="/admin/table/advancedTable"><Link to={'/admin/table/advancedTable'}>高级表格</Link></Menu.Item>
                <Menu.Item key="/admin/table/asynchronousTable"><Link to={'/admin/table/asynchronousTable'}>异步表格</Link></Menu.Item>
            </SubMenu>
            <SubMenu
                key="/admin/form"
                title={<span><Icon type="edit" /><span className="nav-text">表单</span></span>}
            >

                <Menu.Item key="/admin/basicForm"><Link to={'/admin/form/basicForm'}>基础表单</Link></Menu.Item>
            </SubMenu>
            <SubMenu
                key="/admin/chart"
                title={<span><Icon type="area-chart" /><span className="nav-text">图表</span></span>}
            >
                <Menu.Item key="/admin/chart/echarts"><Link to={'/admin/chart/echarts'}>echarts</Link></Menu.Item>
                <Menu.Item key="/admin/chart/recharts"><Link to={'/admin/chart/recharts'}>recharts</Link></Menu.Item>
            </SubMenu>
            <SubMenu
                key="sub4"
                title={<span><Icon type="switcher" /><span className="nav-text">页面</span></span>}
            >
                <Menu.Item key="/login"><Link to={'/login'}>登录</Link></Menu.Item>
                <Menu.Item key="/404"><Link to={'/404'}>404</Link></Menu.Item>
            </SubMenu>
            */}

        </Menu>
        <style>
          {`
          #nprogress .spinner{
              left: ${this.state.collapsed ? '70px' : '206px'};
              right: 0 !important;
          }
          `}
        </style>
      </Sider>
    )
  }
}

export default SiderCustom;
