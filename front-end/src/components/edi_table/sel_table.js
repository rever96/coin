import React from 'react';
import { Table, Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux';
import struttura from '../../assets/struttura.json';
import { setRows } from '../../data/tables';

class SelectRowTable extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      searchedColumn: '',
      righe: [],
      colonne: [],
      selectedRowKey: 0
    };
    this.stillWaitingForData = true;
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    if (this.stillWaitingForData && this.props.tableData) {
      this.stillWaitingForData = false;
      const righe = setRows(this.props.tableData);
      // todo in caso che non ci sia già la chiave esterna?
      const previuosIndex = righe.findIndex(r => r.id === this.props.id);
      const selectedRow = righe.splice(previuosIndex, 1)[0];
      righe.splice(0, 0, selectedRow);
      this.setState({
        righe,
        selectedRowKey: righe[0].key
      });
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
      this.setState({
        colonne
      });
    }
  }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKey: selectedRowKeys[1] });
  };

  addSelectableFeature() {
    this.rowSelection = {
      selectedRowKeys: [this.state.selectedRowKey],
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
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
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
    if (this.stillWaitingForData) {
      return <> spinner super figherrimo</>;
    }
    this.addSelectableFeature();
    return (
      <Table
        rowSelection={this.rowSelection}
        columns={this.state.colonne}
        dataSource={this.state.righe}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { tableName } = ownProps;
  if (
    !state.pending &&
    state.tableData[tableName] &&
    state.tableData[tableName].length > 0
  ) {
    return { tableData: state.tableData[tableName] };
  }
  return {};
};

export default connect(mapStateToProps)(SelectRowTable);
