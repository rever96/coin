import React from 'react';
import { Modal, Button, Table } from 'antd';

const data = [
  {
    title: '1',
    rows: [
      { col1: 'a1', col2: 'b' },
      { col1: 'a', col2: 'b' }
    ]
  },
  {
    title: '2',
    rows: [
      { col1: 'a2', col2: 'b' },
      { col1: 'a', col2: 'b' }
    ]
  },
  {
    title: '3',
    rows: [
      { col1: 'a3', col2: 'b' },
      { col1: 'a', col2: 'b' }
    ]
  }
];

class ModalContainer extends React.Component {
  constructor() {
    super();
    console.log('Container Constructor');
    this.state = {
      visible: false
    };
  }

  componentDidUpdate() {
    console.log('Container DidUpdate (' + this.props.table.title + ')');
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  handleOk = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { table } = this.props;
    return (
      <>
        <Button type="primary" onClick={this.showModal}>
          Open Table {table.title}
        </Button>
        <Modal
          title={table.title}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="90%"
        >
          <ModalContent rows={table.rows}></ModalContent>
        </Modal>
      </>
    );
  }
}

class ModalContent extends React.Component {
  constructor(props) {
    super(props);
    console.log('Content Constructor');
    this.state = {
      colonne: [],
      righe: []
    };
    this.waitForData = true;
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    console.log('Content DidUpdate');

    if (this.waitForData) {
      this.waitForData = false;
      let righe = this.props.rows.map((v, key) => {
        return { ...v, key: key };
      });
      this.setState({
        righe,
        colonne: ['col1', 'col2'].map((v, key) => {
          return { title: v, dataIndex: v, key: key };
        })
      });
    }
  }

  render() {
    return <Table columns={this.state.colonne} dataSource={this.state.righe} />;
  }
}

class Example extends React.Component {
  render() {
    return (
      <>
        {data.map((table, key) => (
          <ModalContainer table={table} key={key}></ModalContainer>
        ))}
      </>
    );
  }
}

export default Example;
