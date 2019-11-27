import React from 'react';
import { Modal, Button } from 'antd';
import SelectRowTable from '../edi_table/sel_table';
import { fetchTableIfMissing } from '../../data/tables';
import { connect } from 'react-redux';

class ModalSelectRow extends React.Component {
  constructor(props) {
    super(props);
    console.log(Object.assign({}, props));
    this.state = {
      tableName: props.tableName,
      visible: false,
      confirmLoading: false
    };
  }

  showModal = () => {
    fetchTableIfMissing(
      this.state.tableName,
      this.props.dispatch,
      this.props.fetchedTables
    );
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({
      confirmLoading: true
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false
      });
    }, 2000);
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { visible, confirmLoading, tableName } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Riferimento a {tableName}
        </Button>
        <Modal
          title="Title"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          width="90%"
        >
          <SelectRowTable tableName={this.props.tableName}></SelectRowTable>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetchedTables: state.fetchedTables
  };
};

export default connect(mapStateToProps)(ModalSelectRow);
