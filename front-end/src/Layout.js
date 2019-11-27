import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import struttura from './assets/struttura.json';
import Routes from './routes';
import { navigateTo } from './history';
import { connect } from 'react-redux';
import { resetTables } from './data/actions';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class MyLayout extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: false
    };
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  onReset() {
    console.log('reset');
    this.props.dispatch(resetTables());
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>Option 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>Option 2</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>Tabelle</span>
                </span>
              }
            >
              {struttura.map((tabella, key) => (
                <Menu.Item
                  onClick={() => navigateTo('/tabella/' + tabella.nome)}
                  key={'tabella_' + key}
                >
                  {tabella.nome}
                </Menu.Item>
              ))}
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="team" />
                  <span>Team</span>
                </span>
              }
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item onClick={this.onReset.bind(this)} key="9">
              <Icon type="file" />
              <span>Reset</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>

            {/* pagina */}
            <Routes></Routes>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            ©2019 Created by Marius e Loris per il matrimonio di Francesco (con
            Mara)
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default connect()(MyLayout);
