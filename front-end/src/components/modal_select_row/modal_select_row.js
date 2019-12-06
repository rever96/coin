import React from 'react';
import { Modal, Button } from 'antd';
import SelectRowTable from '../edi_table/sel_table';
import { fetchTableIfMissing, setTable } from '../../data/tables';
import { connect } from 'react-redux';

class ModalSelectRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
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
    this.setState({
      visible: false
    });
  };

  handleCancel = () => {
    console.log({ ...this.props });
    setTable(
      this.props.parentTableName,
      this.props.dispatch,
      this.props.tableData
    );
    this.setState({
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
          okText="Annulla"
          cancelText="Mantieni modifiche"
          width="90%"
        >
          <SelectRowTable
            tableName={childTableName}
            id={this.props.id}
            visible={visible}
            dispatch={this.props.dispatch}
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
