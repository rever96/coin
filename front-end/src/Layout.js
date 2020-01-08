import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import struttura from './assets/struttura.json';
import Routes from './routes';
import { navigateTo } from './history';
import { connect } from 'react-redux';
import { resetTables } from './data/actions';
import { fetchTable } from './data/tables';
import { subscribeUser } from './subscription';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class MyLayout extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: false
    };
    subscribeUser();
  }

  componentDidMount() {
    fetchTable('Eventi', this.props.dispatch);
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
          <Menu theme="dark" defaultSelectedKeys={['0']} mode="inline">
            <Menu.Item onClick={() => navigateTo('/dashboard')} key="0">
              <Icon type="desktop" />
              <span>Home</span>
            </Menu.Item>
            <Menu.Item onClick={() => navigateTo('/example')} key="1">
              <Icon type="pie-chart" />
              <span>Esempio</span>
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
        <Layout style={{ backgroundColor: '#fff' }}>
          <Content style={{ margin: '16px 8px 0px 8px' }}>
            {/* pagina */}
            <Routes></Routes>
          </Content>
          <Footer
            style={{
              paddingTop: '11px',
              paddingBottom: '16px',
              textAlign: 'center'
            }}
          >
            ©2019 Created by Marius e Loris per il matrimonio di Francesco (con
            Mara)
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default connect()(MyLayout);
