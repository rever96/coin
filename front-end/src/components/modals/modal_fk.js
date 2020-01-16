import React from 'react';
import { Modal, Button } from 'antd';
import SelectRowTable from '../edi_table/sel_table';
import { fetchTableIfMissing } from '../../data/tables';
import { connect } from 'react-redux';

class ModalSelectRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fk: props.fk.value,
      visible: false,
      confirmLoading: false
    };
  }

  changeForeignKey(id) {
    this.setState({
      fk: id
    });
  }

  showModal = () => {
    fetchTableIfMissing(
      this.props.childTableName,
      this.props.dispatch,
      this.props.fetchedTables
    );
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    if (this.props.fk.value !== this.state.fk) {
      this.setState({
        confirmLoading: true
      });
      this.props.handleOk(this.state.fk);
      this.setState({
        visible: false,
        confirmLoading: false
      });
    } else {
      this.setState({
        visible: false
      });
    }
  };

  handleCancel = () => {
    this.setState({
      fk: this.props.fk.value,
      visible: false
    });
  };

  render() {
    const { visible } = this.state;
    const { childTableName } = this.props;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Riferimento a {childTableName}
        </Button>
        <Modal
          title={'Seleziona riferimento a ' + childTableName}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          confirmLoading={this.state.confirmLoading}
          // okText="Annulla"
          // cancelText="Mantieni modifiche"
          width="90%"
        >
          <SelectRowTable
            tableName={childTableName}
            id={this.props.fk.value}
            visible={visible}
            dispatch={this.props.dispatch}
            changeForeignKey={this.changeForeignKey.bind(this)}
          ></SelectRowTable>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { parentTableName } = ownProps;
  return {
    fetchedTables: state.fetchedTables,
    tableData: state.tableData[parentTableName]
  };
};

export default connect(mapStateToProps)(ModalSelectRow);
