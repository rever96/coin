import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import Routes from './routes';
import { navigateTo } from './history';
import { connect } from 'react-redux';
import { resetTables } from './data/actions';
import { fetchTable } from './data/tables';
import { subscribeUser } from './subscription';

import { TABLENAMES } from './data/tables';

const { Content, Footer, Header } = Layout;

class MyLayout extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: false
    };
    subscribeUser();
  }

  componentDidMount() {
    fetchTable(TABLENAMES.EVENTI, this.props.dispatch);
    fetchTable(TABLENAMES.ORDINI, this.props.dispatch);
    // fetchTable(TABLENAMES.CLIENTI, this.props.dispatch);
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
      <Layout className='layout' style={{ minHeight: '100vh' }}>
        <Header style={{ padding: '0px' }}>
          <div className='logo' />
          <Menu
            theme='dark'
            defaultSelectedKeys={['0']}
            mode='horizontal'
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item onClick={() => navigateTo('/dashboard')} key='0'>
              <Icon type='desktop' />
              <span>Calendario</span>
            </Menu.Item>
            <Menu.Item onClick={() => navigateTo('/tables/add')} key='1'>
              <Icon type='pie-chart' />
              <span>Aggiungi</span>
            </Menu.Item>
            <Menu.Item onClick={() => navigateTo('/tables/view')} key='2'>
              <Icon type='pie-chart' />
              <span>Visualizza</span>
            </Menu.Item>
            <Menu.Item onClick={() => navigateTo('/example')} key='3'>
              <Icon type='file' />
              <span>Esempio</span>
            </Menu.Item>
            <Menu.Item onClick={this.onReset.bind(this)} key='9'>
              <Icon type='file' />
              <span>Reset</span>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ margin: '16px 8px 0px 8px' }}>
          <Routes></Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          ©2019 Created by Marius e Loris per il matrimonio di Francesco (con
          Mara)
        </Footer>
      </Layout>
    );
  }
}

export default connect()(MyLayout);
