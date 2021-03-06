import React from 'react';
import './edi_table.css';
import { Table, Input, Popconfirm, Form, Button, notification } from 'antd';
import {
  updateTableRow,
  deleteTableRow,
  createTableRow
} from '../../data/tables';

const EditableContext = React.createContext();

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.render === 'fk') {
      return <Button>prova </Button>;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    return (
      <td>
        {this.props.editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(this.props.dataIndex, {
              rules: this.props.not_null
                ? [
                    {
                      required: true,
                      message: `Campo obbligatorio: ${this.props.title}!`
                    }
                  ]
                : [],
              initialValue: this.props.cellValue
            })(this.getInput())}
          </Form.Item>
        ) : (
          this.props.children
        )}
      </td>
    );
  };

  render() {
    return (
      <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: props.righe,
      editingKey: '',
      count: props.righe[props.righe.length - 1].key + 1
    };
    this.titolo = this.props.titolo;
    this.setColumns();
  }

  setColumns() {
    this.columns = [...this.props.colonne];
    EditableCell.defaultProps = {
      colonne: this.columns
    };
    this.columns.push({
      title: 'operation',
      dataIndex: 'operation',
      width: 100,
      render: (text, record) => {
        const { editingKey } = this.state;
        const editable = this.isEditing(record);
        return editable ? (
          <span>
            <EditableContext.Consumer>
              {form => (
                <p
                  className="link"
                  onClick={() => this.save(form, record.key)}
                  style={{ marginRight: 8 }}
                >
                  Save
                </p>
              )}
            </EditableContext.Consumer>
            <p className="link" onClick={() => this.cancel(record.key)}>
              Cancel
            </p>
          </span>
        ) : (
          <>
            <p
              className="link"
              disabled={editingKey !== ''}
              onClick={() => this.edit(record.key)}
            >
              Edit
            </p>
            <Popconfirm
              title="Non potrai annullare questa azione, continuare?"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <p className="link">Delete</p>
            </Popconfirm>
          </>
        );
      }
    });
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    const deletedRow = dataSource.splice(
      dataSource.findIndex(row => row.key === key),
      1
    )[0];
    deleteTableRow(this.props.dispatch, this.props.titolo, deletedRow.id)
      .then(() => {
        //aggiorno questa componente
        //perchè cambia lo stato del reducer, ma questa componente non è connessa
        this.setState({ dataSource });
      })
      .catch(error => {
        notification.error({
          message: `Operazione fallita`,
          description: error.toString(),
          placement: 'bottomRight',
          duration: 0
        });
      });
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    let emptyRow = {};
    this.props.colonne.forEach(c => {
      emptyRow[c.title] = '';
    });
    emptyRow.key = count;
    this.setState({
      dataSource: [emptyRow, ...dataSource],
      count: count + 1
    });
    this.edit(emptyRow.key);
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const dataSource = [...this.state.dataSource];
      const index = dataSource.findIndex(item => key === item.key);
      const item = dataSource[index];
      dataSource.splice(index, 1, {
        ...item,
        ...row
      });
      //modificata riga o aggiungi
      if (item.id) {
        updateTableRow(this.props.dispatch, this.props.titolo, item.id, row)
          .then(() => {
            //aggiorno questa componente
            //perchè cambia lo stato del reducer, ma questa componente non è connessa
            this.setState({ dataSource, editingKey: '' });
          })
          .catch(error => {
            notification.error({
              message: `Operazione fallita`,
              description: error.toString(),
              placement: 'bottomRight',
              duration: 0
            });
          });
      } else {
        console.log(row);
        createTableRow(this.props.dispatch, this.props.titolo, row)
          .then(id => {
            //aggiorno questa componente
            //perchè cambia lo stato del reducer, ma questa componente non è connessa
            console.log(id);
            dataSource.splice(index, 1, {
              ...dataSource[index],
              id
            });
            this.setState({ dataSource, editingKey: '' });
          })
          .catch(error => {
            notification.error({
              message: `Operazione fallita`,
              description: error.toString(),
              placement: 'bottomRight',
              duration: 0
            });
          });
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  componentDidMount() {
    this.props.shareMethods(this.updateRows.bind(this));
  }

  componentDidUpdate() {
    if (
      this.titolo !== this.props.titolo &&
      this.props.colonne.length > 0 &&
      this.props.righe.length > 0
    ) {
      this.titolo = this.props.titolo;
      this.setColumns();
      this.updateRows();
    }
  }

  updateRows() {
    this.setState({
      dataSource: this.props.righe
    });
  }

  render() {
    const components = {
      body: {
        cell: EditableCell
      }
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          cellValue: record[col.dataIndex],
          dataIndex: col.dataIndex,
          render: col.render,
          not_null: col.not_null,
          title: col.title,
          editing: this.isEditing(record)
        })
      };
    });

    return (
      <EditableContext.Provider value={this.props.form}>
        <h1>{this.titolo}</h1>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          Aggiungi riga
        </Button>
        <Table
          // scroll={{ x: 1400 }}
          components={components}
          bordered
          dataSource={this.state.dataSource}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel
          }}
        />
      </EditableContext.Provider>
    );
  }
}

export const EdiTable = Form.create()(EditableTable);
