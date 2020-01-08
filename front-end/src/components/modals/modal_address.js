import React from 'react';
import { Modal, Button, Input } from 'antd';
import { updateTableRow } from '../../data/tables';
import { connect } from 'react-redux';

class CustomModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false,
      address: '',
      link: ''
    };
  }

  changeForeignKey(id) {
    this.setState({
      fk: id
    });
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({
      confirmLoading: true
    });
    const obj = {};
    obj[this.props.columnLink] = this.state.link;
    obj[this.props.columnAddress] = this.state.address;
    console.log(this.props.id);
    console.log(obj);
    updateTableRow(
      this.props.dispatch,
      this.props.parentTableName,
      this.props.id,
      obj
    ).then(() => {
      this.props.parentUpdate();
      this.setState({
        visible: false,
        confirmLoading: false
      });
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          {this.props.children}
        </Button>
        <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          confirmLoading={this.state.confirmLoading}
          // okText="Annulla"
          // cancelText="Mantieni modifiche"
          width="50%"
        >
          <a target="_blank" rel="noopener noreferrer" href={this.props.link}>
            apri su google
          </a>
          <Input
            placeholder="Inserire qui nuovo indirizzo"
            onChange={e => this.setState({ address: e.target.value })}
          ></Input>
          <Input
            placeholder="Inserire qui nuovo link google"
            onChange={e => this.setState({ link: e.target.value })}
          ></Input>
        </Modal>
      </div>
    );
  }
}

export default connect()(CustomModal);
