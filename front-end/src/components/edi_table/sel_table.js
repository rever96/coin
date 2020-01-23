import React from 'react';
import { Table, Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux';
import struttura from '../../assets/struttura.json';
import { setRows } from '../../data/tables';
// import { setTable } from '../../data/tables';

class SelectRowTable extends React.Component {
  constructor(props) {
    super(props);
    const colonne = struttura
      .find(tabella => tabella.nome === this.props.tableName)
      .colonne.map((c, key) => {
        let colonna = {
          ...c,
          ...this.getColumnSearchProps(c.nome)
        };
        colonna.title = c.nome;
        colonna.dataIndex = c.nome;
        colonna.key = c.nome;

        return colonna;
      });
    this.state = {
      searchText: '',
      searchedColumn: '',
      righe: [],
      colonne,
      selectedRowKey: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      !nextProps.tableData ||
      (nextProps.id === this.props.id && this.props.tableData)
    ) {
      return;
    }
    const righe = setRows(nextProps.tableData);
    let selectedRowKey = undefined;
    if (nextProps.id !== undefined) {
      const previuosIndex = righe.findIndex(r => r.id === nextProps.id);
      const selectedRow = righe.splice(previuosIndex, 1)[0];
      righe.splice(0, 0, selectedRow);
      selectedRowKey = righe[0].key;
    }
    this.setState({
      righe,
      selectedRowKey
    });
  }

  onSelectChange = selectedRowKeys => {
    if (selectedRowKeys.length === 0) {
      this.setState({ selectedRowKey: [] });
      return;
    }
    const selectedRowKey =
      selectedRowKeys.length === 2 ? selectedRowKeys[1] : selectedRowKeys[0];
    const fk = this.state.righe.find(r => r.key === selectedRowKey).id;
    this.props.changeForeignKey(fk);
    this.setState({ selectedRowKey });
  };

  addSelectableFeature() {
    this.rowSelection = {
      selectedRowKeys:
        this.state.selectedRowKey !== undefined
          ? [this.state.selectedRowKey]
          : [],
      onChange: this.onSelectChange,
      hideDefaultSelections: true
    };
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type='primary'
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon='search'
          size='small'
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size='small'
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type='search' style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    const { righe, colonne } = this.state;
    this.addSelectableFeature();
    return (
      <Table
        rowSelection={this.rowSelection}
        columns={colonne}
        dataSource={righe}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { tableName, id } = ownProps;
  if (
    !state.pending &&
    state.tableData[tableName] &&
    state.tableData[tableName].length > 0
  ) {
    return { tableData: state.tableData[tableName], id };
  }
  return {};
};

export default connect(mapStateToProps)(SelectRowTable);
